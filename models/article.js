const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
    image: { type: String },//主图
    title: { type: String },//标题
    content: { type: String },//内容

    view_count: { type: String },
    like_count: { type: String },
    share_count: { type: String },

    level: { type: String },//原创、转载
    status: { type: String },//0 为草稿 1 为发布
    commentStatus: { type: String },//0 为禁止 1 为允许
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})

const Article = mongoose.model("Article", Schema)
module.exports = Article