
import http from '@/utils/http.js'

export function getCateData (data) {
  return http.get('/api/admin/category' ,data)
}

export function setCateStatus (id) {
  return http.patch(`/api/admin/category/${id}/status` )
}

export function updateCate (id,data) {
  return http.put(`/api/admin/category/${id}`,data )
}

export function getCateInfo (id) {
  return http.get(`/api/admin/category/${id}`)
}

export function addCate (data) {
  return http.post('/api/admin/category' , data)
}
