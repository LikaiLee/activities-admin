import {
  WHITE_LIST
} from '@/config'

export function pathInWhiteList(path) {
  console.log(path)
  return WHITE_LIST.some((item) => path.includes(item))
}
