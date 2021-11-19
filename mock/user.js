/*
 * @description: 获取用户信息
 * @Author: changjia
 * @Date: 2021-11-19 21:18:28
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-19 23:41:09
 */

const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "我是超级管理员",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "超级管理员",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "我是管理员",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "管理员",
  },
};

module.exports = [
  // 用户登录
  {
    url: "/vue-admin-concise/user/login",
    type: "POST",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // 模拟出错
      if (!token) {
        return {
          code: 60204,
          message: "账户和密码出错.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // 获取用户信息
  {
    url: "/vue-admin-concise/user/info.*",
    type: "GET",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      //模拟出错
      if (!info) {
        return {
          code: 50008,
          message: "登录失败，不能获取用户信息！",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // 退出登录
  {
    url: "/vue-admin-concise/user/logout",
    type: "POST",
    response: (_) => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];
