'use client'
import React, { useState } from 'react'
import UploadImage from '../../Components/UploadImage'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../../Components/LoadingComponent';

export default function Settings() {
    const [userName, setUserName] = useState();
    const [bio, setBio] = useState();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

    const handleUserDetailUpdation = async () => {
        let detailTobeUpdate;
        let action = '';
        setisLoading(true);
        const usernameFromLocalStorage = localStorage.getItem('loggedinUserName');
        if (userName) {
            detailTobeUpdate = userName;
            action = 'updateUserName'
        } else if (bio) {
            detailTobeUpdate = bio;
            action = 'updateBio';
        } else if (Email) {
            detailTobeUpdate = Email;
            action = 'updateEmail';
        } else if (Password) {
            detailTobeUpdate = Password;
            action = 'updatePassword';
        }

        const res = await fetch('/api/Updation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usernameFromLocalStorage, detailTobeUpdate, action })
        })
        const response = await res.json();
        setisLoading(false)
        if (response.status === 200) {
            if (detailTobeUpdate == userName) {
                localStorage.setItem('loggedinUserName', detailTobeUpdate)
                toast.success("Username Update Successfully")
            }
            else if (detailTobeUpdate == bio) {
                toast.success("Bio Update Successfully")
            }
            else if (detailTobeUpdate == Email) {
                toast.success("Email Update Successfully")
            }
            else if (detailTobeUpdate == Password) {
                toast.success("Password Update Successfully")
            }
            router.push('/Home');
            setUserName("")
            setBio("")
            setEmail("")
            setPassword("")
        }
        else {
            toast.error("Invalid Action")
        }
    }

    const handleDeleteAccountEvent = async () => {
        const confirmresponse = confirm("Are you sure want to Delete your Account Permanently ?")
        console.log(confirmresponse);
        setisLoading(true)
        if (confirmresponse) {
            const userName = usernameFromLocalStorage;
            const res = await fetch('/api/Updation', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName })
            })
            const response = await res.json();
            console.log(response.status)
            setisLoading(false)
            if (response.status === 200) {
                console.log("Account deleted")
                localStorage.removeItem('loggedinUserName')
                toast.success("Account Deleted... ")
                router.push('/Login')
            } else {
                console.log("Not deleted")
            }
        }
    }
    return (
        <>
            {isLoading ?
                <LoadingComponent />
                :
                <div class=" mx-auto">
                    <Toaster />
                    <div class="inputs w-full max-w-3xl p-6 mx-auto">
                        <h2 class="text-2xl text-gray-900 text-center font-bold">Account Setting</h2>
                        <div class="mt-6 border-t border-gray-400 pt-4">
                            <div class='flex flex-wrap -mx-3 mb-6'>
                                <div class='w-full md:w-full px-3 mb-2'>
                                    <label class='block uppercase tracking-wide text-black font-bold mb-2 text-center' for='grid-text-1'>Update Profile Image</label>
                                    <UploadImage />
                                </div>
                                <div class='w-full md:w-full px-3 mb-6 mt-3'>
                                    {/* <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Update Username</label> */}
                                    <input class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter Username here' value={userName} required onChange={(e) => setUserName(e.target.value)} />
                                    <button className='bg-blue-500 border-2 border-blue-500  py-1 px-3 w-2.5/12 m-auto flex mt-3 transition-all duration-500 rounded-md hover:bg-white justify-center' onClick={handleUserDetailUpdation}>Update Username</button>
                                </div>
                                <div class='w-full md:w-full px-3 mb-6'>
                                    {/* <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Update Bio</label> */}
                                    <input class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter Bio here' value={bio} required onChange={(e) => setBio(e.target.value)} />
                                    <button className='bg-blue-500 border-2 border-blue-500   py-1 px-3 w-2.5/12 m-auto flex my-3 transition-all duration-500 rounded-md hover:bg-white justify-center' onClick={handleUserDetailUpdation} >Update Bio</button>

                                </div>
                                <div class='w-full md:w-full px-3 mb-6'>
                                    {/* <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Update Email</label> */}
                                    <input class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='email' placeholder='Enter Email here' value={Email} required onChange={(e) => setEmail(e.target.value)} />
                                    <button className='bg-blue-500 border-2 border-blue-500  py-1 px-3 w-2.5/12 m-auto flex mt-3 transition-all duration-500 rounded-md hover:bg-white text-center' onClick={handleUserDetailUpdation}>Update Email</button>
                                </div>
                                <div class='w-full md:w-full px-3 mb-6'>
                                    {/* <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Change Password</label> */}
                                    <input class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='password' placeholder='Enter new Password here' value={Password} required onChange={(e) => setPassword(e.target.value)} />
                                    <button className='bg-blue-500 border-2 border-blue-500  py-1 px-3 w-2.5/12 m-auto flex my-3 transition-all duration-500 rounded-md hover:bg-white text-center' onClick={handleUserDetailUpdation}>Change Password</button>
                                </div>
                                <button className='bg-red-500 border-2 border-red-500  py-1 px-3 w-2.5/12 m-auto flex my-3 transition-all duration-500 rounded-md hover:bg-white text-center font-bold text-white hover:text-black' onClick={handleDeleteAccountEvent}>DELETE ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
