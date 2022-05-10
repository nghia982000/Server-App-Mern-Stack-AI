const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    lecture:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },  
    duration:{
        type: Number,
    },
    course: {
        type:Schema.Types.ObjectId,
        ref:'courses'
    }
})

module.exports = mongoose.model('videos', VideoSchema)