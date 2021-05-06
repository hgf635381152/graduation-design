const Router = require('koa-router')
const comment_controller = require('../../app/controllers/comment_controller')

const router = new Router()

router.post('/getCommentList', comment_controller.getCommentList)

module.exports = router