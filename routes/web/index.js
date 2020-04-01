module.exports = app => {
    const express = require('express')
    const Router = express.Router();
    const jwt = require('jsonwebtoken')

    /*--------------------------------------图片上传接口-----------------------*/
    /*--------------------------------------模型寻找中间件-------------------------------------------------------*/
    const resourceMiddleware = async (req, res, next) => {
        const modelName = req.params.modelName;//省下名称的处理
        req.Model = require(`../../models/${modelName}`)//吧Model添加到req里 给到router可以获取
        await next();//下一个中间件
    }
    /*--------------------------------------- //api守卫-根中间件---------------------------------------------------*/
    app.use('/web/api/common/:modelName', resourceMiddleware, Router)
    /*--------------------------------------//错误处理函数---------------------------------------------------------*/
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            msg: err.message
        })
    })
    /*--------------------// 通用 CRUD 接口-----------------------------------------------------------*/

    //Controller 控制器
    const Article = require('../../controller/article')
    const Tag = require('../../controller/tag')
    const Category = require('../../controller/category')
    const Code = require('../../controller/code')
    const Friend = require('../../controller/friend')
    const Source = require('../../controller/source')
    const Admin = require('../../controller/admin')
    //View 路由对应是视图
    //标签 
    Router.get('/tag/list', Tag.All)
    //分类
    Router.get('/category/list', Category.All)
    //友链
    Router.get('/friend/list', Friend.All)
    //代码库
    Router.get('/code/list', Code.All)
    //资源链
    Router.get('/source/list', Source.All)
    //文章
    Router.get('/article/list', Article.All)
    Router.post('/:id', Article.Item)
    //简历
    Router.get('/about/self', Admin.self)
}