import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/AppContext'
const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(GlobalContext)
  const location = useLocation()
const navigate = useNavigate();
console.log(location.pathname);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

  return (
    <div className='bg-blue-800 text-white p-3 flex justify-between'>
      <h1>Event Managment System</h1>
      <div>
        {
          isLoggedIn&& <Link to='/profile' className='bg-white px-3 text-black rounded mr-3 hover:bg-blue-100/80 '>Profile</Link>
        }
        {
          isLoggedIn ? (
            <button className='bg-white px-3 text-black rounded' onClick={() => {isLoggedIn ? logout() : null} }>{isLoggedIn ? 'Logout' : 'Singup'}</button>
          ) : (
            location.pathname === '/signup' ? 
            <Link to={'/login'}>Login</Link>
              : <Link to={'/signup'}>Signup</Link>

          )
        }
      </div>
    </div>
  )
}

export default Navbar
