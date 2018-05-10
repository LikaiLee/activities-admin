import request from '@/utils/fetch'
import uploadFile from '@/utils/uploadFile'

/**
 * 通过id获取申请表内容
 * @param {Number} id
 */
export function fetchApprovalById(id) {
  return request.get(`/club/app?id=${id}`)
}

/**
 * 社团申请活动
 * @param {String} data.name 活动名
 * @param {String} data.place 地点
 * @param {String} data.start 开始时间
 * @param {String} data.end 结束时间
 * @param {String} data.people 参与对象及人数
 * @param {Number} data.selfMoney 剩余自留经费
 * @param {Number} data.reserveMoney 剩余社联预留经费
 * @param {Number} data.isFine 是否是优秀社团活动 0-是 1-不是
 * @param {String} data.introduce 活动简介
 * @param {File} data.file 附加文件
 */
export function postApproval(data) {
  return uploadFile('/club/app', data)
}
