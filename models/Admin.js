const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,//设置默认不可以查
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    SiteName: { type: String },//站点名称
    descr: { type: String },//站点描述
    authorDescr: { type: String },//个性签名
    backImg: { type: String },//站点内景图
    content: { type: String },//简介
    github: { type: String },//github
    githubPerson: { type: String },//GitHub主页
    email: { type: String },//email
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})

const Admin = mongoose.model("Admin", Schema)
module.exports = Admin