const fs=require("fs")
fs.writeFileSync("db.txt",`vijaynimar\n`)
fs.appendFileSync("db.txt",`vijay\n`)
fs.readFile("db.txt","utf-8",(err,data)=>{
    if(err){
        throw err
    }
   console.log(data);
})
console.log("10");
fs.appendFileSync("db.txt",`vijay`)
fs.unlink("db.txt",(err)=>{
    if(err){
        throw err
    }
})