import db from '../db/queries.js'
import { insertImage } from './storeimgs.js'
async function getMessages(req,res){
    const messages = await db.getAllMessages()
    res.render('messages',{messages: messages})
    // res.send(`From User: ${messages.map(msg => `${msg.username} Message: ${msg.message}`).join(", ")}`)
}
function createMessages(req,res){
    res.render('form')
}
function gethp (req,res){
    res.render('index')
}
// function displayMessages(req,res){
//     res.render('index')
// }
async function createMessagesPost(req,res){
    const {messages,username} = req.body
    let imgid = null
    if (req.file){
        const {mimetype, originalname, buffer} = req.file
        imgid = await insertImage(mimetype, originalname, buffer)
    }
    await db.insertMessages(messages,username,imgid)
    res.redirect("/messages")
}

export {getMessages,createMessages,createMessagesPost,gethp}