import { NextResponse } from "next/server";
import { dbConnect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dbConnect();

export async function POST(request) {
    try {
        const req = await request.json();
        const { userName, password } = await req;
        const user = await User.findOne({ userName })
        console.log("user details from login route ", user);

        const validPass = await bcrypt.compare(password, user.password)
        console.log(validPass);

        if (!validPass || !user.userName) {
            return NextResponse.json({
                error: "Invalid User",
            }, {
                status: 409
            })
        }

        const tokenData = {
            id: user._id,
            userName: user.userName

        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: 20 })
        console.log("token ", token);

        const response = NextResponse.json({
            mesaage: "Login Successful",
            username: user,
            status: 200,
            token: token
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error) {
        console.log("Error in login route", error);
        return NextResponse.error({
            error: "Invalid Username or Password",
            status: 400
        })
    }

}