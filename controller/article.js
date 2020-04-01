const TagModel = require('../models/tag')
class Article {
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
        var result = []
        //过滤草稿文章
        data.forEach((item) => {
            // console.log('tag', item)
            if (item.status == true) {
                result.push(item)
            }
        })
        result.sort(function (a, b) { return a.edited_time - b.edited_time })//按编辑时间排序
        result.reverse();//反转
        res.send({
            code: 0,
            msg: "success",
            data: result
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
            
            // const tag = await TagModel.findById(item.tags[0])

            // item.tags = tags
            // JSON.stringify(tags)
            res.send({
                code: 0,
                msg: "success",
                data: item,

            })

        } catch (error) {
            res.send({
                code: -1,
                msg: error.message
            })
        }
    }
}
module.exports = new Article()