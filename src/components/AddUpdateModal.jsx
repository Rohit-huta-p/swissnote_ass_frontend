import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { GlobalContext } from '../contexts/AppContext'

import axios from 'axios';
import { postEvent, updateEvent } from '../utils/adminfunctions';

const AddUpdateModal = ({type,eventId, closeModal, setYourEvents, fetchEvents, setMessage}) => {

    const {isLoading, setIsLoading} = useContext(GlobalContext)

    const [setsuccess, setSuccess] = useState(false)
    const [eventForm, seteventForm] = useState({
      name: '',
      description: '',
      date: '',
      time: '',
      image: null, // Add the image field
  });

    const handleChange = (e) => {
        seteventForm((prev) =>({...prev, [e.target.name]: e.target.value}))
    }
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      seteventForm((prev) => ({ ...prev, image: file }));
  };
  console.log(eventForm);
  
    
    const fetchCurrenteventForm = async () => {
      try {
        console.log("INSIDE current event");
        const response = await axiosInstance.post(`/api/event/${eventId}`)
        console.log(response.data.eventDetails);
        
        const {name, description, date, time, image} = response.data.eventDetails;
        
        seteventForm({name, description, date, time})
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(() => {
      if(type === 'update'){
        fetchCurrenteventForm()
      }
    }, [type, eventId])


  return (
    <div>
      <div className="flex items-center justify-center fixed inset-0 bg-black/20 z-50 ">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Event</h2>
              <form>
                {/* Name */}
                <input
                  type="text"
                  placeholder="Event Name"
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                  name='name'
                  value={eventForm.name}
                  onChange={(e) => handleChange(e)}
                />

                <textarea
                  placeholder="Event Description"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  name='description'
                  value={eventForm.description}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <div>
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                    type="date"
                    id='eventDate'
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    name='date'
                    value={eventForm.date == null ? '' : eventForm.date }
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className=''>
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                    id='eventTime'
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    name='time'
                    value={eventForm.time}
                    onChange={(e) => handleChange(e)}
                    />
                </div>


              {/* Image Input */}
              <div>
                  <label htmlFor="eventImage">Event Image</label>
                  <input
                      id="eventImage"
                      type="file"
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                      name="image"
                      onChange={handleImageChange}
                  />
              </div>


          {/* POST EVENT BUTTON */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className={`bg-gray-300 text-gray-800 px-4 py-2 rounded w-full ${!isLoading && 'hover:w-[300%] disabled'} `}
                    onClick={() => closeModal(`${type === 'update'? 'update': ''}`)}

                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full  hover:w-[300%] ${isLoading && 'w-[600%] animate-pulse'}`}
                    onClick={ () => {
                      if(type === 'update'){
                        updateEvent(eventId, eventForm, closeModal, fetchEvents)
                      }else{
                        postEvent(setIsLoading, eventForm, setSuccess, setMessage, setYourEvents, closeModal) 
                      }
                    }}
                  >
                   
                    {isLoading ? 
                      `${type === 'update' ? 'Updating...' : 'Saving...'}` : 
                      `${type === 'update' ? 'Update' : 'Save'}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default AddUpdateModal
