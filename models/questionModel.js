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
    tags: { type: [String], default: [] },
    postedBy: { type: ObjectId, ref: "User" },
    // answers: { type: [String], default: [] }
    answers: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Question', questionSchema)