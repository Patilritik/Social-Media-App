# Social Media App
- This is a social media application built using Next.js and MongoDB. The app allows users to create accounts, post updates, makes friend other users.

## Features
 - User authentication (sign up, login, logout)
 - Create, edit, delete posts
 - Friend/unfriend users
 - User profile with posts and activity

## Tech Stack
 - Frontend: Next.js, React
 - Backend: Next.js 
 - Database: MongoDB
 - Authentication: JWT (JSON Web Tokens) 

## Installation
 1.  Clone the repository:
    
   `git clone https://github.com/your-username/social-media-app.git`
 
   `cd social-media-app`
 
 2. Install dependencies:
   
   `npm install`

 3. Set up MongoDB:

   - Ensure you have MongoDB installed and running.
 
 4. Create a new MongoDB database for the app.

 5. Set up environment variables:

  - Create a .env.local file in the root directory.
  - Add the following environment variables:
   
   `MONGODB_URI = your-mongodb-connection-string`
   `JWT_SECRET = your-jwt-secret`
   
 - Environment Variables
   MONGODB_URI: The connection string for your MongoDB database.
   JWT_SECRET: A secret key for JWT authentication.

## Usage

1. Start the development server: 
 `npm run dev`

2. Open http://localhost:3000 in your browser to view the app.


## Detailed Features 
1. User Authentication
- Sign Up: Users can create an account using username, Bio , email and password.
- Log In : Users can log in to their account using their credentials.
- Log Out: Users can log out of their account.

2. Posts
- Create Post: Users can create new posts with text content and Image content.
- Edit Post: Users can edit their own posts.
- Delete Post: Users can delete their own posts.

3. User Interaction
- Freind/Unfriend Users: Users can make friend or can unfriend other users.
- User can see thier friends profile only if not friend then profile will not be seen.

4. User Profile
- View Profile: Users can view their own profile and the profiles of their friends.
- Profile Details: Profile page shows user's posts, friends, and his all posts..

## TODO

 1. On deleting the post from UserProfile Page it shoule also delete the file from the public folder where it is stored.   ✅

 2. On logout and delete Post there should be some warning(Pop up Alert) initially ("Are you want to logout ? / Are you want delete Post?).
    Useful package  ✔️
    ["https://www.telerik.com/kendo-react-ui/components/dialogs/dialog/title/"]

 3. Chatting System should also be there

 4. Restriction to Avoid any type of file uploading except jpeg,png,jpg`

 5. Avoid Text-Feeds content to upload in public folder directly upload it in Database and fetch from there ✅

 6. On page loading all the content should be blurred and a loading animation should be seen on page