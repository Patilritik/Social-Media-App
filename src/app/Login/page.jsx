'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
// import dynamic from 'next/dynamic';
// const LottiePlayer = dynamic(() => import('@lottiefiles/lottie-player'), { ssr: false });
// const LottiePlayer = dynamic(() => import('@lottiefiles/lottie-player').then(mod => mod.default), { ssr: false });
// Dynamically import lottie-player with ssr: false

export default function Login() {
    const [details, setDetails] = useState({
        userName: "",
        password: ""
    })
    const router = useRouter();
    const onLogin = async (e) => {
        e.preventDefault();
        console.log(details);
        try {
            console.log("user information ", details)
            const res = await fetch("/api/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            });
            console.log("responsed data ", res);
            const response = await res.json();
            console.log(response);
            if (res.ok) {
                const userNameforLocalStorage = response.username.userName;
                localStorage.setItem('loggedinUserName', userNameforLocalStorage);
                // router.push(`/Home/${response.username.userName}`)
                router.push(`/Home`)
                console.log("Welcome back again ", response.username.email);
                toast.success("Successfully Login")
            }
            if (response.error) {
                toast.error("Incorrect Username or Password");
                return;
            }
        } catch (error) {
            console.log("Failed in Login Page", error);
            toast.error("Incorrect Username or Password");
            return;
        }
    }
    useEffect(()=>{
        import("@lottiefiles/lottie-player");
    })
    return (
        <>
            <Toaster />
            <div className="flex justify-around my-10 mx-20 ">
                <div className=" w-full">
                    {/* Replace the URL with your actual Lottie animation JSON file */}
                    {<lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="/Animation - 1713510881142.json"
                    />}
                </div>
                {/* form */}
                <div className=" w-full items-center ">
                    <form onSubmit={onLogin} >
                        <h1 className="text-center text-4xl my-10">
                            SOCIAL MEDIA APP(Login)
                        </h1>
                        <input
                            type="text"
                            placeholder="Enter user name"
                            value={details.userName}
                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80 "
                            onChange={(e) => setDetails({ ...details, userName: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            className="border rounded my-10 p-2 items-center focus:outline-none block m-auto w-80" />
                        <button className=" p-2 flex justify-center items-center  m-auto  rounded 
                         text-black  w-36 
                         bg-blue-400 
                            border-2 border-blue-400
                        hover:border-blue-400 
                        hover:bg-white 
                        transition-all duration-400"
                            type="submit"
                        >Login </button>
                    </form>

                    <div className="flex justify-center my-3">
                        <p className="mx-2">New User?</p>
                        <Link href={"/Signup"} className="text-blue-500"> Signup</Link>
                    </div>
                </div>
            </div>
           
        </>
    )
}
