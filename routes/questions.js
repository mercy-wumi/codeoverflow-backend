const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { answerQuestion, askQuestion, getQuestion, getQuestions, updateQuestion, deleteQuestion } = require('../controllers/questionControllers')

const router = express.Router()

// require auth for all question routes
router.use(requireAuth)

// get all questions
router.get('/', getQuestions)

// get a single question
router.get('/:id', getQuestion)

// post a question
router.post('/', askQuestion)

// delete a question
router.delete('/:id', deleteQuestion)

// update a question
router.patch('/:id', updateQuestion)

// answer a question / comment
router.post('/:id/postAnswer', answerQuestion)

module.exports = router