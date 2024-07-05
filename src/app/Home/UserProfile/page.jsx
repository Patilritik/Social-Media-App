'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import LoadingComponent from '../../Components/LoadingComponent';



export default function UserProfile() {
  const [AllUserPosts, setAllUserPosts] = useState([])
  const [userData, setuserData] = useState()
  const [allImagesPost, setallImagesPost] = useState([])
  const [alltextFeeds, setalltextFeeds] = useState([])
  const [activeTabBtn, setactiveTabBtn] = useState("Images")
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter()

  // console.log("-------------", userData);

  //post deleting event 
  const deletePost = async (postId) => {
    const confirmBtn = confirm("Are you sure want to delete ?");
    console.log("confirm btn console", confirmBtn);
    if (confirmBtn) {
      try {
        setisLoading(true)
        const res = await fetch('/api/UploadPosts', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ postId })
        })
        const response = await res.json();
        if (response.status === 200) {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
          toast.success("Post Deleted Successfully");
        }
        console.log("response in userProfile route for delete post", response)
        setisLoading(false)
      } catch (error) {
        console.log("response in userProfile route for delete post with error of", error)
        toast.error("Something went Wrong")
      }
    } else {
      router.push('/Home/UserProfile')
    }
  }

  const TimeofUpload = (time) => {
    const date = new Date(time);
    const now = new Date();
    const second = Math.floor((now - date) / 1000);
    if (second < 60) {
      return `${second} second ${second !== 1 ? '' : ""}ago`
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
    // console.log("userName gjadjska   -", userFromLocalStorage);
    const userName = localStorage.getItem("loggedinUserName");
    setisLoading(true)
    const res = await fetch("/api/UserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName })

    });
    const Response = await res.json()
    const userData = await Response.userDetails // All data of user 
    setuserData(userData);
    setisLoading(false)
    const userPosts = await userData.posts // All data of Posts 
    setallImagesPost(userPosts.filter(post => post.PostType === "Images"))
    setalltextFeeds(userPosts.filter(post => post.PostType === "Text-Feeds"))

    if (Array.isArray(userPosts)) {
      setAllUserPosts(userPosts)

    }
    // console.error(AllUserPosts)

    // const arr = Object.entries(userPosts)

    // setAllUserPosts(arr)

    // console.log("arr", arr);
    // // alert(typeof(AllUserPosts))
    // console.log("----" , AllUserPosts);
  }

  useEffect(() => {
    getPosts();
  },[])

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  })

  useEffect(() => {
    // AllUserPosts.map((i) => console.log(i)) // This will log the updated posts array when it changes
  }, [AllUserPosts]);


  return (
    <>
      {isLoading ?
        <LoadingComponent />
        : <div className='my-12'>
          <Toaster />
          <div className='flex justify-start py-12 mx-24 px-6 space-x-16 '>
            <Link href={'/Home/Settings'}>
              {userData && userData.profileImage ?
                <img src={userData ? `/profileImages/${userData.profileImage}` : ""} alt="./145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" className='w-48 h-48  rounded-full border-2 hover:opacity-50 transition-all duration-400' title='Change Profile Image' />
                :
                <img src='/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg' alt='' className='w-48 h-48  rounded-full border-2 hover:opacity-50' title='Change Profile Image' />
              }
            </Link>

            <div className='my-auto space-y-6'>
              <h1 className='font-bold text-2xl'>{userData ? userData.userName : ""}</h1>
              <div className='space-y-3'>
                <p className='text-sm text-gray-600'>Bio : {userData ? userData.bio : ""}</p>
                <p className='text-sm text-gray-600'>Email : {userData ? userData.email : ""}</p>
              </div>

              <div className='flex w-72 justify-between '>
                <Link href={'/Home/FriendsList'} className='bg-blue-500 rounded-md p-3 hover:border-blue-400 border-2 border-blue-500 hover:bg-white text-black  font-semibold transition-all duration-400 '>Friends : {userData ? userData.friends.length : ""}</Link>

              </div>
            </div>
          </div>
          <div>
            <h1 className='text-4xl font-bold text-center'>POSTS</h1>
            <div className='flex justify-evenly font-bold'>
              <button className={`border-2 border-red-400 p-2  hover:bg-white transition-all duration-400 rounded-md ${activeTabBtn === "Images" ? "bg-red-400 " : ""}`} onClick={() => setactiveTabBtn("Images")}>Images</button>
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
                      <div className='flex justify-end mb-2'>
                        <RiDeleteBin5Line className='h-8 w-8 text-gray-400 cursor-pointer hover:text-red-400' onClick={() => deletePost(post._id)} />
                      </div>
                      {userData ? <img src={`/AllPosts/${userData.userName}/ImagesPosts/${post.content}`} alt="" className='rounded-xl h-80 w-auto ' /> : ""}
                      <div className='flex justify-between px-2'>
                        {/* <BiLike className='h-8 w-8 mt-2 cursor-pointer hover:text-blue-500 ' /> */}
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
                  :
                  (alltextFeeds.map((post, index) => (
                    <div className='border p-3 my-3 border-black rounded-xl h-auto w-auto text-center' key={index}>
                      <div className='flex justify-end mb-2'>
                        <RiDeleteBin5Line className='h-8 w-8 text-gray-400 cursor-pointer hover:text-red-400 transition-all duration-400' onClick={() => deletePost(post._id)} />
                      </div>
                      <h1 className='rounded-xl min-h-40 w-auto min-w-60 text-justify text-2xl border bg-green-200 p-2'>
                        {post.content}
                      </h1>
                      <div className='flex justify-between'>
                        {/* <BiLike className='h-8 w-8 mt-2 cursor-pointer hover:text-blue-500 ' /> */}
                        <div>

                          <h1 className='text-gray-400 text-sm'>{TimeofUpload(post.updated_at)}</h1>

                        </div>
                      </div>
                    </div>
                  )))) : ""
              }
            </div>

            {/* {
          AllUserPosts.map((post, index) => (
            <div className='border border-black bg-red-500 rounded-xl h-auto w-auto max-h-72  text-center' key={index}>
              {/* {post.content} */}
            {/* <h1 className='text-white '>{post.content}</h1>
              <img src={`/AllPosts/${userFromLocalStorage}/ImagesPosts/${post.content}`} alt="" className='rounded-xl mt-20' />
            </div>
          )) */}
            {/* } */}
            {/*           
        <div className='border border-black rounded-xl h-96 w-84 text-center'>1</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>2</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>3</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>4</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>5</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>6</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>7</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>8</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>9</div>
        <div className='border border-black rounded-xl h-96 w-84 text-center'>10</div> */}

          </div>
        </div>
      }
    </>
  )
}
