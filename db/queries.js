import pool from './pool.js'

async function getAllMessages(req,res){
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows
}
async function insertMessages(message,username){
    await pool.query('INSERT INTO messages (message,"username") VALUES ($1,$2)',[message,username])
}

export default {getAllMessages, insertMessages}