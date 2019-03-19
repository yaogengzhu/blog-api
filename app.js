// 用express 搭建一个服务器 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 接收传递过来的路由
const router = require('./router/router')
// 挂载路由
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(router)

// 设置监听的端口号
app.listen(5000, function () {
    console.log('this is server is running at http://127.0.0.1:5000')
})