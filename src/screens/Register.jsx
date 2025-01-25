import { useContext, useEffect, useState } from 'react';


import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

import axiosInstance from '../utils/axiosInstance';
import { GlobalContext } from '../contexts/AppContext';



const Register = ({guestSignUp}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const {isLoading, user, setIsLoggedIn} = useContext(GlobalContext)
    const data = {email, password};
    const [errors, setErrors] = useState([]);


    const handleRegister = async (e, guest) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/user/register', {...data, guest})
            if(!guest){
                navigate('/login')
            }else{
                if (response.statusText === "OK") {
                    const { token } = await response.data;
                    
                    // Decode the token to get expiry time
                    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
                    
                    const expiryTime = exp * 1000; // Convert to milliseconds
                    console.log(expiryTime);
                
                    // Store token and expiry time in localStorage
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("authTokenExpiry", expiryTime.toString());
                
                    // Update app state (optional)
                    setIsLoggedIn(true);
                  }
            }
        } catch (error) {
            
        }
       
    }

  
    useEffect(() => {

      
    }, [])

 

    
   

    return (
        <div className={`${!guestSignUp && 'h-screen'}`}>
            <div className='flex justify-center items-center h-full'>
                {/* card */}
                <div className={`relative shadow-inner shadow-xl bg-white ${!guestSignUp && ' w-5/6 md:w-2/6 ' }py-[2rem] flex flex-col items-center justify-center rounded md:rounded-[4%]`}>  

                    <h1 className='text-3xl p-4'>
                       Register
                    </h1>

                    {/* form */}
                    <form onSubmit={ (e) => handleRegister(e) } className='w-full flex flex-col items-center'>
                        <div className='p-4 w-10/12'>
                        {/* name */}
                            <div>
                                <input type="text" placeholder='name' className='w-full p-2 bg-transparent focus:outline-none'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} 
                                />
                                <hr />

                            </div>
                            <div>
                                <input type="email" placeholder='Email' className='w-full p-2 bg-transparent focus:outline-none'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                />
                                <hr />

                            </div>
                            <div>
                                <input type="password" placeholder='New Password' className=' w-full p-2 bg-transparent focus:outline-none' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value) }/>
                                <hr />

                            </div>
                        </div>
                        <div>
                            {/* Register  */}
                            <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-full'>
                                Register
                            </button>
                            
                          

                            {/* Login as guest  */}

                          {
                            !guestSignUp && (
                                <div>
                                <p className='text-center'>OR</p>
                                <button className='outline px-2 py-1 rounded' onClick={(e) => handleRegister(e, true)}>
                                    Login as Guest
                                </button>
                                </div>
                            )
                          }
                        </div>
                    </form>

                    <Loader loading={isLoading}/>
                  

                    {
                        !guestSignUp && 
                        <div className='flex justify-start w-9/12 mt-2'>
                            <p className=''>
                             Already registered?
                            <button className='text-blue-900'>
                                <Link to='/login'>Login Here</Link>    
                            </button>
                            </p>
                            
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register