import { NextResponse } from "next/server";
import User from "../../../models/userModel";


export async function POST(request) {
    const req = await request.json();
    const { userName } = await req;
    console.log("usern", userName)
    const currentUser = await User.findOne({userName}) ;
    if(!currentUser){
        console.log("User Not Found");
        return NextResponse.json({
            message : "User Not found",
            status : 400,
        })
    }
    const excludeUser = [currentUser.userName , ...currentUser.friends];

    console.log("----------exclude User" , excludeUser);
    try {
        const friendSuggestions = await User.find(
            {userName : {$nin : excludeUser}},
            'userName bio profileImage'
        ).limit(10);
        return NextResponse.json({
            message: "Routing working",
            status: 200,
            friendSuggestion : friendSuggestions
        })
    } catch (error) {
        console.log("errrir", error)
        return NextResponse.error({
            message: error,
            status: 400
        })
    }
}