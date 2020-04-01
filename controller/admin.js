const AdminModel = require('../models/Admin')
const ArticleModel = require('../models/article')


class Admin {
    constructor() {

    }
    //获取某一-后台
    async  fetchItem(req, res, next) {
        if (!req.user) {
            res.send({
                code: -1,
                msg: "无权请求"
            })
            return;
        }
        if (req.params.id === "") {
            res.send({
                code: -1,
                msg: "失败"
            })
            return;
        }
        try {
            const item = await AdminModel.findById(req.params.id)
            res.send({
                code: 0,
                msg: "success",
                data: item
            })

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //获取某一-
    async  self(req, res, next) {
        if (req.params.id === "") {
            res.send({
                code: -1,
                msg: "失败"
            })
            return;
        }
        try {
            const item = await AdminModel.find().limit(1)
            const temp = await ArticleModel.find()
            var total = 0;
            temp.forEach((item) => {
                if (item.status == true) {
                    total = total + 1
                }
            })
            res.send({
                code: 0,
                msg: "success",
                data: { item, total }
            })

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
    //修改 id
    async update(req, res, next) {
        if (!req.user) {
            res.send({
                code: -1,
                msg: "无权请求"
            })
            return;
        }
        if (req.body.id === "") {
            res.send({
                code: -1,
                msg: "失败"
            })
            return;
        }
        try {
            req.body.edited_time = new Date()
            const item = await AdminModel.findByIdAndUpdate(req.body._id, req.body)
            res.send({
                code: 0,
                msg: "success",
            })

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }

    }
}

module.exports = new Admin();