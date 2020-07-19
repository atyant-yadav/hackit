const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Question = require('../models/Question')
const User = require('../models/User')

// @desc   Ranklist
// @route  GET /ranklist
router.get('/', ensureAuth, async (req, res) => {
    try {
        const users = await User.find({  })
        .sort({ score: 'desc', penalty: 'asc', timeQues: 'asc' })
        .lean()
        res.render('ranklist', {
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            users,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router