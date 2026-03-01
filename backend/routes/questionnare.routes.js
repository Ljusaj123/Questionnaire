const express = require("express");

const router = express.Router();
const questionnareController = require('../controllers/questionnare.controller');

router.get('/sections',  questionnareController.getSections)
router.post('/sections', questionnareController.createSection)
router.delete('/sections/:id', questionnareController.deleteSection)

router.post('/questions', questionnareController.createQuestion)
router.delete('/questions/:sectionId/:questionId', questionnareController.deleteQuestion)

module.exports = router;
