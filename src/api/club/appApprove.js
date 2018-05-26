import axios from 'axios'
import request from '@/utils/fetch'
import {
  getToken
} from '@/utils/auth'
import {
  AUTH_NAME
} from '@/config'
/**
 * 审核表单
 * @param {Number} data.appId
 * @param {Number} data.result
 * @param {String} data.comment
 */
export function postApproval(data) {
  return request({
    url: '/club/approval',
    method: 'POST',
    data
  })
}

/**
 * 获取审核等级
 */
export function fetchApprovalLv() {
  const headers = {}
  headers[AUTH_NAME] = getToken()
  return axios({
    url: `${process.env.BASE_URL}/club/approval/lv`,
    method: 'GET',
    headers
  })
}
