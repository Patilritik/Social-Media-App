
import React, { useEffect } from 'react'

export default function LoadingComponent() {
    
    useEffect(()=>{
        import("@lottiefiles/lottie-player");
    })


    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='h-48 w-48 flex justify-center items-center'>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="/Animation - 1718634628645.json"
                    />
            </div>
        </div>

    )
}
