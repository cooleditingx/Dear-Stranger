// import path from 'express'
import express from 'express'
import ejs from 'ejs'
import formRouter from './routes/new_msgs.js'
import new_msgs_router from './routes/new_msgs.js'
import path from "path"

const app = express()
const __dirname = import.meta.dirname
const assetPath = path.join(__dirname, "/public")

app.use(express.static(assetPath))
app.set('view engine','ejs')
app.set('views','views')
// app.get("/",(req,res)=> {
//     res.render('index',{messages: messages})
// })
app.use(express.urlencoded({ extended: true }));
app.use("/",new_msgs_router)
app.use("/",new_msgs_router)
// app.post("/new",formRouter)

app.listen(process.env.PORT,(error) => {
    if (error)
        throw error
    console.log(`Message board is working at port ${process.env.PORT}`)
})