
import { NextResponse } from "next/server";
import { dbConnect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import fs from "fs"
import path from "path"

 

dbConnect();


export async function DELETE(request) {
    const req = await request.json();
    const { userName } = await req;
    const user = await User.findOne({ userName });
    if (!user) {
        return NextResponse.json({
            message: "User Not Found",
            status: 400,
        })
    }
    try {
        const folderPath = path.join(process.cwd() , 'public', 'AllPosts', `${userName}`)
        console.log("Folder Path",folderPath)
        await fs.rm(folderPath, { recursive: true, force: true });
        
        console.log("Profile Image" , user.profileImage)
        if(user.profileImage){
            const profileImage = path.join(process.cwd() , 'public', 'profileImages' ,`${user.profileImage}`)
            fs.unlink(profileImage ,()=>{
                console.log("Callback for fild path in deleteing use account ")
            })

        }
        const result = await User.deleteOne({ userName: userName });
        if (result.deletedCount === 0) {
            return NextResponse.json({
                message: "Nothing is Deleted", 
                status: 404
            })
        }
        cookies().delete('token')
        return NextResponse.json({
            message: "Deleted Account Successfully",
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error Occured",
            status: 400
        })
    }
}



export async function POST(request) {
    const req = await request.json();
    const { usernameFromLocalStorage, detailTobeUpdate, action } = await req
    console.log("---------------------------------------", usernameFromLocalStorage, detailTobeUpdate, action)
    try {
        const user = await User.findOne({ userName: usernameFromLocalStorage })
        if (!user) {
            return NextResponse.json({
                message: "User Not Found",
                status: 404,
            })
        }
        switch (action) {
            case 'updateUserName':
                const userNametobeUpdate = await User.findOne({ userName: detailTobeUpdate });
                if (userNametobeUpdate) {
                    return NextResponse.json({
                        message: "Username Already Exist",
                        status: 400,
                    })
                }
                user.userName = detailTobeUpdate;
                break;

            case 'updateBio':
                user.bio = detailTobeUpdate;
                break;

            case 'updateEmail':
                user.email = detailTobeUpdate;
                break;

            case 'updatePassword':
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(detailTobeUpdate, salt);
                user.password = hashedPassword;
                break;

            default:
                return NextResponse.json({
                    message: "Invalid Action",
                    status: 400
                })
        }
        await user.save();
        return NextResponse.json({
            message: "Update Successfully",
            status: 200
        });
    }
    catch (error) {
        return NextResponse.json({
            message: "error",
            status: 400,

        })
    }
}

