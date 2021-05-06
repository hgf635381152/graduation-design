const Store = require('../models/store')
const config = require('../../config');
const { stringify } = require('uuid');

// 商铺列表
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

const getLikeList = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let store = await Store.find({})
    ctx.body = {
        type: true,
        likelist: store
    }
}

// 商铺详情
const getStoreDetail = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let info = await Store.find({ storeId: req.id})
    ctx.body = {
        type: true,
        info: info
    }
}

module.exports = {
    getStoreList,
    getLikeList,
    getStoreDetail
}