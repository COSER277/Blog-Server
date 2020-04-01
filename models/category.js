const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//外键 多分类
    articles: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Article' }],//包含的文章
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
const Category = mongoose.model("Category", Schema)
module.exports = Category