'use client'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Sidebar from '../Components/Sidebar'
import StoryCard from '../Components/StoryCard'
import Post from '../Components/Post'
import FileInput from '../Components/FileInput'
import FriendSuggestion from '../Components/FriendSuggestion'
import LoadingComponent from '../Components/LoadingComponent'  
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from 'next/navigation'

export default function UserName() {
  const [isLoading, setisLoading] = useState(true);

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    bio: "",
    profileImage: "",
    friends: "",
  })

  const Postref = useRef(null)
  const imageRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [latestPosts, setLatestPosts] = useState([])
  const router = useRouter();


  // Handling file on uploading and remove 
  const handleFileChange = (file) => {
    setSelectedFile(file);
    console.log("Selected File is", file);
  }

  const RemoveFile = () => {
    setSelectedFile(null);
  }


  // Handling upload Text posts
  const handleTextPostupload = async () => {
    if (!Postref.current.value) {
      toast.error("Please first Write something to Post or Upload a Photo")
      return;
    }
    console.log("The things you are writing ", Postref.current.value);
    try {
      setisLoading(true)
      const Post = Postref.current.value;
      const userName = localStorage.getItem('loggedinUserName');
      const res = await fetch('/api/UploadPosts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, Post })
      });
      if (!res.ok) {
        toast.error("Failed To Upload")
        return;
      }
      setisLoading(false)
      console.log("Postref.current.value ",);
      Postref.current.value = '';
      toast.success("Post Uploaded Successfully")
      const response = await res.json();

    } catch (error) {
      console.log("Error in Home page from Upload Post route", error)
    }

  }


  // Handling upload Images posts
  const handleImagesPostupload = async () => {
    console.log("handling image upload posts", imageRef.current.textContent);
    try {
      setisLoading(true)
      const userName = localStorage.getItem('loggedinUserName')
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userName', userName);
      const res = await fetch('/api/UploadPosts', {
        method: "POST",
        body: formData
      })
      const response = await res;
      if (response.ok) {
        toast.success("Post Upload Successfully")
        setSelectedFile(null)
      }
      setisLoading(false)
      console.log("response in upload Post page in Home page ", response);
    } catch (error) {
      console.log("Error in Upload Post Home page ", error);
    }
  }




  // const userNamefromLocal = localStorage.getItem('loggedinUserName')
  // console.log("The user name is ", userNamefromLocal)
  // if(!userName){
  //     router.push("/login")
  // }
  // console.log("Local storage user name is ", userName);

  // console.log("userdata is ", userData);

  // const userName = params
  // console.log("params", params);



  // Getting user Data from backend

  const gettingData = async () => {
    try {
      setisLoading(true)
      const userNamefromLocal = localStorage.getItem('loggedinUserName')
      const userName = userNamefromLocal
      console.log("usiii", userName);
      const res = await fetch("/api/Home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName })
      })
      const response = await res.json();
      console.log("respiponse", response);
      setUserData(response.userData)
      setisLoading(false)
      console.log("Dhupchick response", userData)
    } catch (error) {
      console.log("Error from ", error);
    }
  }
  useEffect(() => {
      gettingData();
  }, [])

  const gettingAllFriendsPosts = async () => {
    const userNamefromLocal = localStorage.getItem('loggedinUserName')
    const userName = userNamefromLocal
    setisLoading(true)
    const res = await fetch("/api/AllPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName })
    })
    const response = await res.json();
    const allPostsList = await response.latestPosts;
    console.log("response for Getting Post ", allPostsList);
    setLatestPosts(allPostsList)
    setisLoading(false)
  }

  useEffect(() => {
     gettingAllFriendsPosts();
  }, [])

  const scrollContainerRef = useRef(null);
  // toast.success("Successfully Login",{
  //   duration : 2000,
  // });

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100;
      console.log("scroll bar right", scrollContainerRef.current.scrollLeft);
    }
  }
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100;
      console.log("scroll bar left", scrollContainerRef.current.scrollLeft);
    }
  }


  return (

    <>
      {/* Loading spinner  */}
      {isLoading ?
        <LoadingComponent /> 
        :
        <div className='mx-12 ' >
          <Toaster />
          {/* Loading animation  */}
          <div className='flex '>
            <Sidebar username={userData ? userData.userName : ""} Bio={userData ? userData.bio : ""} Email={userData ? userData.email : ""} profileimage={userData ? userData.profileImage : ""} friends={userData ? userData.friends.length : ""} />

            <div className='w-8/12 mt-4 '>
              <div className='flex justify-between items-center '>

                {/* <BsArrowLeftCircle className='w-8 h-8  absolute  z-10  bg-gray-400 rounded-full cursor-pointer ' onClick={handleScrollLeft} /> */}



                {/* <div className={'w-full h-48 border border-red-400 p-2 flex overflow-x-hidden space-x-4 relative scroll-none items-center'} ref={scrollContainerRef}>

              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />

            </div> */}
                {/* <BsArrowRightCircle className='w-8 h-8  absolute  right-8 bg-gray-400 rounded-full cursor-pointer' onClick={handleScrollRight} /> */}

              </div>

              {/*   Upload image section */}

              <div className='border rounded-3xl my-6 p-4'>
                <div className='flex justify-between items-center'>
                  <div className=' ml-2'>
                    {
                      userData && userData.profileImage ? <img fill src={userData ? `/profileImages/${userData.profileImage}` : " "} className='h-20 w-20 rounded-full'
                        alt={"No image found"} />
                        :
                        <img fill src="/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" className='h-20 w-20 rounded-full'
                          alt={"No image found"}
                        />
                    }
                  </div>

                  <div className='border w-[70%] rounded-2xl'>
                    <textarea type="text" name="" id="" placeholder="What's on your mind?" className='w-full focus:outline-none p-2 rounded-3xl' ref={Postref} />
                  </div>

                  <button className=' bg-blue-500 px-2 py-1 h-10 border-2 border-blue-500 rounded-xl hover:border-blue-500   hover:bg-white text-black transition-all duration-400 flex justify-center' onClick={handleTextPostupload}>
                    Post Now
                  </button>
                </div>


                <div className='my-2 text-center'>
                  {!selectedFile ? <FileInput onChange={handleFileChange} /> : ""}

                  {selectedFile &&
                    <div className='flex justify-evenly items-center'>
                      <p className='font-bold' ref={imageRef}>Selected File : {selectedFile.name}</p>
                      <button className='bg-red-500 p-2 text-white rounded-xl hover:bg-white hover:text-black border-2 border-red-500 ' onClick={RemoveFile}>
                        Remove
                      </button>
                      <button className='bg-green-500 p-2 text-white rounded-xl hover:bg-white hover:text-black border-2 border-green-500 transition-all duration-400 ' onClick={handleImagesPostupload}>
                        Upload Now
                      </button>
                    </div>
                  }
                </div>
              </div>

              {/* <div className='border border-black p-4 '> */}
                <FriendSuggestion />
              {/* </div> */}

              {/* All Posts Section  */}
              <div className=' mt-12'>
                {latestPosts ? latestPosts.map((post, index) => (
                  <div key={index}>
                    {console.log("----------ddidng ", post.created_at)}
                    <Post content={post.content} name={post.userName} Bio={post.bio} profile={post.profileImage} postType={post.PostType} timeofupload={post.created_at} />
                  </div>
                )) : ""}


              </div>
            </div>
          </div>
        </div >
      }
    </>

  )
}
