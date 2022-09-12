const Question = require('../models/questionModel')
const mongoose = require('mongoose')

// get all questions
const getQuestions = async (req, res) => {
    const questions = await Question.find({}).sort({ createdAt: -1 }).populate("postedBy", "_id username")
    res.status(200).json(questions)
}

// get a single question
const getQuestion = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Question not found' })
    }
    const question = await Question.findById(id)
    if (!question) {
        return res.status(404).json({ error: 'Question does not exist' })
    }
    res.status(200).json(question)
}

// post a question
const askQuestion = async (req, res) => {
    const { title, description, selectedImage, tags } = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!tags) {
        emptyFields.push('tags')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'please fill all the fields', emptyFields })
    }
    try {
        const question = await Question.create({ title, description, selectedImage, tags, postedBy: req.user })
        res.status(200).json(question)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete a question
const deleteQuestion = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Question not found' })
    }
    const question = await Question.findOneAndDelete({ _id: id })
    if (!question) {
        return res.status(400).json({ error: 'Question does not exist' })
    }
    res.status(200).json(question)
}

// update a question
const updateQuestion = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Question not found' })
    }
    const question = await Question.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!question) {
        return res.status(400).json({ error: 'Question does not exist' })
    }
    res.status(200).json(question)
}

// post a comment / answer a question

const answerQuestion = async (req, res) => {
    const { id } = req.params
    const answer = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Question.findByIdAndUpdate(id, {
        $push: { answers: answer }
    }, { new: true })
        .populate("answers.postedBy", "_id username")
        .populate("postedBy", "_id username")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
}
// const answerQuestion = async (req, res) => {
//     const { id } = req.params
//     const { answer } = req.body
//     console.log(req.body)

//     const questionAnswers = await Question.findById(id)
//     questionAnswers.answers.push(answer)
//     const updateQuestionAnswer = await Question.findByIdAndUpdate(id, questionAnswers, { new: true })
//     res.json(updateQuestionAnswer)
// }


module.exports = {
    askQuestion,
    getQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion,
    answerQuestion
}
