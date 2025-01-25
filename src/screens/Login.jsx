import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axiosInstance from '../utils/axiosInstance';
import { GlobalContext } from '../contexts/AppContext';

const Login = ({guestLogin, fetchUserDetails, setIsGuest}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {email, password};
    const {isLoading, user, setIsLoggedIn} = useContext(GlobalContext)

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        if(guestLogin) localStorage.clear();
        const login_data = {email, password};
        console.log(login_data);
        
        try {
            const response = await axiosInstance.post('/api/user/login', login_data);
            console.log(response);
            if (response.statusText === "OK") {
                console.log("INSIDEEEEEEEEEE");
                
                const { token } = await response.data;
                
                // Decode the token to get expiry time
                const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
                
                const expiryTime = exp * 1000; // Convert to milliseconds

            
                // Store token and expiry time in localStorage
                localStorage.setItem("authToken", token);
                localStorage.setItem("authTokenExpiry", expiryTime.toString());
                navigate('/')
                if(guestLogin) setIsGuest(false)

                if(guestLogin)fetchUserDetails();
                setIsLoggedIn(true);
              }
              
            } catch (error) {
                console.log(error);
                
            }
            
    }

    useEffect(() => {

    }, [])



  return (
    <div className={`${!guestLogin && 'h-screen'}`}>
        
    <div className='flex flex-col justify-center items-center'>
        {/* card */}
        <div>
            {
                !guestLogin &&  <h1 className='text-center text-4xl mb-5'>Events Place</h1>

            }
        </div>
        <div className={`relative shadow-inner shadow-xl bg-white ${guestLogin ? '' : 'w-4/6 md:w-2/6' }  py-[4rem] px-4 flex flex-col items-center justify-center rounded md:rounded-[4%]`}>  
            
            <h1 className='text-3xl p-4'>
               Login
            </h1>


            <form onSubmit={ handleLogin } className='w-full flex flex-col items-center'>
                <div className='px-1 w-9/12'>
                   
                    <div>
             
                        <input type="email" 
                                placeholder='Email' 
                                className='w-full p-3 bg-transparent focus:outline-none transition-all '
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                        />
                        <hr />

                    </div>
                    <div>
           
                        <input type="password" placeholder='Password' className='w-full p-3 bg-transparent focus:outline-none' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value) }/>
                        <hr />

                    </div>
                </div>
                <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-9/12'
                    onClick={(e) => handleLogin(e)}>
                    Login
                </button>
            </form>
           <Loader loading={isLoading}/>
           { !guestLogin &&
            <div>
                Do not have an account?  <Link to={'/signup'} className='text-blue-800 underline cursor-pointer'>Signup</Link> 
            </div>
            }


         
        </div>
    </div>
</div>
  )
}

export default Login