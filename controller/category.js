const ArticleModel = require('../models/article')
class Category {
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
    //获取所属分类的文章列表
    async AllArticles(req, res, next) {
        const categories = await req.Model.find()
        const articles = await ArticleModel.find()
        var result = []
        categories.forEach(cate => {
            articles.forEach((art, i) => {
                if (art.categories[i] = cate._id) {
                    result.push(art)
                }
            })
        })

    }
}
module.exports = new Category()