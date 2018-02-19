/*eslint-disable */
import Mock from 'mockjs'
import login from './login'

Mock.setup({
  timeout: '350-600'
})

Mock.mock(/\/token\/locale/, 'post', login.token)

export default Mock
