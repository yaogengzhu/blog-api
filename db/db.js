// 引入数据库模块
const mysql = require('mysql')

// 配置数据库 并返回一个对象 
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'readbook'
})

// 导出模块
module.exports = conn 