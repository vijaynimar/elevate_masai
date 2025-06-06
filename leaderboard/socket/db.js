import {connect} from "mongoose"

const connection=async()=>{
    try{
        await connect("mongodb://127.0.0.1:27017/leaderboard")
        console.log("conencted to database done");
    }catch(err){
        console.log("error in mongodb ");
    }
}

export default connection