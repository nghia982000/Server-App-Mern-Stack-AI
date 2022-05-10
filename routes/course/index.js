const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')
const payment=require('../../middleware/payment')

router.post('/addCourse', verifyToken,decentralization, courseController.addCourse)
router.get('/getCourse', verifyToken, courseController.getCourse)
router.get('/listCourse', courseController.listCourse)
router.put('/updateCourse/:id', verifyToken,decentralization, courseController.updateCourse)
router.delete('/deleteCourse/:id',verifyToken,decentralization, courseController.deleteCourse)
// router.delete('/deleteCourse/:id', verifyToken, courseController.deleteCourse)
router.post('/searchCourse', courseController.searchCourse)
router.post('/favoriteCourse',verifyToken, courseController.favoriteCourse)
router.post('/buyCourse',verifyToken,payment,courseController.buyCourse)
router.get('/getBoughtCourse',verifyToken,courseController.getBoughtCourse)
router.get('/getFavorite',verifyToken, courseController.getFavorite)
router.delete('/deleteFavorite/:id',verifyToken, courseController.deleteFavorite)

// router.post('/testUpload', courseController.testUpload)

module.exports = router