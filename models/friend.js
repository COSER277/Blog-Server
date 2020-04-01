const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name: { type: String },//名称
    avatar: { type: String },//头像
    description: { type: String },//描述
    url: { type: String },//友链博客地址
    email: { type: String },//email
    status: { type: Boolean },//状态
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
const Friend = mongoose.model("Friend", Schema)
module.exports = Friend