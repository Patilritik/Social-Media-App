'use client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import LoadingComponent from '../../Components/LoadingComponent';
import Image from 'next/image';

export default function FriendProfile() {
    const query = useParams();


    const [AllUserPosts, setAllUserPosts] = useState([])
    const [userData, setuserData] = useState()
    const [allImagesPost, setallImagesPost] = useState([])
    const [alltextFeeds, setalltextFeeds] = useState([])
    const [activeTabBtn, setactiveTabBtn] = useState("Images")
    const [isLoading, setisLoading] = useState(true);
    const friendName = query.FriendProfile;

    const router = useRouter()

    const TimeofUpload = (time) => {
        const date = new Date(time);
        const now = new Date();
        const second = Math.floor((now - date) / 1000);
        if (second < 60) {
            return `${second} second ${second !== 1 ? 's' : ""}ago`
        }

        const minutes = Math.floor(second / 60);
        if (minutes < 60) {
            return `${minutes} minutes ${minutes !== 1 ? 's' : ""}ago`
        }

        const hour = Math.floor(minutes / 60);
        if (hour < 24) {
            return `${hour} hours ${hour !== 1 ? '' : ""}ago`
        }
        const day = Math.floor(hour / 24);
        return `${day} days ${day !== 1 ? '' : ""}ago`

    }

    const getPosts = async () => {
        const userName = friendName;
        setisLoading(true)
        const res = await fetch("/api/UserProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName })

        });
        const Response = await res.json()
        setisLoading(false)
        // console.error(Response)
        if (Response.status === 400) {
            toast.error("User Not Found");
            router.back()
        }
        else {
            const userData = await Response.userDetails // All data of user 
            setuserData(userData);
            const userPosts = await userData.posts // All data of Posts 
            setallImagesPost(userPosts.filter(post => post.PostType === "Images"))
            setalltextFeeds(userPosts.filter(post => post.PostType === "Text-Feeds"))

            if (Array.isArray(userPosts)) {
                setAllUserPosts(userPosts)

            }
        }

    }

    useEffect(() => {
        getPosts();
    }, [])
    // iodsaghoaghdoisagdiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii


    useEffect(() => {
        // AllUserPosts.map((i) => console.log(i)) // This will log the updated posts array when it changes
    }, [AllUserPosts]);


    return (
        <>

            {isLoading ?
                <LoadingComponent />
                // </div >
                : <div className='my-12'>
                    <Toaster />

                    <div className='flex justify-start py-12 mx-24 px-6 space-x-16 '>

                        {userData && userData.profileImage ?
                            <img src={userData ? `/profileImages/${userData.profileImage}` : ""} alt="./145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" className='w-48 h-48  rounded-full border-2 ' />
                            :
                            <img src='/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg' alt='' className='w-48 h-48  rounded-full border-2 ' />
                        }

                        <div className='my-auto space-y-6'>
                            <h1 className='font-bold text-2xl'>{userData ? userData.userName : ""}</h1>
                            <div className='space-y-3 text-justify'>
                                <p className='text-sm text-gray-600'>Bio : {userData ? userData.bio : ""}</p>
                                <p className='text-sm text-gray-600'>Email : {userData ? userData.email : ""}</p>
                                <p className='text-sm text-gray-600'>Friends : {userData ? userData.friends.length : ""}</p>

                            </div>

                        </div>
                        

                    </div>
                    <div>
                        <h1 className='text-4xl font-bold text-center'>POSTS</h1>
                        <div className='flex justify-evenly font-bold'>
                            <button className={`border-2 border-red-400 p-2  hover:bg-white transition-all duration-400 rounded-md  ${activeTabBtn === "Images" ? "bg-red-400 " : ""}`} onClick={() => setactiveTabBtn("Images")}>Images</button>
                            <button className={`border-2 border-red-400 p-2  hover:bg-white transition-all duration-400 rounded-md ${activeTabBtn === "Text-Feeds" ? "bg-red-400 " : ""}`} onClick={() => setactiveTabBtn("Text-Feeds")}>Text Feeds</button>
                        </div>

                        <div className='w-100 bg-blue-500 h-0.5 mt-5'></div>
                        {/* <div className='grid md:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-4 border-none px-12 mt-12'> */}

                        <div className='flex flex-wrap gap-2 justify-evenly items-center border-none px-12 mt-12'>
                            {/* Posts Section  */}

                            {/* For Images section */}
                            {activeTabBtn === "Images" ?
                                (allImagesPost.length === 0 ?
                                    (<div>
                                        <h1 className='text-3xl font-bold text-center text-red-400'>Nothing to Show</h1>
                                        <div>
                                            <lottie-player
                                                autoplay
                                                loop
                                                mode="normal"
                                                src="/Animation - 1718975191010.json"
                                            />
                                        </div>
                                    </div>)
                                    : allImagesPost.map((post, index) => (
                                        <div className='border p-5 my-4 border-black  rounded-xl h-auto w-auto bg-blue-200  text-center' key={index}>
                                            {/* {post.content} */}
                                            {/* <div className='flex justify-end mb-2'>
                                                <RiDeleteBin5Line className='h-8 w-8 text-gray-400 cursor-pointer hover:text-red-400' onClick={() => deletePost(post._id)} />
                                            </div> */}
                                            <img src={`/AllPosts/${friendName}/ImagesPosts/${post.content}`} alt="" className='rounded-xl h-80 w-auto ' />
                                            <div className='flex justify-between px-2'>
                                                <h1 className='text-gray-400 text-sm'>{TimeofUpload(post.updated_at)}</h1>
                                            </div>
                                        </div>
                                    ))
                                )
                                : (""
                                )}
                        </div>


                        {/* For Text content */}
                        <div className='flex flex-wrap gap-2 justify-evenly items-center border-none px-12 '>
                            {activeTabBtn === "Text-Feeds" ?
                                (alltextFeeds.length === 0 ?
                                    (<div>
                                        <h1 className='text-3xl font-bold text-center text-red-400'>Nothing to Show</h1>
                                        <div>
                                            <lottie-player
                                                autoplay
                                                loop
                                                mode="normal"
                                                src="/Animation - 1718975191010.json"
                                            />
                                        </div>
                                    </div>)
                                    : (alltextFeeds.map((post, index) => (
                                        <div className='border p-3 my-3 border-black rounded-xl h-auto w-auto text-center' key={index}>
                                            <div className='flex justify-end mb-2'>
                                                <RiDeleteBin5Line className='h-8 w-8 text-gray-400 cursor-pointer hover:text-red-600' onClick={() => deletePost(post._id)} />
                                            </div>
                                            <h1 className='rounded-xl min-h-40 w-auto min-w-60 text-justify text-2xl border bg-green-200 p-2'>
                                                {post.content}
                                            </h1>
                                            <div className='flex justify-between'>
                                                <BiLike className='h-8 w-8 mt-2 cursor-pointer hover:text-blue-500 ' />
                                                <div>

                                                    <h1 className='text-gray-400 text-sm'>{TimeofUpload(post.updated_at)}</h1>

                                                </div>
                                            </div>
                                        </div>
                                    )))) : ""
                            }
                        </div>


                    </div>
                </div>
            }
        </>
    )
}

