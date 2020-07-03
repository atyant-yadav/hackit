const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Question = require('../models/Question')
const User = require('../models/User')

// @desc   LOgin/Landing page
// @route  GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    } )
})

// @desc   Dashboard
// @route  GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const questions = await Question.find({  }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            questions,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router