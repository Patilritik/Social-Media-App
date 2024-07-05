import { NextResponse } from "next/server";
import { dbConnect } from "../../../dbConfig/dbConfig"
import User from "../../../models/userModel"

dbConnect();
export async function POST(request) {
    const reqBody = await request.json();
    const { userName } = await reqBody;
    try {
        const currentUser = await User.findOne({ userName });
        if (!currentUser) {
            return NextResponse.json({
                message: "User not found",
                status: 400
            })
        }
        const friends = await currentUser.friends;

        const AllfriendsListToDisplay = await User.aggregate([
            { $match: { userName: { $in: friends } } },
            { $unwind: "$posts" },
            {
                $project: {
                    _id: 1,
                    userName: 1,
                    profileImage: 1,
                    bio: 1,
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userName: { $first: "$userName" },
                    bio: { $first: "$bio" },
                    profileImage: { $first: "$profileImage" },
                }
            }
        ]);

        let AllfriendsList = [];
        AllfriendsListToDisplay.forEach(friend => {
            const { userName, profileImage, bio } = friend;
            AllfriendsList.push({
                userName,
                profileImage,
                bio,
            })
        })


        return NextResponse.json({
            AllfriendsList: AllfriendsList,
            status: 200,
            message: "Success ful"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something bad",
            error: error,
            status: 400
        })
    }

}
