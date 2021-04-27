const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const user_router = require('./routes/api/user_router')
const store_router = require('./routes/api/store_router')
const mongoose = require('mongoose') // 做mongodb的连接
const config = require('./config')

// 建立mongodb连接
mongoose.connect(config.db, {useNewUrlParser: true}, (err) => {
  if(err){
    console.error('failed');
  } else {
    console.log('success');
  }
})

const app = new Koa()

app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:3000'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 1000000000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})) // 解决跨域
app.use(bodyParser()) // 帮助koa解析参数
app.use(user_router.routes())
app.use(store_router.routes())

app.listen(7001)