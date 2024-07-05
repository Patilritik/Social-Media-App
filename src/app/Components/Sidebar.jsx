import React from 'react'
import ProfileCard from './ProfileCard'
export default function Sidebar(props) {
  console.log("Side bar props" , props);
  return (
    <div className='w-4/12  h-full mt-12'>
        <ProfileCard userName={props.username} bio ={props.Bio} email={props.Email} profileImage ={props.profileimage} Friend={props.friends}/>
    </div>
  )
}
