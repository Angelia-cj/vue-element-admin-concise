/*
 * @description:
 * @Author: changjia
 * @Date: 2021-11-22 21:16:40
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 17:56:18
 */
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

// 注册路由
function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 注销路由
function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// 模拟服务器
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log("请求调用:" + req.path)
      res.join(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = app => {
  // 解析 app.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // 监视文件，热加载模拟服务器
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // 移除模拟路由栈
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清除路由缓存
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(
          chalk.magentaBright(`\n > 模拟服务器热加载成功!! 改变了 ${path}`)
        )
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}