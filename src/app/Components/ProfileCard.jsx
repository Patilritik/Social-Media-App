import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileCard(props) {
    console.log("Profile card ", props);
    let names = props.userName.charAt(0).toUpperCase(+ props.userName.slice(1));

    let name = props.userName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");


    return (
        <div className=''>
            <div class="mx-12 h-full justify-center items-center">

                <div class="max-w-xs">
                    <div class="bg-white border rounded-lg py-3">
                        <div class="photo-wrapper p-2">
                            <Link href={'/Home/Settings'}>
                                {
                                    props && props.profileImage
                                        ?
                                        <img className="w-32 h-32 rounded-full mx-auto hover:opacity-50 cursor-pointer transition-all duration-400" title='Change Profile Image'
                                            src={`/profileImages/${props.profileImage}`} alt="No Profile Image " />
                                        :
                                        <img width={32} className="w-32 h-32 rounded-full mx-auto hover:opacity-50 cursor-pointer" title='Change Profile Image'
                                            src='/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg' alt="No Profile Image " />
                                }
                            </Link>
                        </div>
                        <div class="p-2">
                            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{name}</h3>
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                <p>{props.bio}</p>
                            </div>
                            <table class="text-xs my-3 text-justify mx-auto">
                                <tbody><tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold "><Link href={"/Home/FriendsList"}>Friends</Link> </td>
                                    <td class="px-2 py-2"><Link href={"/Home/FriendsList"}>{props.Friend}</Link></td>
                                </tr>

                                    {props.email ?
                                        <tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td class="px-2 py-2">{props.email}</td>
                                        </tr> : ""}
                                </tbody></table>

                            <div class="text-center my-3">
                                <Link href='/Home/UserProfile' class="text-sm rounded-md hover:bg-white hover:border-2 hover:border-blue-400 font-medium  p-2 text-black bg-blue-400 transition-all duration-400">View Profile</Link>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
