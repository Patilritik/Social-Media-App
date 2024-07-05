import { NextResponse } from "next/server";
import {dbConnect} from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel.js"
import fs from "fs"

dbConnect();

export async function POST(request){
    
    // const ans  = fs.readFileSync('./public/AllPosts/r/Posts/Post.txt' , "utf-8");

    // console.log("ans" , ans)
    
 try {
    const reqBody = await request.json();
    const {userName} = await reqBody ;
    const user = await User.findOne({userName})

    // console.log("user Details for Home route is" , user);
    
    // const  userName  = await reqBody;
    // console.log("UserName" , userName);
   
    // // console.log("requested",req);    
    // // const response = NextResponse.json({
    // //     message : "Succeessful from Home Route",
    // //     data :"Ritik"
    // // })
    // // return response;
    
    //YE KAAM KR RHA HAI
    return NextResponse.json({
        message : "Success Message",
        userData : user
        
    })
 } catch (error) {
        console.log("Failed from Home Route" , error);
        return NextResponse.error(error)
 }
}