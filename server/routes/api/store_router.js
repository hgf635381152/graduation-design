const Router = require('koa-router')
const store_controller = require('../../app/controllers/store_controller')

const router = new Router()

router.post('/getStoreList', store_controller.getStoreList)
router.post('/getLikeList', store_controller.getLikeList)
router.post('/getStoreDetail', store_controller.getStoreDetail)

module.exports = router