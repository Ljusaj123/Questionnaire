const express = require("express");

const router = express.Router();
const questionnareController = require('../controllers/questionnare.controller');

router.get('/sections',  questionnareController.getSections)
router.post('/sections', questionnareController.createSection)
router.delete('/sections/:id', questionnareController.deleteSection)

router.post('/questions', questionnareController.createQuestion)
router.put('/questions', questionnareController.updateQuestion)
router.get('/questions/:id', questionnareController.getQuestion)
router.delete('/questions/:id', questionnareController.deleteQuestion)

module.exports = router;
