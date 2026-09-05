import pool from './pool.js'

async function getAllMessages(req,res){
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows
}
async function insertMessages(message,username,imgid = null){
    await pool.query('INSERT INTO messages (message,"username",imgid) VALUES ($1,$2,$3)',[message,username,imgid])
}

export default {getAllMessages, insertMessages}