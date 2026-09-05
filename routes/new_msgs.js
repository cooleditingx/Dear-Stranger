import express from 'express'
import { Router } from 'express'
import multer from 'multer'
import {getMessages,createMessages,createMessagesPost,gethp} from '../controllers/messages.js'
const new_msgs_router = Router()
const upload = multer({storage: multer.memoryStorage()})

// new_msgs_router.set('view engine','ejs')
// new_msgs_router.set('views','views')

new_msgs_router.get('/',gethp)
new_msgs_router.get("/messages",getMessages)
new_msgs_router.get("/new",createMessages)
new_msgs_router.post("/new", upload.single("image"), createMessagesPost)
// new_msgs_router.get()

export default new_msgs_router