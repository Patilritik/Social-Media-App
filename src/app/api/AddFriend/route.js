import { NextResponse } from "next/server";
import User from "../../../models/userModel";
import { dbConnect } from "../../../dbConfig/dbConfig";

dbConnect();


export async function POST(request) {
    const reqBody = await request.json();
    const { userName, friendtobeAdded } = await reqBody;
    console.log("reqBody in Add Friend Route", userName, friendtobeAdded);
    try {
        const currentUser = await User.findOneAndUpdate(
            { userName },
            { $addToSet: { friends: friendtobeAdded } },
            { new: true }
        )
        if (!currentUser) {
            return NextResponse.json({
                message: "User Not Found",
                status: 404
            })
        }

        return NextResponse.json({
            message: "Friend Added Successfully",
            status: 200,
        
        })
    } catch (error) {
        console.log("error in Add Friend Page route", error);
        return NextResponse.error({
            error: error,
            status: 400
        })
    }
}

export async function DELETE(request) {
    const reqBody = await request.json();
    const { userName, friendtobeRemoved } = await reqBody;
    console.log("reqBody in Add Friend Route", userName, friendtobeRemoved);
    try {
        const currentUser = await User.findOneAndUpdate(
            { userName },
            { $pull: { friends: friendtobeRemoved } },
            { new: true }
        )
        if (!currentUser) {
            return NextResponse.json({
                message: "User Not Found",
                status: 404
            })
        }

        return NextResponse.json({
            message: "Friend Removed Successfully",
            status: 200,
        
        })
    } catch (error) {
        console.log("error in Add Friend Page Delete route", error);
        return NextResponse.error({
            error: error,
            status: 400
        })
    }
}