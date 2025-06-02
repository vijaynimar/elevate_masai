import express from "express"
const app=express()
app.use(express.json())
let arr=[]
app.use((req,res,next)=>{
    let y=new Date().toISOString()
    console.log(y);
    console.log(req.body);
    console.log(req.method);
    next()
})

app.post("/login",(req,res)=>{
    console.log("api hitted");
   let user={username:req.body.username,email:req.body.email,password:req.body.password}
   arr.push(user)
   res.send(arr)
})
console.log(arr);
app.listen(2000,()=>{
    console.log("server started at port 3000");
})

