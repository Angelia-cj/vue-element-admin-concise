const Mock = require('mockjs')

const { param2Obj } = require("./modules/utils");

const user = require('./modules/user')

const mocks = [...user]

// 前端方面
// 请谨慎使用，它将重新定义XMLHttpRequest，
// 这将导致您的许多第三方库失效(如进度事件)。
function mockXHR() {
  // 模拟补丁
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = none;
      if (response instanceof Function) {
        const { body, type, url } = options;
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      return Mock.Mock(result)
    }
  }
  for (const i of mocks) {
    Mock.Mock(new RegExp(i.url), i.type || 'GET', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}