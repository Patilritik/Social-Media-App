import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Post(props) {

    const TimeofUpload = (time) => {
        const date = new Date(time);
        const now = new Date();
        const second = Math.floor((now - date) / 1000);
        if (second < 60) {
            return `${second} second ${second !== 1 ? '' : ""}ago`
        }

        const minutes = Math.floor(second / 60);
        if (minutes < 60) {
            return `${minutes} minutes ${minutes !== 1 ? '' : ""}ago`
        }

        const hour = Math.floor(minutes / 60);
        if (hour < 24) {
            return `${hour} hour ${hour !== 1 ? '' : ""}ago`
        }
        const day = Math.floor(hour / 24);
        return `${day} days ${day !== 1 ? '' : ""}ago`

    }

    return (
        <div className='border my-6 p-5 rounded-md '>
            <div className='flex justify-between'>

                <div className='flex'>
                    {props.profile ?
                        <img src={props ? `/profileImages/${props.profile}` : ""} alt="" className='h-16 w-16 rounded-full' />
                        :
                        <img src='/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg' alt="" className='h-16 w-16 rounded-full' />
                    }
                    <div className='mx-6 m-auto space-y-1'>
                        <Link href={`/Home/${props.name}`}><h1 className='hover:text-blue-500 font-bold transition-all duration-500'>{props ? props.name : ""}</h1></Link>
                        <p className='text-xs text-gray-500'>{props ? props.Bio : ""}</p>
                    </div>
                </div>

                <p className='text-xs text-gray-500 my-auto'>{props ? TimeofUpload(props.timeofupload) : ""}</p>
            </div>
            {/* for handling text-feeds type Posts */}
            {props && props.postType === "Text-Feeds" ? <h1 className='my-6 text-justify'>{props.content}</h1> : ""}

            {/* for handling Images type Posts */}
            {props && props.postType === "Images" ? <img src={`/AllPosts/${props.name}/ImagesPosts/${props.content}`}alt='' className='rounded-xl my-6 w-auto h-auto mx-auto' /> : ""}

        </div>
    )
}
