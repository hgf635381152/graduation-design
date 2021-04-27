const Store = require('../models/store')
const config = require('../../config');
const { stringify } = require('uuid');

// 登录
const getStoreList = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let store = []
    if (req.sort == '') {
        store = await Store.find({area: req.area})
    }else {
        store = await Store.find({ $and: [ {area: req.area}, {dishsort: req.sort} ] })
    }
    console.log(store);
    ctx.body = {
        type: true,
        storelist: store
    }
}

// 注册
const getStoreDetail = async (ctx) => {
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
    getStoreList,
    getStoreDetail
}