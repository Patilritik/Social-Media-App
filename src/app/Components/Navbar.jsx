'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FaHome, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import { FiSend } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

import { CiSearch } from "react-icons/ci";
import Image from 'next/image';


export default function Navbar() {
  const [ProfileImage, setProfileImage] = useState();

  const gettingData = async () => {
    try {
      const userNamefromLocal = localStorage.getItem('loggedinUserName')
      const userName = userNamefromLocal
      console.log("usiii", userName);
      const res = await fetch("/api/UserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName })
      })
      const response = await res.json();
      console.log("respiponse", response.userDetails.profileImage);

      setProfileImage(response.userDetails.profileImage);
      // console.error("huugudu",ProfileImage)
    } catch (error) {
      console.log("Error from ", error);
    }
  }

  useEffect(() => {
    gettingData();
  }, [])




  return (
    <>
      <header class="border border-b-gray-300  bg-blue-400">
        <nav class="container mx-auto px-2 py-3">
          <div class="flex items-center justify-between">
            <div class="text-black font-bold text-xl">
              <Link href="/Home">Social Media App</Link>
            </div>


            <div class="hidden md:block space-x-2 ">
              <input type="search" name="Search" id=""
                className='border-none focus:outline-none px-2 py-1 rounded bg-gray-200' placeholder='Search' />
              <button><CiSearch className='w-6 h-6' /></button>
            </div>

            {/* for large screen size */}
            <div class="hidden md:block">
              <ul class="flex items-center space-x-8">
                <li className='w-12 h-8 flex justify-center items-center hover:bg-blue-300 hover:rounded-full transition-all duration-400'><Link href="/Home" title='Home' class="text-black "> <FaHome className='w-6 h-6 ' /></Link></li>
                {/* <li className='w-12 h-8 flex justify-center items-center hover:bg-blue-300 hover:rounded-full transition-all duration-400'><a href="#" title='Message' class="text-black"> <FiSend className='w-6 h-6' /></a></li> */}
                <li className='w-12 h-8 flex justify-center items-center hover:bg-blue-300 hover:rounded-full transition-all duration-400'><Link href="/Home/Settings" title='Settings' class="text-black">< IoMdSettings className='w-6 h-6' /></Link></li>
                <li className='w-12 h-8 flex justify-center items-center hover:bg-blue-300 hover:rounded-full transition-all duration-400' ><Link href="/Home/UserProfile" title='Profile' class="text-black">

                  {ProfileImage ?
                    <img src={`/profileImages/${ProfileImage}`} alt="" className='w-6 h-6 rounded-full' />
                    : <FaRegUserCircle className='w-6 h-6 rounded-full' />}
                </Link>
                </li>
                <li className='w-12 h-8 flex justify-center items-center hover:bg-blue-300 hover:rounded-full transition-all duration-400' ><Link href="/Logout" title="Logout" class="text-black"> <AiOutlineLogout className='w-6 h-6' /></Link>
                </li>
              </ul>
            </div>

            {/* <div class="md:hidden">
              <button class="outline-none mobile-menu-button">
                <svg class="w-6 h-6 text-black" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                
              </button>
            </div> */}
          </div>
          {/* for small screen */}
          {/* <div class="mobile-menu hidden md:hidden">
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="block px-4 py-2 text-black bg-gray-900 rounded">Home</a></li>
              <li><a href="#" class="block px-4 py-2 text-black bg-gray-900 rounded">About</a></li>
              <li><a href="#" class="block px-4 py-2 text-black bg-gray-900 rounded">Services</a></li>
              <li><a href="#" class="block px-4 py-2 text-black bg-gray-900 rounded">Contact</a></li>
            </ul>
          </div> */}

        </nav>
      </header>
    </>

  )
}
