import React, { useRef } from 'react'
import { FaPhotoFilm } from "react-icons/fa6";

export default function FileInput({ onChange }) {
    const fileInputRef = useRef(null);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        onChange(file)
    }

    const handleClickEvent = (e) => {
        console.log("Button clicked");
        fileInputRef.current.click();
    }
    const handlebtnClick =()=>{
        console.log("btn click" , PostRef.current.value);
    }
    return (
        <>
            <input type="file" name="" id=""
                className='hidden'
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />

            <div className='flex justify-around'>

                <div className='flex items-center space-x-2 px-2 rounded-lg cursor-pointer hover:border-2 hover:border-blue-400 border-2 border-white transition-all duration-500 hover:bg-blue-400 hover:text-white' onClick={handleClickEvent}>
                    <FaPhotoFilm className='w-12 h-12' />
                    <h1 className='font-bold'>Photos</h1>
                </div>

                {/* <button className='bg-blue-500 p-2 text-white rounded-xl hover:bg-blue-700 transition-all duration-400 ' onClick={handlebtnClick}>
                    Upload Now
                </button> */}
            </div>
        </>
    )
}
