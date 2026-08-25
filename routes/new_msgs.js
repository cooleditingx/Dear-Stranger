import express from 'express'
import { Router } from 'express'
import {getMessages,createMessages,createMessagesPost} from '../controllers/messages.js'
const new_msgs_router = Router()

// new_msgs_router.set('view engine','ejs')
// new_msgs_router.set('views','views')

new_msgs_router.get("/",getMessages)
new_msgs_router.get("/new",createMessages)
new_msgs_router.post("/new",createMessagesPost)
// new_msgs_router.get()

export default new_msgs_router