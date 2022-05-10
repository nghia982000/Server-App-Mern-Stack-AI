const User = require('../models/User')

const decentralization = (req, res, next) => {
    const userId = req.userId
    console.log(userId)
    try {
        User.findOne({ _id: userId,role:'manager'})
            .then((data) => {
                console.log(data)
                if(data){
                    next()
                }else{
                    console.log('No permit')
                    return res.status(400).json({ success: false, message: 'No permit' })
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
module.exports = decentralization