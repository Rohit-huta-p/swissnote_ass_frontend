import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { GlobalContext } from '../contexts/AppContext'

import axios from 'axios';
import { deleteEvent, postEvent, updateEvent } from '../utils/adminfunctions';

const DeleteModal = ({setIsLoading, eventId, fetchEvents, closeModal, setMessage}) => {
  return (
    <div>
      <div className="flex items-center justify-center fixed inset-0 bg-black/20 ">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Delete Event</h2>
              <div className='flex justify-evenly'>
                <button className='bg-gray-500 px-4 py-2 text-white rounded'>Cancel</button>
                <button type='button' className='bg-red-700 px-4 py-2 text-white rounded' onClick={() =>  deleteEvent(setIsLoading, eventId, fetchEvents, closeModal,setMessage)}>Confirm</button>
              </div>
      
            </div>
          </div>
    </div>
  )
}

export default DeleteModal
