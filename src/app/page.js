'use client'
// import "@lottiefiles/lottie-player";
import Link from "next/link";
import { useState } from "react";
import Signup from "./Signup/page";
import Login from "./Login/page";

export default function Home() {
  // const [details, setDetails] = useState({
  //   userName: "",
  //   password: ""

  // })

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   setDetails(details.userName,details.password)
  //   console.log(details);
  // }
  return (
    <>
       <Login />
    </>
  )
}