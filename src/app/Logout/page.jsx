'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

export default function Logout() {

    const router = useRouter();
    const logoutuser = async () => {
        const res = await fetch('/api/Logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const response = await res.json();
        console.log(response)
        if (response.status === 200) {
            toast.success("Logout Successfully")
            router.push('/Login')
        } else {
            toast.error("Logout failed")
        }

    }
    useEffect(() => {
        const logoutConfirmationMsg = confirm("Are you sure want to logout?");
        if (logoutConfirmationMsg) {
            logoutuser();
        }else{
            router.back();
        }
    },)

    return (
        <div>
            <Toaster />
        </div>
    )
}