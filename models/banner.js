const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    name: { type: String },//广告名称
    url: { type: String },//地址
    image: { type: String },//图
    status: { type: Boolean },//状态
    created_time: { type: Date, default: new Date() }, //创建时间
    edited_time: { type: Date, default: new Date() } //修改时间
});

const Banner = mongoose.model("Banner", Schema);
module.exports = Banner;
