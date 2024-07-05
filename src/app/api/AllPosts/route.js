    import { NextResponse } from "next/server";
    import { dbConnect } from "../../../dbConfig/dbConfig";
    import User from "../../../models/userModel";


    dbConnect();

    export async function POST(request) {
        const reqBody = await request.json();
        const { userName } = await reqBody;
        console.log("hey user ", userName);
        try {
            const currentUser = await User.findOne({ userName });
            if (!currentUser) {
                return NextResponse.json({
                    message: "User Not Found",
                    status: 404
                })
            }

            const friends = await currentUser.friends;
            // aggregate combine the two or more fields to make a relevent required
            const friendPosts = await User.aggregate([
                { $match: { userName: { $in: friends } } },
                { $unwind: "$posts" },
                { $sort: { "posts.created_at": -1 } },
                {
                    $project: {
                        _id: 1,
                        userName: 1,
                        profileImage: 1,
                        bio: 1,
                        postContent: "$posts.content",
                        postCreatedAt: "$posts.created_at",
                        postType: "$posts.PostType"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        userName: { $first: "$userName" },
                        bio: { $first: "$bio" },
                        profileImage: { $first: "$profileImage" },
                        posts: {
                            $push: {
                                content: "$postContent",
                                created_at: "$postCreatedAt",
                                PostType: "$postType"
                            }
                        }
                    }
                }
            ]);

            let latestPosts = [];
            friendPosts.forEach(friend => {
                const { userName, profileImage, posts, bio , postCreatedAt} = friend;
                posts.forEach(post => {
                    latestPosts.push({
                        userName,
                        profileImage,
                        bio,
                        postCreatedAt,
                        ...post
                    })
                })
            })

            latestPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            console.log("latest post", latestPosts);
            return NextResponse.json({
                message: "Fetching All posts route is working",
                status: 200,
                latestPosts: latestPosts
            })
        } catch (error) {
            console.log("error in AllPosts backend route", error);
            return NextResponse.json({
                error: error,
                status: 400
            })
        }

    }