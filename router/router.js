const express = require('express')
const router = express.Router()
// 本次数据采取的是md5的机密模式 
const md5 = require('md5')
const moment = require('moment')
// 引入数据
const conn = require('../db/db')
// 监听路径


// 注册api 
router.post('/api/register', (req, res) => {
    // 新建数据库查询
    const params = req.body
    params.password = md5(req.body.password)
    params.ctime = moment().format('MMM DD YYYY, hh:mm:ss')
    // console.log(params)
    const sqlStr = 'insert into users set?'
    conn.query(sqlStr, params, (err, results) => {
        
        if (err) return res.json({
            err_code: '1',
            message: '用户名已存在',
            affectedRows: 0
        })
        if (results.affectedRows !== 1) return res.json({
            err_code: 1,
            message: '注册失败请重试',
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: '注册成功',
            affectedRows: 1
        })
    })
})

//获取所有用户
router.get('/api/users', (req, res) => {
    // 新建查询数据库 
    const sqlStr = 'select * from users'
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '参数有误',
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: results,
            affectedRows: 1
        })
    })
})


// 用户登录
router.get('/api/login', (req, res) => {
    // 根据用户名查询数据库
    const sqlStr = 'select * from users where username=?'
    conn.query(sqlStr, req.body.username, (err, results) => {
        if(err) return res.json({
            message:"数据库内部问题",
            status:404
        })
        // 修改一个bug，这里不应该是err作为判断数据库的查询后续的依据 
        if (results) return res.json({
            err_code: 1,
            message: '用户名或者密码不存在',
            affectedRows: 0
        })
        //看传进来的用户名和 数据库的用户名和密码是否一致
        if (req.body.username !== results[0].username || md5(req.body.password) !== results[0].password ) {
            return res.json({
                err_code: 1,
                message: '用户名或者密码错误',
                affectedRows: 0
            })
        }
        res.json({
            err_code: 0,
            message: '登录成功',
            affectedRows: 1
        })
    })
})
module.exports = router