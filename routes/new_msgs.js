import express from 'express'
import { Router } from 'express'
import messages from '../messages.js'

const new_msgs_router = Router()

// new_msgs_router.set('view engine','ejs')
// new_msgs_router.set('views','views')

new_msgs_router.get("/",(req,res) =>{
    res.render('form')
})
new_msgs_router.post("/",(req,res)=>{
    messages.push({ text: req.body.text, user: req.body.user, added: new Date() });
    res.redirect("/")
}
)
// new_msgs_router.get()

export default new_msgs_router