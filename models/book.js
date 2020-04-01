const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    bookname: { type: String },//书名
    bookDescr: { type: String },//书本简介
    publisher: { type: String },//作者
    image: { type: String },//封面
    status: { type: String },//状态 0 草稿 1 发布
    //章节
    tabs: [{
        content: { type: String },
        name: { type: String },
        title: { type: String }
    }],
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
Schema.index({ id: 1 })//索引 1开始？
const Book = mongoose.model("Book", Schema)
module.exports = Book