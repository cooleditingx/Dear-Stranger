import db from '../db/queries.js'
async function getMessages(req,res){
    const messages = await db.getAllMessages()
    res.send(`From User: ${messages.map(msg => `${msg.user} Message: ${msg.message}`).join(", ")}`)
}
function createMessages(req,res){
    res.render('form')
}
// function displayMessages(req,res){
//     res.render('index')
// }
async function createMessagesPost(req,res){
    const {messages,user} = req.body
    await db.insertMessages(messages,user)
    res.redirect("/")
}

export {getMessages,createMessages,createMessagesPost}