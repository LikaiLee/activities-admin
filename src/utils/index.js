import {
  WHITE_LIST
} from '@/config'

export function pathInWhiteList(path) {
  return WHITE_LIST.some((item) => path.includes(item))
}
