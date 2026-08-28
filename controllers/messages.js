import db from '../db/queries.js'
async function getMessages(req,res){
    const messages = await db.getAllMessages()
    res.render('index',{messages: messages})
    // res.send(`From User: ${messages.map(msg => `${msg.username} Message: ${msg.message}`).join(", ")}`)
}
function createMessages(req,res){
    res.render('form')
}
// function displayMessages(req,res){
//     res.render('index')
// }
async function createMessagesPost(req,res){
    const {messages,username} = req.body
    await db.insertMessages(messages,username)
    res.redirect("/")
}

export {getMessages,createMessages,createMessagesPost}