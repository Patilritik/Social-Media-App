import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    // post_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: new mongoose.Types.ObjectId
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    PostType: {
        type: String,
    }

});


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter user name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    bio: {
        type: String,
        required: [true, "Please enter bio"]
    },

    profileImage: {
        type: String // Store URL or file path to the profile image
    },
    posts: [PostSchema],
    
    friends: [{
        type: String
    }]
})

const User = mongoose.models.userDetails || mongoose.model("userDetails", userSchema)


export default User;