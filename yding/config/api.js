let ipUrl = 'http://localhost:7001/'

let servicePath = {
    Login: ipUrl + 'Login',  // 检查用户名密码
    Register: ipUrl + 'Register',
    getStoreList: ipUrl + 'getStoreList',
    getLikeList: ipUrl + 'getLikeList',
    getStoreDetail: ipUrl + 'getStoreDetail',
    getCommentList: ipUrl + 'getCommentList'
}

export default servicePath