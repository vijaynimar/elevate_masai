const http=require("http")
const myServer=http.createServer((req,res)=>{
    console.log("New Req connected");
    if(req.url=="/login" && req.method=="POST"){
      return  res.end("login")
    }
    res.end("Hellor from server")
})

myServer.listen(2000,()=>{
    console.log("server started at port 2000");
})