const User = require('../models/user')
const Store = require('../models/store')
const config = require('../../config')
// 登录
const login = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let str = '账号或密码错误'
    const user = await User.find({})
    console.log(user);
    user.map((item) => {
        if (item.userId == req.userId && item.password == req.password) {
            str = '登录成功'
        }
    })
    ctx.body = {
        type: str
    }
    // 连接数据库，去数据库里查找是否存在该条数据
    // 获取用户的userId
    // 查找语句

    // const user = await User_col.findOne({
    //   account: req.username
    // }, {
    //   __v: 0,
    //   _id: 0
    // })
}
// 注册
const register = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    return req
}
module.exports = {
    login,
    register
}