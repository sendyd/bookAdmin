
import http from '@/utils/http.js'
//获取
export function getMenus() {
  return http.get('/api/admin/menus')
}

export function setMenuStatus(id) {
  return http.patch(`/api/admin/category/${id}/status`)
}
