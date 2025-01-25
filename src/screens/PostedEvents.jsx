import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { GlobalContext } from '../contexts/AppContext'

import axios from 'axios';
import { postEvent, updateEvent } from '../utils/adminfunctions';
// ICONS
import { FaPen } from "react-icons/fa";
import PostedEventCard from '../components/profile/PostedEventCard';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import AddUpdateModal from '../components/AddUpdateModal';
import DeleteModal from '../components/DeleteModal';
const PostedEvents = ({openModal, setMessage, fetchEvents, yourEvents, setYourEvents, sectionClicked }) => {

    const {user, setUser} = useContext(GlobalContext)
    // essentials like isLoading, message
    const [ isLoading, setIsLoading] = useState(false)
  
  
    const location = useLocation();
 
  
    
   
    useEffect(() => {
      fetchEvents();
    }, [location.pathname]);
  

  
  
    
    return (
      <div className="min-h-screen">
        <div className="relative max-w-3xl mx-auto ">

          <div className="">
            {isLoading ? (
              <p><Loader loading={isLoading} /></p>
            ) : (
                <PostedEventCard yourEvents={yourEvents} openModal={openModal} sectionClicked={sectionClicked}/>

            )}
          </div>
        </div>


        {/* ADD MODAL */}
       
        
      </div>
  )
}

export default PostedEvents
