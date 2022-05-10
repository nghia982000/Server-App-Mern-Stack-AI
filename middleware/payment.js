const User = require('../models/User')
const Course = require('../models/Course')

const payment = async (req, res, next) => {
    const userId = req.userId
    const courseId = req.body.id
    try {
        const user = await User.findOne({ _id: userId })
        const course = await Course.findOne({ _id: courseId })
        const bought=course.course.some(item=>{
            return item.id==userId
        })
        if(bought){
            return res.status(400).json({
                message: 'The course has been purchased',
                success: false
            })
        }
        if (user.point < course.point) {
            return res.status(400).json({
                message: 'Not enough coins',
                success: false
            })
        }
        User.findOne({ _id: userId })
        const newUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    point: user.point - course.point,
                }
            },
            { new: true }
        )
            .then((data) => {
                if (data) {
                    req.point=data.point
                    next()
                }
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
module.exports = payment