const Router = require('koa-router')
const user_controller = require('../../app/controllers/user_controller')

const router = new Router()

router.post('/Login', user_controller.Login)// 拿到前端传过来的参数，去数据库里匹配是否存在
router.post('/Register', user_controller.Register)

module.exports = router