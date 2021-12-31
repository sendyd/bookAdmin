import http from '@/utils/http.js'

export function getHomeData () {
  return http.get('/api/admin/index' )
}
