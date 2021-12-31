
import http from '@/utils/http.js'
//获取评论列表
export function getComments(data) {
  return http.get('/api/admin/comments', data)
}
