const moment = require('moment')

let adminName0 = 'b17037'
let adminName1 = 'Rishabh'
let adminName2 = 'b17116'

module.exports = {
    checkAdmin: function (loggedUser) {
        if (adminName0.toString() == loggedUser.firstName.toString() || adminName1.toString() == loggedUser.firstName.toString() || adminName2.toString() == loggedUser.firstName.toString()){
            return true
        }
        else {
            return false
        }
    },
    questionStatus: function (quesNo, loggedUser) {
        if (loggedUser.questionNumber >= quesNo ){
            return true
        }
        else {
            return false
        }
    },
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
       if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/questions/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/questions/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
       } else {
            return ''
       }
    },
    lockIcon: function (questionStatus) {
        if (questionStatus) {
            return `<a class="btn-floating halfway-fa blue"><i class="fa fa-unlock fa-small"></i></a>`
        } else {
            return `<a class="btn-floating halfway-fa grey"><i class="fa fa-lock"></i></a>`
        }
     },
}