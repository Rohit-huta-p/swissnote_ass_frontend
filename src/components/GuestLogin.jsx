import React, { useState } from 'react'
import Login from '../screens/Login'
import Register from '../screens/Register'

const GuestLogin = ({fetchUserDetails, setIsGuest}) => {
    const [isSignUp, setIsSignUp] = useState(false)
  return (
    // <div className="flex items-center justify-center fixed inset-0 bg-black/10 backdrop-blur-sm z-50">
    // <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {!isSignUp && 'Please Login to book'}
      </h2>
      {
        isSignUp ? (
            <Register guestSignUp={true}/>
        ) : ( <Login guestLogin={true} fetchUserDetails={fetchUserDetails} setIsGuest={setIsGuest}/>)

      }
        {!isSignUp ? <p>Don't have an account? <span onClick={() => setIsSignUp(true)}>Signup</span> </p> 
            : <p className='text-center'>Have an account? <span className='text-blue-700 underline' onClick={() => setIsSignUp(false)}>Login</span> </p> 
        }

    </div>
//     </div>
//   </div>
  )
}

export default GuestLogin
