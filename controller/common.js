class CommonCRUD {
    constructor() {
    }
    // 增加
    async create(req, res, next) {
        if (!req.user) {
            res.send({
                code: -1,
                msg: "无权请求"
            })
            return;
        }
        if (!req.body) {
            res.send({
                code: -1,
                msg: "失败"
            })
            return;
        }
        req.body.created_time = Date.parse(new Date());
        //req.body.edited_time = req.body.created_time
        const data = await req.Model.create(req.body)
        // console.log(data)
        res.send({
            code: 0,
            msg: "success",
            data: data,
        })
    }
    //获取所有
    async getAll(req, res, next) {
        if (!req.user) {
            res.send({
                code: -1,
                msg: "无权请求"
            })
            return;
        }
        const data = await req.Model.find();
        if (!data) {
            res.send({
                code: -1,
                msg: "失败"
            })
            return;
        }
        res.send({
            code: 0,
            msg: "success",
            data: data
        })
    }
    //获取某一
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
            const item = await req.Model.findById(req.params.id)
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
            const item = await req.Model.findByIdAndUpdate(req.body._id, req.body)
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
    async remove(req, res, next) {
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
            const item = await req.Model.findById(req.params.id)
            item.remove();
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

module.exports = new CommonCRUD();