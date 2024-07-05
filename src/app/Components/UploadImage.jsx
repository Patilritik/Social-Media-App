'use client'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingComponent from './LoadingComponent'
// import "@lottiefiles/lottie-player";

export default function UploadImage() {
    const [file, setFile] = useState(null)
    const [imageURL, setimageURL] = useState(null)
    const [isLoading, setisLoading] = useState(false);


    const router = useRouter()

    const handleonChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const tempURL = URL.createObjectURL(selectedFile);
        console.log("tempURL", tempURL);
        setimageURL(tempURL)
    }

    useEffect(()=>{
        import("@lottiefiles/lottie-player")
    })


    const handleSubmit = async () => {
        try {
            if (!file) {
                toast.error("Please Select Profile Image")
                return;
            }

            const userName = localStorage.getItem('loggedinUserName')
            console.log("userName", userName);

            const formData = new FormData();
            formData.append('file', file);

            formData.append('userName', userName);
            setisLoading(true)
            const res = await fetch('/api/UploadImage', {
                method: "POST",
                // if use headers than in multipart it needs boundry 
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },

                body: formData
            })
            const response = await res;
            if (response.ok) {
                toast.success("Profile Image update Successfully")
                router.push('/Home')
            }
            setisLoading(false)
            console.log("response in upload image page ", response);
        } catch (error) {
            console.log("Error in upload image page ", error);
        }
    }

    return (
        <>
            {isLoading ?
                <LoadingComponent />
                :
                <div className='border border-gray-200 w-full rounded-xl'>
                    < Toaster />
                    <div class="flex items-center space-x-6 justify-center">
                        <div class="shrink-0">
                            {imageURL ?
                                <img class="h-32 w-32 object-cover rounded-full border border-black" src={imageURL ? imageURL : ""} alt=''/>
                                :
                                <div className='w-full'>
                                    <lottie-player
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="/Animation - 1718717997597.json"
                                    />
                                </div>
                            }
                        </div>
                        <label class="block">

                            <input type="file" accept="image/*"
                                onChange={handleonChange} class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-blue-500
                      hover:file:bg-violet-100
                        "/
                            >
                        </label>
                    </div>
                    {imageURL ?
                         <button className='bg-blue-500 border-2 border-blue-500   py-1 w-3/12 m-auto flex justify-center my-6 transition-all duration-500 rounded-md hover:bg-white ' onClick={handleSubmit}>Click to upload</button>
                        : ""
                    }
                </div >
            }
        </>

    )
}
