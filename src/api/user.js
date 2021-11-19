/*
 * @description:
 * @Author: changjia
 * @Date: 2021-11-16 22:31:53
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-19 23:24:51
 */
import request from "@/utils/request";

export function getInfo(token) {
  return request({
    url: "/vue-admin-concise/user/info",
    method: "GET",
    params: { token },
  });
}

export function login(data) {
  return request({
    url: "/vue-admin-concise/user/login",
    method: "POST",
    data,
  });
}

export function logout() {
  return request({
    url: "/vue-admin-concise/user/logout",
    method: "POST",
  });
}
