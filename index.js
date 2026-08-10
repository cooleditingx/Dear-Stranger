import path from 'express'
import express from 'express'
import ejs from 'ejs'
import formRouter from './routes/new_msgs.js'
import messages from './messages.js'

const app = express()
const __dirname = import.meta.dirname

app.set('view engine','ejs')
app.set('views','views')

app.get("/",(req,res)=> {
    res.render('index',{messages: messages})
})
// app.get("/new",(req,res) => {
//     res.send("Hello world from messages")
// })
app.use(express.urlencoded({ extended: true }));
app.use("/new",formRouter)
// app.post("/new",formRouter)

app.listen(process.env.PORT,(error) => {
    if (error)
        throw error
    console.log(`Message board is working at port ${process.env.PORT}`)
})