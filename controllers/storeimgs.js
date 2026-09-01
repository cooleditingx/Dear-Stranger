import express from "express"
import pool from '../db/pool.js'


async function GetImages (req,res){
    try{
        const result = await pool.query("SELECT mimetype, imgdata FROM images WHERE id = $1",[req.params.id])
        if (result.rows.length === 0){
            return res.status(404).send("Not Found")
        }
        const {mimetype, imgdata} = result.rows[0]
        res.set("Content-type", mimetype)
        res.send(imgdata)
    }   
    catch(err){
        console.log("error")
        res.status("500").send("Error Fetching image")
    }
}
async function UploadImages (req,res){
    try {
        const {mimetype, imgname, buffer } = req.file
        const result = await pool.query("INSERT INTO images (imgname,mimetype,imgdata) VALUES ($1, $2, $3) RETURNING id", [imgname,mimetype,buffer])
        res.json({id: result.rows[0].id})
    } catch (error) {
        console.log("error")
        res.status(505).send("Upload failed")
    }
}
export {GetImages, UploadImages}