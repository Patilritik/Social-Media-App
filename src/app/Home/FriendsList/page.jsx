'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import LoadingComponent from '../../Components/LoadingComponent'; 
import FriendSuggestion from '../../Components/FriendSuggestion';

export default function FriendsList() {
    const [Allfriends, setAllfriends] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const removeFriendEvent = async (friendName) => {
        try {
            const userNamefromLocal = localStorage.getItem('loggedinUserName')
            const userName = userNamefromLocal;
            setisLoading(true)
            const res = await fetch('/api/AddFriend', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, friendtobeRemoved: friendName })
            });
            const response = await res.json();
            if (response.status === 200) {
                toast.success(`${friendName} is removed from your friend list !!`)
                setAllfriends(prevFriend => prevFriend.filter(friend => friend.userName != friendName))
            }
            setisLoading(false)
        } catch (error) {
            toast.error("Unfriend event not working well")
        }
    }
    const gettingFriends = async () => {
        try {
            setisLoading(true)
            let userName = '';
            if (typeof window !== 'undefined') {
                userName = localStorage.getItem('loggedinUserName');
            }

            const res = await fetch("/api/FriendsList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName })
            })
            const response = await res.json();
            setAllfriends(response.AllfriendsList)
            console.error(response.AllfriendsList)
            setisLoading(false)
        } catch (error) {
            console.log("Error from ", error);
        }
    }

    useEffect(() => {
        import("@lottiefiles/lottie-player")
        gettingFriends();
    }, [])

    return (
        <>
            {isLoading ?
                <LoadingComponent />
                :
                <div>
                    <Toaster />
                    {Allfriends.length == 0 ?
                        <>
                            <h1 className='text-2xl text-red-500 text-center my-6 font-bold'>You Don't have any friends</h1>
                            <div className="w-full h-96">
                                {/* Replace the URL with your actual Lottie animation JSON file */}
                                <lottie-player
                                    autoplay
                                    loop
                                    mode="normal"
                                    src="/Animation - 1718795964732.json"
                                />
                            </div>
                        </>
                        : <h1 className='text-2xl text-blue-500 text-center my-6 font-bold'>
                            Your All Friends are here
                        </h1>}
                    {
                        Allfriends ? Allfriends.map((friend, index) => (
                            <div key={index} className='border border-black rounded-full px-4 h-20 my-5 mx-12'>
                                <div className='flex m-auto justify-between '>

                                    <div className='flex items-center space-x-2'>
                                        {friend.profileImage ?
                                            <img src={`/profileImages/${friend.profileImage}`}
                                                className="h-16 w-16 rounded-full my-2" alt="" />
                                            :
                                            <img src={`/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg `}
                                                className="h-16 w-16 rounded-full my-2" alt="" />
                                        }

                                        <Link href={`/Home/${friend.userName}`}><h1 className='font-bold'>{friend.userName} </h1></Link>

                                    </div>
                                    <button className='border p-1 w-36 rounded-xl h-8 my-auto  border-red-500 hover:bg-red-500 transition-all duration-500 hover:text-white' onClick={() => removeFriendEvent(friend.userName)}>Unfriend</button>
                                </div>
                            </div>
                        ))

                            : ""
                    }
                </div>
            }
            <div>
                <FriendSuggestion />
            </div>
        </>
    )
}
