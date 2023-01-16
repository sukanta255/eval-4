const express=require("express")
const {MediaModel}=require("../models/Media.model")

const mediaRouter=express.Router()
require("dotenv").config();



mediaRouter.get("/",async(req,res)=>{
    let query=req.query
    try{
        const medias=await MediaModel.find(query)
        res.send(medias)
    }catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"})
    }
})

mediaRouter.patch("/edit/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await MediaModel.findOne({"_id":id})
    const userID_in_note=note.userID_in_note
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        } else {
            await MediaModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`update the note`)
        }
        
    } catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

mediaRouter.delete("/delete/:id",async (req,res)=>{
    const ID=req.params.id
    try{
        await MediaModel.findByIdAndDelete({_id:ID})
        res.send(`Deleted the media app data whose id is ${ID}`)
    } catch(err){
        console.log(err)
        res.send("Error")
    }
})

mediaRouter.post("/add",async (req,res)=>{
    const data=req.body
    try{
        const media=new MediaModel(data)
        await media.save()
        res.send("Added the media app")
    } catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"})
    }
})

module.exports={
    mediaRouter
}