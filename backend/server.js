import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from "path";
import mongoose  from 'mongoose';
// import cors from 'cors';

const app=express();
const url=process.env.DB_URL;
const port=8080;
// console.log(path.resolve());



const connectDB=async()=>{
    try {
             return new Promise(async (resolve,reject)=>{
             const connection=await mongoose.connect(url);
             if(connection){
                 return resolve(connection.connections[0]);
             }else{
                throw "something went wronge";
             } })
         } catch (error) {
             reject(error);
         }
}

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(path.resolve(),'frontend','build')))
    app.get('*',(req,res)=>{
        return res.sendFile(path.join(path.resolve(),'frontend','build',"index.html"))
    })
}
// app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get('/get',(req,res)=>{
    return res.status(200).json({
        message:"Data aaya hai",
        success:true,
    })
})



connectDB().then((connect)=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ::${port}`);
        console.log(`ConnectedDB::${connect.name}`);
    });   
}).catch((err)=>{
     console.log(`ConnectionError :: ${err}`);
})

