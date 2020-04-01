const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name: { type: String },//代码库名称
    image: { type: String },//图片
    description: { type: String },//描述
    url: { type: String },//代码地址
    content: { type: String },//代码内容
    status: { type: Boolean },//状态
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
const Code = mongoose.model("Code", Schema)
module.exports = Code //资源链