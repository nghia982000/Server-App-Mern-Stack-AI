const auth = require('./auth')
const course = require('./course')
const video = require('./video')

function route(app) {

    app.use('/auth', auth)
    app.use('/course', course)
    app.use('/video', video)

}


module.exports = route