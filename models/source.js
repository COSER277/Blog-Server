const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name: { type: String },//名称
    image: { type: String },//头像
    description: { type: String },//描述
    url: { type: String },//资源地址--百度网盘
    status: { type: Boolean },//状态
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
const Source = mongoose.model("Source", Schema)
module.exports = Source //资源链