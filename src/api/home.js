import request from "./request";
import { api } from './ap'

/**
 * @name 图片上传
 */
export const requestUploadi = (params) => {
  return request('post', api + '/portrait/upload', params)
}

/**
 * @name 用户注册
 */
export const requestRegister = (params) => {
  return request('post', api + '/user/register', params)
}

/**
 * @name 用户登录
 */
export const requestLogin = (params) => {
  return request('post', api + '/user/login', params)
}

/**
 * @name 获取用户信息
 */
export const requestUserinfo = (params) => {
  return request('get', api + '/user/getUserinfo', params)
}

/**
 * @name 修改个性签名
 */
export const requestPutPersonalizedSignature = (params) => {
  return request('post', api + '/user/putPersonalizedSignature', params)
}
