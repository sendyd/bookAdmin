import http from '@/utils/http.js'

export function goLogin (data) {
  return http.post('/api/auth/login' ,data )
}

export function getUserInfo () {
  return http.get('/api/admin/user'  )
}