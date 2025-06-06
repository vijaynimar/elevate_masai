import { Schema,model } from "mongoose";
const leaderboardSchema=new Schema({
    name:{type:String,required:true},
    marks:{type:Number,required:true}
})

const leaderboard=model("leaderboard",leaderboardSchema)
export{leaderboard}