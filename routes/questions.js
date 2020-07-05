const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Question = require('../models/Question')

// @desc   Show add page
// @route  GET /questions/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('questions/add')
})

// @desc   Process add form
// @route  POST /questions
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Question.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show all questions
// @route  GET /questions
router.get('/', ensureAuth, async (req, res) => {
    try {
        const questions = await Question.find({ })
            .populate('user')
            .sort({ questionNo: 'asc' })
            .lean()
        
        res.render  ('questions/index', {
            questions,
        })  
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
            question
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