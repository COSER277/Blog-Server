class Code {
    constructor() {
      

    }
    //获取所有
    async All(req, res, next) {
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
    async  Item(req, res, next) {
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
}
module.exports = new Code()