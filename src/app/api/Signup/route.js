
import { NextResponse } from "next/server";
import { dbConnect } from "../../../dbConfig/dbConfig";
import User from '../../../models/userModel'
import bcrypt from 'bcrypt'

dbConnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { userName, email, password , bio , profilePicture} = await reqBody;
        console.log("data from frontend ", reqBody);
        const user = await User.findOne({ userName });
        if (user) {
            return NextResponse.json({
                error: "User Already Exist"
            }, {
                status: 409
            })
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);
            console.log("hashed Password",hashedPassword);
            const newUser = new User({
                userName,
                email,
                password : hashedPassword,
                bio,
                profilePicture
            })

            const saveUser = await newUser.save();
            console.log(saveUser);
            return NextResponse.json({
                message: "User Added ",
                saveUser
            },
                {
                    status: 200,
                });
        }
    } catch (error) {
        return NextResponse.json({
            error: "Error in signup route " + error.message
        }, {
            status: 500
        })
    }


}
