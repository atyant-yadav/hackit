const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Question = require('../models/Question')
const Answer = require('../models/Answer')

// @desc   Show add page questions
// @route  GET /questions/addQuestion
router.get('/addQuestion', ensureAuth, (req, res) => {
    res.render('questions/add')
})

// @desc   Process add form
// @route  POST /questions
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        console.log(req.body)
        await Question.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


// @desc   Show single question
// @route  GET /questions/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)
            .populate('user')
            .lean()

        if (!question) {
            return res.render('error/404')
        }

        res.render('questions/show', {
            question,
            name: req.user.firstName,
            user: req.user,
            img: req.user.image,
            userid: req.user._id,
            usrWSol: req.user.worldSolved,
            usrQSol: req.user.questionSolved,
        })
    } catch (err) {
             console.error(err)
             res.render('error/404')   
    }
})

// @desc   Show edit page
// @route  GET /questions/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const question = await Question.findOne({
            _id: req.params.id
        }).lean()
    
        if (!question) {
            return res.render('error/404')
        }
    
        if (question.user != req.user.id) {
            res.redirect('/questions')
        } else {
            res.render('questions/edit', {
                question,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc   Update question
// @route  PUT /questions/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let question = await Question.findById(req.params.id).lean()

        if (!question) {
            return res.render('error/404')
        }
    
        if (question.user != req.user.id) {
            res.redirect('/questions')
        } else {
            question = await Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
    
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc   Delete question
// @route  DELETE /questions/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Question.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

module.exports = router