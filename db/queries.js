import pool from './pool.js'

async function getAllMessages(req,res){
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows
}
async function insertMessages(message,user){
    await pool.query('INSERT INTO messages (message,"user") VALUES ($1,$2)',[message,user])
}

export default {getAllMessages, insertMessages}