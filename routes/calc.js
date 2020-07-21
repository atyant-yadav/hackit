const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const World = require('../models/World')


// @desc   Process submit answer form
// @route  POST /calc/:id
router.post('/:id', ensureAuth, async (req, res) => {
    try {
        let pathe = `/questions/${req.params.id}`
        let user = await User.findById(req.body.person).lean()
        let question = await Question.findById(req.params.id).lean()
        let answer = await Answer.find( { worldNumber: question.worldNumber, questionNo: question.questionNo } ).lean()
        let world = await World.findOne( {worldNumber: question.worldNumber} ).lean()

        if (user.worldSolved == question.worldNumber) {
            if (user.questionSolved+1 == question.questionNo) {
                let flagg = -1
                // console.log(answer.length)
                for (let i = 0; i < answer.length; i++) {
                    if (req.body.ans.toString().toLowerCase() == answer[i].ans.toLowerCase()){
                        flagg = i
                    }
                }
                if (flagg>=0) {
                    let sco = user.score+answer[flagg].points
                    let qSol = user.questionSolved
                    let wSol = user.worldSolved
                    let wNo = question.worldNumber
                    let qNo = question.questionNo
                    let dat = Date.now()
                    pathe = `/worlds/${world._id}`
                    if (question.questionNo == world.maxQues) {
                        qSol = 0
                        wSol = wSol+1
                        wNo = wNo+1
                        qNo = 1
                    }
                    else {
                        qSol = qSol+1
                        wSol = wSol
                        wNo = wNo
                        qNo = qNo+1
                    }
                    userr = await User.findOneAndUpdate({ _id: req.body.person },  { 
                        score: sco,
                        questionSolved: qSol,
                        worldSolved: wSol,
                        worldNumber: wNo,
                        questionNumber: qNo,
                        timeQues: dat,
                    } )
                }
                else{
                    let pen = user.penalty + answer[0].penalty
                    userr = await User.findOneAndUpdate({ _id: req.body.person }, { 
                        penalty: pen
                    } )
                }
            }
        }
        res.redirect(pathe)  

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


// // @desc   Update question
// // @route  PUT /questions/:id
// router.put('/:id', ensureAuth, async (req, res) => {
//     try {
//         let question = await Question.findById(req.params.id).lean()

//         if (!question) {
//             return res.render('error/404')
//         }
    
//         if (question.user != req.user.id) {
//             res.redirect('/questions')
//         } else {
//             question = await Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
//                 new: true,
//                 runValidators: true
//             })
    
//             res.redirect('/dashboard')
//         }
//     } catch (err) {
//         console.error(err)
//         return res.render('error/500')
//     }
// })


module.exports = router