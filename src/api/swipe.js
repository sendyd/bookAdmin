
import http from '@/utils/http.js'
//
export function getSwipes(data) {
  return http.get('/api/admin/slides', data)
}

export function setSwipeStatus(id) {
  return http.patch(`/api/admin/slides/${id}/status`)
}

export function addSwipe(data) {
  return http.post('/api/admin/slides', data)
}
export function deleteSwipe(id) {
  return http.delete(`/api/admin/slides/${id}`)
}
export function getSwipeInfo(id) {
  return http.get(`/api/admin/slides/${id}`)
}

export function updateSwipeInfo(id ,data) {
  return http.put(`/api/admin/slides/${id}` ,data)
}
