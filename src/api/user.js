
import http from '@/utils/http.js'
//获取用户列表
export function getUser(data) {
  return http.get('/api/admin/users', data)
}
//修改用户状态
export function setUserStatus(id) {
  return http.patch(`/api/admin/users/${id}/lock`)
}
//添加用户
export function addUser(data) {
  return http.post('/api/admin/users', data)
}
//获取用户详情信息
export function getInfo(id) {
  return http.get(`/api/admin/users/${id}`)
}
//更新用户信息
export function setInfo(id, data) {
  return http.put(`/api/admin/users/${id}`, data)
}
