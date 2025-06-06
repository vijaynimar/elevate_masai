import express from "express"
import http from "http"
import {Server} from "socket.io"
import connection from "./db.js"
const app=express()
const server=http.createServer(app)
const io=new Server(server)
import { leaderboard } from "./model/leaderboard.js"
app.use(express.static("../socketFrontend"))
connection()
const user={}
io.on("connection",(socket)=>{
    console.log("socket connected to server");
    async function fetchLeaderboard(){
         let updatedData=await leaderboard.aggregate([
            {
                $sort:{
                    marks:-1
                }
            }
        ])
        return updatedData
    }
    fetchLeaderboard().then(data => {
        socket.emit("fromServer", data); // Send only to the connected socket
    });
    socket.on("studentDetails",async(data)=>{
        const {name,marks}=data
        await leaderboard.insertOne({name:name,marks:marks})
        console.log("added to leaderboard");
        let updatedData=await leaderboard.aggregate([
            {
                $sort:{
                    marks:-1
                }
            }
        ])
        console.log(updatedData);
        io.emit("fromServer",updatedData)
    })
    // socket.on("inputMsg",(msg)=>{
    //     const name=user['userId']
    //     const promptMessage=`${name}: ${msg}`
    //     console.log(promptMessage);
    //     io.emit("fromServer",promptMessage)
    // })
    // socket.on("username",(name)=>{
    //     user['userId']=name
    //     console.log(user);
    // })
    // socket.on("disconnect",()=>{
    //     console.log("socket disconnected");
    // })
})

server.listen(3000,()=>{

    console.log("server started at http://localhost:3000");
})