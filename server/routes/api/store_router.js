const Router = require('koa-router')
const store_controller = require('../../app/controllers/store_controller')

const router = new Router()

router.post('/getStoreList', store_controller.getStoreList)// 拿到前端传过来的参数，去数据库里匹配是否存在
router.post('/getStoreDetail', store_controller.getStoreDetail)

module.exports = router