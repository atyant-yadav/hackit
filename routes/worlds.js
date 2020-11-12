const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Question = require('../models/Question')
const World = require('../models/World')

// @desc   Show add page world
// @route  GET /questions/addWorld
router.get('/addWorld', ensureAuth, (req, res) => {
    res.render('worlds/add')
})

// @desc   Process add form
// @route  POST /questions
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        console.log(req.body)
        await World.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show all questions in a world
// @route  GET /worlds/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        const world = await World.find({ _id: req.params.id}).lean()

        let worldNamee = world[0].worldName

        const questions = await Question.find({ worldName: worldNamee })
            .populate('user')
            .sort({ questionNo: 'asc' })
            .lean()
        
        res.render  ('worlds/index', {
            questions,
            worldNamee,
            namecheck: req.user,
        })  
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show edit page
// @route  GET /worlds/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const world = await World.findOne({
            _id: req.params.id
        }).lean()
    
        if (!world) {
            return res.render('error/404')
        }

        res.render('worlds/edit', {
            world,
        })
        
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc   Update world
// @route  PUT /worlds/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let world = await World.findById(req.params.id).lean()

        if (!world) {
            return res.render('error/404')
        }
    
        world = await World.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })
    
        res.redirect('/dashboard')

    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

module.exports = router