module.exports = app => {
    const express = require('express')
    const CommonRouter = express.Router();

    const jwt = require('jsonwebtoken')//token

    const CommonController = require("../../controller/common")
    const Auth = require('../../controller/auth')//鉴权
    /*--------------------------------------图片上传接口-----------------------*/
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '\\..\\..\\public\\upload' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/upload/${file.filename}`
        res.send(file)
    })
    /*--------------------------------------模型寻找中间件-------------------------------------------------------*/
    const resourceMiddleware = async (req, res, next) => {
        const modelName = req.params.modelName;//省下名称的处理
        req.Model = require(`../../models/${modelName}`)//吧Model添加到req里 给到router可以获取
        await next();//下一个中间件
    }
    /*--------------------------------------- //api守卫-根中间件---------------------------------------------------*/
    // app.use('/admin/api/common/:modelName', Auth(), resourceMiddleware, CommonRouter)

    app.use('/admin/api/common/:modelName', Auth(), resourceMiddleware, CommonRouter)
    /*--------------------------------------//错误处理函数---------------------------------------------------------*/
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            msg: err.message
        })
    })
    /*------------------------------------// 通用 CRUD 接口-------------------------------------------------------------*/
    CommonRouter.post("/create", CommonController.create)
    CommonRouter.get('/list', CommonController.getAll)
    CommonRouter.post('/:id', CommonController.fetchItem)
    CommonRouter.put('/update', CommonController.update)
    CommonRouter.delete('/remove/:id', CommonController.remove)
    /*-----------------------------------------------------管理员------------------------------------------ */
    const AdminController = require('../../controller/admin')
    app.post('/admin/api/admin/:id', Auth(), AdminController.fetchItem)
    app.put('/admin/api/admin/update', Auth(), AdminController.update)
    /*--------------------登录-----------------------------------------------------*/
    const AdminModel = require('../../models/Admin')
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        if (!username) {
            return res.status(422).send({
                msg: "账号不能为空"
            })
        }
        if (!password) {
            return res.status(422).send({
                msg: "密码不能为空"
            })
        }
        //1 找用户
        const admin = await AdminModel.findOne({ username: username, }).select('+password')
        //const admin = await AdminModel.findOne({ username: username, })
        if (!admin) {
            return res.status(422).send({
                msg: "用户不存在"
            })
        }
        //2 验证
        const isValid = require("bcryptjs").compareSync(password, admin.password)
        //const isValid = password == admin.password ? true : false;
        if (!isValid) {
            return res.status(422).send({
                msg: "密码错误"
            })
        }
        //3res 给token 
        const token = jwt.sign({ aid: admin._id }, app.get('secret'))
        res.send({
            code: '0',
            msg: '登录成功',
            token
        })
    })
    /*----------------------------------------------验证token是否有效----------------------------------------------*/
    app.get('/admin/api/vaildtoken', Auth(), (req, res, next) => {
        res.send({
            msg: "获取成功",
            data: req.user
        })
    })
}