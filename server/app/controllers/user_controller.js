const User = require('../models/user')
const config = require('../../config');
const { stringify } = require('uuid');

// 登录
const Login = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let str = '账号或密码错误'
    let uname = ''
    const user = await User.find({})
    console.log(user);
    user.map((item) => {
        if (item.userId == req.userId && item.password == req.password) {
            str = '登录成功'
            uname = item.username
        }
    })
    ctx.body = {
        type: str,
        name: uname,
        id: req.userId
    }
}

// 注册
const Register = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let Flag = true
    let str = '注册失败'
    var id = Math.floor(Math.random()*1000000)
    const user = await User.find({})
    console.log(id, user)
    while (Flag) {
        Flag = false
        id = Math.floor(Math.random()*1000000)
        user.map((item) => {
            if (item.userId == id) Flag = true 
        })
    }
    console.log(id)
    const result = await User.create({"userId": id, 'username': req.username, 'password': req.password, 'email': req.email, 'taste': req.taste})
    console.log(id, result)
    str = '注册成功'
    ctx.body = {
        type: str,
        id: id
    }
}

module.exports = {
    Login,
    Register
}