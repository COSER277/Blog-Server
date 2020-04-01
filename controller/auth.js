module.exports = option => {
    return async (req, res, next) => {
        const AdminModel = require("../models/Admin")
        const jwt = require('jsonwebtoken')

        const token = String(req.headers.authorization || '').split(' ').pop();//1拿去前端请求头的token
        if (!token) {
            res.status(401).send({
                code: -1,
                msg: '无权访问'
            })
            return;
        }
        const tokenData = jwt.verify(token, req.app.get('secret')) //把app 加到req 给到下一控制器
        if (!tokenData) {
            res.status(401).send({
                code: -1,
                msg: '无效Token'
            })
            return;
        }
        const id = tokenData.aid;//2拿到加密的 （aid )
        if (!id) {
            res.status(401).send({
                code: -1,
                msg: '请先登录'
            })
            return;
        }
        //3根据 aid 查询  
        const data = await AdminModel.findById(id)
        //4 拦截报错
        if (!data) {
            res.status(401).send({
                code: -1,
                msg: '请先登录'
            })
        } else {
            // data 给 下一个控制器
            req.user = data;
            await next();
        }
    }
}
