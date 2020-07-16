const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Answer = require('../models/Answer')

let adminName = ['b17037', 'Rishabh', 'b17116', 'Satyam', 'Sambhav']

// @desc   answers
// @route  GET /answers
router.get('/', ensureAuth, async (req, res) => {
    try {
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            const answers = await Answer.find({  })
            .sort({ worldNumber:'asc' ,questionNo: 'asc' })
            .lean()
            res.render('answers/index', {
                name: req.user.firstName,
                answers,
            })
        }
        else{
            res.render('error/401')
        }  
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show add page answers
// @route  GET /answers/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('answers/add')
})

// @desc   Process add form
// @route  POST /answers/add
router.post('/', ensureAuth, async (req, res) => {
    try {
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            await Answer.create(req.body)
            res.redirect('/answers')
        } 
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show edit page
// @route  GET /answers/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            const answer = await Answer.findOne({
                _id: req.params.id
            }).lean()
        
            if (!answer) {
                return res.render('error/404')
            }
    
            res.render('answers/edit', {
                answer,
            })
        }  
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc   Update answer
// @route  PUT /answers/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            let answer = await Answer.findById(req.params.id).lean()

            if (!answer) {
                return res.render('error/404')
            }
        
            answer = await Answer.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
        
            res.redirect('/answers')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc   Delete answer
// @route  DELETE /answer/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let checker = false
        for (let i = 0; i < adminName.length; i++) {
            if (adminName[i]==req.user.firstName) checker = true
        }
        if (checker) {
            await Answer.remove({ _id: req.params.id })
            res.redirect('/answers')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

module.exports = router