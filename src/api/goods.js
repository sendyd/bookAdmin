
import http from '@/utils/http.js'

export function getGoodsData (data) {
  return http.get('/api/admin/goods' ,data)
}
//上架 下架

export function setIsOn(id) {
  return http.patch(`/api/admin/goods/${id}/on` )
}

//推荐 不推荐
export function setIsRecommend(id) {
  return http.patch(`/api/admin/goods/${id}/recommend` )
}

export function addGoods(data) {
  return http.post('/api/admin/goods' ,data )
}

export function getGoodsInfo(id) {
  return http.get(`/api/admin/goods/${id}` )
}

export function updateGoodsInfo(id,data) {
  return http.put(`/api/admin/goods/${id}` ,data)
}