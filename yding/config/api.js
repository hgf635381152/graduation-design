let ipUrl = 'http://localhost:7001/'

let servicePath = {
  Login: ipUrl + 'Login',  // 检查用户名密码
  Register: ipUrl + 'Register',
  getStoreList: ipUrl + 'getStoreList',
  getStoreDetail: ipUrl + 'getStoreDetail'
}

export default servicePath