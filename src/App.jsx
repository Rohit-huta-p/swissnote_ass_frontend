import React, { useContext, useEffect, useState } from 'react'
import Login from './screens/Login'
import { GlobalContext, GlobalContextProvider } from './contexts/AppContext'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './screens/Register'
import { checkAuthStatus } from './utils/checkAuthStatus'
import Home from './screens/Home'
import Navbar from './components/Navbar'
import Profile from './screens/Profile'
import PostedEvents from './screens/PostedEvents'
const App = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAuthStatus = async () => {
      await checkAuthStatus( isLoggedIn, setIsLoggedIn);
      setIsLoading(false); // Set loading to false once done
    };

    fetchAuthStatus();

  }, [])
  
  if (isLoading) {
    // Display a loading indicator while authentication status is being checked
    return <div>Loading...</div>;
  }

  console.log(isLoggedIn);
  

  return (
    <div className='bg-slate-300'>
        <Navbar isLoggedIn={isLoggedIn} setUser={setUser}/>

          {
            isLoggedIn &&
            isLoggedIn ? (
              <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/postedevents' element={<PostedEvents />}/>

              <Route path="*" element={<Navigate to="/" />} />


            </Routes>
            )
            :
          (   <Routes>
            <Route path='/signup' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>)
          }



    </div>
  )
}

export default App
