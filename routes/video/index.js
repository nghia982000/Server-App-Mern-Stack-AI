const express = require('express')
const router = express.Router()
const videoController = require('../../controller/videoController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createVideo', verifyToken,decentralization, videoController.createVideo)
router.get('/getVideo/:id', videoController.getVideo)
// router.get('/listCourse', courseController.listCourse)
router.put('/updateVideo', verifyToken,decentralization, videoController.updateVideo)
router.delete('/deleteVideo/:id',verifyToken,decentralization, videoController.deleteVideo)
// router.get('/model',videoController.getModel)


module.exports = router