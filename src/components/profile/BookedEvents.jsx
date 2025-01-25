import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchBookedEvents } from '../../utils/userfunctions';
import PostedEventCard from './PostedEventCard';


const BookedEvents = ({yourEvents, openModal, sectionClicked}) => {
  console.log("hello");
  
  return (
    <div>
       <PostedEventCard yourEvents={yourEvents} openModal={openModal} sectionClicked={sectionClicked} />


      {/* {
        bookedEventsArray.length > 0 ?
          
        bookedEventsArray.map((event) => (
          <div
          key={event._id}
          className=" bg-sky-200 shadow-lg rounded-lg p-6 mb-6"
        >
         
          <div className="flex justify-between">
            <h2 className=" text-2xl font-bold text-gray-800 mb-2">
              {event.name}
            </h2>
            <div>
              <button
                className="hover:text-blue-700 mr-3"
                onClick={() => openModal("update", event._id)}
              >
                <FaPen />
              </button>
              <button
                className="hover:text-red-700"
                onClick={() => openModal("delete", event._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {event.date
                ? new Date(event.date).toLocaleDateString()
                : "Invalid Date"}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {event.time}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              <span className="font-semibold">Total Bookings:</span>{" "}
              {event.bookings?.length || 0}
            </p>
          </div>
   </div>
        )) //map
        : <p>No booked Events Yet</p>
      }
     */}
     
    </div>
  )
}

export default BookedEvents
