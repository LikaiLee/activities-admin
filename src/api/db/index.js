import uploadFile from '@/utils/uploadFile'

/**
 * 上传Excel
 * @param {File} file
 */
export function uploadStuFile(file) {
  return uploadFile('/stu/db/file', {
    file
  })
}
