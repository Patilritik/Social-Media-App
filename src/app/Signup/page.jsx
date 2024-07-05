'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
const DynamicLottiePlayer = dynamic(() => import("@lottiefiles/lottie-player"), { ssr: false });

export default function Signup() {

    const [details, setDetails] = useState({
        userName: "",
        email: "",
        password: "",
        bio: "",
        // profilePicture : ""
    })

    // const handleFileChange =()=>{
    //     setDetails({...details , profilePicture :e.target.file})
    // }

    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(details);
        try {
            console.log("user information ", details)
            const res = await fetch("/api/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            });
            console.log("responsed data ", res);
            const response = await res.json();
            console.log(response)
            if (res.ok) {
                router.push("/Login")
                toast.success("Successfully Registered", {
                    duration: 5000
                })
            }
            else {
                toast.error("User Already exists")
            }


            // console.log("responsed data", response)
            // console.log(response)
            // if (response.error) {
            //     // toast.error("User Already exist");
            //     return;
            // }


        } catch (error) {
            console.log("Failed for signup");
            console.log("eroor", error);
            return;
        }
    }
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    })

    return (
        <>
            <Toaster />
            <div className="flex justify-around my-10 mx-20">
                <div className=" w-full">
                    {/* Replace the URL with your actual Lottie animation JSON file */}
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="/Animation - 1713510881142.json"

                    />
                </div>
                {/* form */}
                <div className=" w-full items-center ">
                    <form onSubmit={submitHandler} >
                        <h1 className="text-center text-4xl my-10">
                            SOCIAL MEDIA APP
                        </h1>




                        <input
                            type="text"
                            placeholder="Enter user name"
                            value={details.userName}
                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80"
                            onChange={(e) => setDetails({ ...details, userName: e.target.value })}
                        // onChange={(e)=>setDetails(details.userName = e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter email"
                            value={details.email}
                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80"
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        // onChange={(e)=>setDetails(details.userName = e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}

                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80" />

                        <input
                            type="text"
                            placeholder="Enter Bio"
                            value={details.bio}
                            onChange={(e) => setDetails({ ...details, bio: e.target.value })}

                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80" />

                        {/*  <input
                            type="file"
                            placeholder="Upload Profile Picture"
                            files={details.profilePicture}
                            onChange={(e)=>  setDetails({ ...details, profilePicture: e.target.files[0]})}
                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80" /> */}



                        <button className=" p-2 flex justify-center items-center  m-auto  rounded 
                         text-black  w-36 
                         bg-blue-400 
                           border-2 border-blue-400
                        hover:border-blue-400 
                        hover:bg-white 
                        transition-all duration-400"
                            type="submit"
                        >Signup </button>
                    </form>

                    <div className="flex justify-center my-3">
                        <p className="mx-2">Already have an account?</p>
                        <Link href={"/Login"} className="text-blue-500"> Login</Link>

                    </div>
                </div>
            </div>
        </>
    )
}