import { NextResponse } from "next/server";

export async function POST(request ){
    try {
        const response = NextResponse.json({
            message : "Successfully Logout",
            status : 200
            
        })
      
        response.cookies.delete('token')
        return response;
        
    } catch (error) {
        console.log("Error from logout route " , error)
        return NextResponse.error(error)
    }
}