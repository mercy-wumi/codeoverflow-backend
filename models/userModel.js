const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
})

// static signup method

userSchema.statics.signup = async function (username, email, password) {

    // validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong')
    }

    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already exist')
    }
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error('Username already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user

}

// static login method

userSchema.statics.login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    const userMatch = await bcrypt.compare(password, user.password)

    if (!userMatch) {
        throw Error('Incorrect Password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)