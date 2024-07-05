import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs, { mkdirSync, writeFileSync } from "fs"
import User from '../../../models/userModel'
import { dbConnect } from "../../../dbConfig/dbConfig";

dbConnect();

export async function POST(request) {

    try {
        const contentType = request.headers.get("content-type");
        console.log("Content-Type for upload:", contentType);

        console.log(contentType.includes("application/json"))

        // for only text types posts
        if (contentType.includes("application/json")) {

            const req = await request.json();

            console.log("req", req);
            const { userName, Post } = await req

        //    {

        //        // const directoryPath = `./public/AllPosts/${userName}/Posts`
        //        // console.log("-------------------------------");
        //        // fs.mkdirSync(directoryPath, { recursive: true })
        //        // const filePath = path.join(process.cwd(), 'public', 'AllPosts', `${userName}`, 'Posts', `post-${Date.now()}.txt`);
               
        //        // fs.writeFileSync(filePath, Post)
        //        // console.log("in backend", userName, Post);
        //     }

            const user = await User.findOne({ userName })
            console.log("---- user", user);
            if (user) {

                const result = await User.updateOne(
                    { userName: userName }, // Filter criteria
                    {
                        $push: {
                            posts:
                            {
                                content: Post,
                                created_at: new Date(),
                                updated_at: new Date(),
                                PostType: 'Text-Feeds'
                            }
                        }
                    } // Set the profileImage field with profile image name
                );
                console.log("result", result)

                const savedDetails = await user.save();
                console.log("savedDetails ", savedDetails)
                console.log("Post saved successfully for ", userName, Post);
                console.log("savedDetails ", savedDetails)
                return NextResponse.json({
                    message: "Post uploaded",
                    status: 200
                });
            }
            else {
                return NextResponse.json({
                    message: "User not found",
                    status: 404
                })
            }
        }

        // For only files upload
        else {
            const formData = await request.formData();
            const file = await formData.get("file")
            console.log("file ", file)

            const userName = await formData.get("userName")
            console.log("userName is ", userName)

            if (!file) {
                return NextResponse.error({
                    error: "File not received",
                    status: 400
                })
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            console.log("buffer", buffer);
            const filename = Date.now() + file.name.replaceAll(" ", "_");
            console.log("file in uploadation ", filename);

            try {
                console.log("fdddddddddddd");
                const directoryPath = `./public/AllPosts/${userName}/ImagesPosts`
                console.log("dir", directoryPath);

                fs.mkdirSync(directoryPath, { recursive: true })
                writeFileSync(path.join(process.cwd(), `/public/AllPosts/${userName}/ImagesPosts/` + filename), buffer)
                const user = await User.findOne({ userName })
                if (user) {
                    await User.updateOne(
                        { userName: userName }, // Filter criteria
                        {
                            $push: {
                                posts:
                                {
                                    content: filename,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                    PostType: "Images"
                                }
                            }
                        }
                    );

                    const ceck = await user.save();
                    console.log("******************", ceck)
                    console.log("Post saved successfully for ", userName, file.type);
                    return NextResponse.json({
                        message: "Post uploaded",
                        status: 200
                    })
                }
                else {
                    return NextResponse.json({
                        message: "User not found",
                        status: 404
                    })
                }
            } catch (error) {
                console.log("error in catch block ", error.message);
                return NextResponse.error({
                    message: "Upload Failed",
                    status: 400
                })
            }
        }

    }

    catch (error) {
        return NextResponse.error({
            message: "Upload Failed from Catch block",
            error: error,
            status: 400
        })
    }



}

export async function DELETE(request) {
    dbConnect()
    try {
        const req = await request.json();
        const { postId } = await req;
        console.log("backend route for DELETE method ", postId);

        //Fetching user from Mongo    
        const user = await User.findOne({ "posts._id": postId });
        console.log("=~~~~~~~~~~~~~~~~~~~~~~~~~~~")


        const PostTobeDeleted = await user.posts.id(postId);
        console.log("fddddddddddddddddddddddd", PostTobeDeleted);
        // If post to be deleted is of type Images
        if (PostTobeDeleted.PostType === 'Images') {
            const filename = PostTobeDeleted.content;
            console.log("-----------DELETED SECTION FOR IMAGES POST--------------");
            const filePath = path.join(process.cwd(), 'public', 'AllPosts', `${user.userName}`, 'ImagesPosts', `${filename}`)

            //deleting file from the public folder 
            fs.unlink(filePath, () => {
                console.log("Callback for file path")
            })
            //deleting post from database
            user.posts.pull({ _id: postId });
            await user.save();
            console.log("inside deletedPost", filePath);
        }
        
        // If post to be deleted is of type Text
        else if (PostTobeDeleted.PostType === 'Text-Feeds') {
            console.log("-----------DELETED SECTION FOR TEXT-FEEDS POST--------------");
            
            //deleting text-feeds post from database
            user.posts.pull({ _id: postId });
            await user.save();
            console.log("inside deletedPost for text feeds post");
        }

        console.log("Post delete successfully ", postId);

        return NextResponse.json({
            message: "Post Deleted Successfully",
            status: 200
            
        })
    } catch (error) {
        console.log("response in DELETE error", error)
        return NextResponse.error({
            error: error,
            status: 400
        })
    }
}