const Comment = require('../models/comment')
const config = require('../../config');

const getCommentList = async (ctx) => {
    console.log(ctx.request.body);
    let req = ctx.request.body
    let comment = []
    comment = await Comment.find({ storeId: req.id })
    console.log(comment);
    ctx.body = {
        type: true,
        commentlist: comment
    }
}

module.exports = {
    getCommentList
}