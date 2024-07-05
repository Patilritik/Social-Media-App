
import { NextResponse } from "next/server";
import {dbConnect} from "../../../dbConfig/dbConfig"
import User from "../../../models/userModel";
dbConnect();

export async function POST(request){

    const res = await request.json();
    const {userName} = await res;
    console.log("USER NAME from backend of userProfile " , userName)
    const userDetails = await User.findOne({userName})    
    if(!userDetails){
        return NextResponse.json({
            message : "User Not found",
            status : 400,
        })
    }
    return NextResponse.json({
        message :"done donaaa done",
        status : 200,
        userDetails
    })
}