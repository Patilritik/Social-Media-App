import { writeFile } from "fs/promises";
import { NextResponse } from "next/server"
import User from "../../../models/userModel"
import path from "path";
import { dbConnect } from "../../../dbConfig/dbConfig";
import { mkdir, unlink } from "fs";

dbConnect();

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file")
    console.log("file ", file)

    const userName = formData.get("userName")
    console.log("userName is ", userName)

    if (!file) {
        return NextResponse.error({
            error: "File not received",
            status: 400
        })
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("Buffer ", buffer);
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log("filename", filename);


    //deleting old Profile picture
    const existingUser = await User.findOne({userName})
    console.log("existing user is " , existingUser)
    if(existingUser.profileImage){
        const oldPath = path.join(process.cwd() , './public/profileImages/' ,existingUser.profileImage);
        try {
            await unlink(oldPath ,(err)=> console.log("Let check it out with" , err))
            console.log("Deleted old image ");
            
        } catch (error) {
            console.log("error in deleting image" , error);
        }
    }
    //Updation of image in mongo
    const user = await User.updateOne(
        { userName: userName }, // Filter criteria
        { $set: { profileImage: filename } } // Set the profileImage field with profile image name
    );




    console.log("user frm upload route", user);
    try {
       
            await writeFile(
                path.join(process.cwd(), `./public/profileImages/` + filename),
                buffer
            );
        // console.log(("Exist path" , fs.existsSync(path)));
        return NextResponse.json({
            message: "Image uploaded successfully",
            status: 200,
            user
        })

    } catch (error) {
        return NextResponse.error({
            message: "error ho gya " + error,
            status : 400
        })
    }
}