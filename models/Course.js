const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    benefit: {
        type: Array,
    },
    favorite:{
        type:Array,
    },
    course:{
        type:Array,
    },
    point:{
        type:Number,
    },
    field:{
        type:String,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})
CourseSchema.index({
    title:'text',
})
module.exports = mongoose.model('courses', CourseSchema)