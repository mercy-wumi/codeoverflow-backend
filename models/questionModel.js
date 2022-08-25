const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    selectedImage: {
        type: String
    },
    tags: [
        new Schema({
            id: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },
            { _id: false },
        )
    ],
    answers: { type: [String], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('Question', questionSchema)