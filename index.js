const express=require("express")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {mediaRouter}=require("./routes/Media.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
require("dotenv").config()

const app=express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome Media App")
})


app.use("/userss",userRouter)
app.use(authenticate)
app.use("/medias",mediaRouter)

app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    } catch(err){
        console.log("Error while connecting to DB")
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})