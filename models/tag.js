const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    created_time: { type: Date, default: new Date() },//创建时间
    edited_time: { type: Date, default: new Date() }//修改时间
})
const Tag = mongoose.model("Tag", Schema)
module.exports = Tag