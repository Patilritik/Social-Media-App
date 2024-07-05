import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegUserCircle } from "react-icons/fa";





export default function FriendSuggestion() {
    const [friendSuggestionList, setfriendSuggestionList] = useState([]);

    const AddFriendEvent = async (friend) => {
        const userName = localStorage.getItem('loggedinUserName');
        const friendtobeAdded = friend.userName;
        const res = await fetch('/api/AddFriend', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, friendtobeAdded })
        })
        const response = await res.json();
        console.log("hgkdjashgd" , response);
        if (response.status === 200) {
            toast.success("Friend Added")
            setfriendSuggestionList(prevList => {
                const updatedList = prevList.filter(f => f.userName !== friend.userName);
                console.log("updated List", updatedList)
                return updatedList;
            })
        }

        console.log("Add friend Event ", response);
    }

    const getFriendSuggestions = async () => {
        const userName = localStorage.getItem('loggedinUserName');
        const res = await fetch('/api/FriendSuggestion', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName })
        });
        const response = await res.json();
        const friendSuggestionListResponse = await response.friendSuggestion;
        console.log("friend list ", friendSuggestionListResponse);
        setfriendSuggestionList(friendSuggestionListResponse);
    }

    useEffect(() => {
        getFriendSuggestions();
    }, [])

    return (
        <div >
            {friendSuggestionList.length > 0 ?
                <div className='border border-black p-4 '>

                    <h1 className='text-center font-bold'>
                        Friend Suggestions
                    </h1>
                    {friendSuggestionList ? friendSuggestionList.map((friend, index) => (
                        <div key={index} className='flex justify-between rounded-full border border-black my-2 pr-3'>
                            <div className='flex space-x-5 m-2'>
                                {friend.profileImage ?
                                    (
                                    // <img src={`/profileImages/${friend.profileImage}`} alt="" className='h-12 w-12 rounded-full' />
                                      <img src={`/profileImages/${friend.profileImage}`} alt="" className='h-12 w-12 rounded-full'/>      
                                    ) : (<FaRegUserCircle className='h-12 w-12' />)}
                                <div>
                                    <h1 >{friend.userName}</h1>
                                    <p className='text-gray-400 text-sm'>{friend.bio}</p>
                                </div>
                            </div>
                            <button className='border p-1 w-36 rounded-xl h-8 my-auto  border-blue-500 hover:bg-blue-500 transition-all duration-500 hover:text-white' onClick={() => AddFriendEvent(friend)}>Add Friend</button>
                        </div>
                    )) : ""}
                </div> : ""}
        </div>
    )
}
