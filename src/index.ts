import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from 'cors'
import router from './router/sRoute'
dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
})
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
mongoose.connection.on('error',(error:Error)=> console.log(error))

app.use('/students',router())
app.get("/",(req,res)=>{
    res.status(200).send({message:"api working"})
})