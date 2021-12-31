
import http from '@/utils/http.js'
//获取订单列表
export function getOrders(data) {
  return http.get('/api/admin/orders', data)
}
export function setOrders(id , data) {
  return http.patch(`/api/admin/orders/${id}/post`, data)
}
