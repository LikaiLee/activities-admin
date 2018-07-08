import request from '@/utils/fetch'

/**
 * 获取自己社团
 */
export function fetchClub() {
  return request.get('/club')
}
