import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Component Imports
import AddUpdateModal from "../components/AddUpdateModal";
// CONTEXT
import { GlobalContext } from "../contexts/AppContext";

import axiosInstance from "../utils/axiosInstance";

import { deleteEvent } from "../utils/adminfunctions";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import PostedEvents from "./PostedEvents";
import { fetchBookedEvents } from "../utils/userfunctions";
import BookedEvents from "../components/profile/BookedEvents";

// fetchUserDetails
// fetchEvents

//yourEvents, setYourEvents
// Modals
// selectedEventId

const Profile = () => {
  const [sectionClicked, setSectionClicked] = useState('posted_events');
  let isPostedEventClicked;
  let isBookedEventsClicked;
  if(sectionClicked === 'posted_events') {isPostedEventClicked = true} else isPostedEventClicked=false;
  if(sectionClicked === 'booked_events') {isBookedEventsClicked = true} else isBookedEventsClicked=false;
 
  const {user, setUser} = useContext(GlobalContext)

  // essentials like isLoading, message
  const [ isLoading, setIsLoading] = useState(false)
  const[ message, setMessage ] = useState('d')

  // List of Events state
  const [yourEvents, setYourEvents] = useState([]);
  // is<>ModalOpen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const [selectedEventId, setSelectedEventId] = useState(null);
  const location = useLocation();
 
    // Open Close Modal
    const openModal = (type, eventId) => {
      if (type === "update") {
        setSelectedEventId(eventId);
        setIsEditModalOpen(true);
      } else if (type === "delete") {
        setSelectedEventId(eventId);
        setIsDeleteModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    };
  
    const closeModal = (type) => {
      if (type === "update") {
        setIsEditModalOpen(false);
      } else if (type === "delete") {
        setIsDeleteModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
    };


  // Fetch User Details
  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/api/user/fetch_userdetails");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

   // FETCH EVENTS
   const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/api/event/user_events");
      console.log(response.data);
      setYourEvents(response.data.events);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    // to get the name / email
    fetchUserDetails();

  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage('');
    }, 5000);
    return () => clearInterval(interval);
  }, [message])


  const handleBookedEvents = async () => {
    console.log("in handleBookedEvents");
    
    setSectionClicked('booked_events');
    await fetchBookedEvents(setYourEvents);
    console.log(yourEvents);
    
  }

  




  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome{" "}
          {user && (
            <span className="text-blue-600 animate-fade">{user.email}</span>
          )}
        </h1>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => openModal()}
        >
          Add Event
        
        </button>
        <div className="flex items-center justify-between">
          <div>
            {/* POSTED EVENTS */}
            <button  className={`text-xl font-semibold ${isPostedEventClicked ? 'bg-amber-200 px-2 rounded' : "text-gray-700"} mt-8 mb-3` }
                  onClick={() => setSectionClicked('posted_events')}>
              Posted Events{" "}
            </button>

            {/* Booked Events */}
            <button  className={`ml-3 text-xl font-semibold ${ isBookedEventsClicked ? 'bg-amber-200 px-2 rounded' : "text-gray-700" } mt-8 mb-3`}
                  onClick={() => handleBookedEvents()}>
              Booked Events{" "}
            
            </button>
          </div>
         {
          message && (
            <div className="relative bg-gray-200 w-fit rounded px-2">
            <div className="absolute top-[-10%] left-[-10%] bg-green-800 w-[8px] h-[8px] rounded-full animate-pulse"></div>
            <span
              className={`relative text-green-700 font-thin text-lg animate-pulse ${
                message && message.includes("Deleted") && "text-red-700"
              }`}
            >
              {message}
            </span>
          </div>

          )
         }
       
        </div>
        {
          sectionClicked === 'posted_events' && (
            <PostedEvents yourEvents={yourEvents} openModal={openModal} isLoading={isLoading} fetchEvents={fetchEvents} sectionClicked={sectionClicked}/>
          )
        }
        {
            sectionClicked === 'booked_events' && (
              <BookedEvents yourEvents={yourEvents} openModal={openModal} sectionClicked={sectionClicked}/>
            )
        }
      </div>
  

        {/* ADD MODAL */}
        {isModalOpen && (
            <AddUpdateModal
              userId={user && user.userId}
              setYourEvents={setYourEvents}
              closeModal={closeModal}
              fetchEvents={fetchEvents}
              setMessage={setMessage}
            />
          )}

        {/* EDIT  MODAL */}
        {isEditModalOpen && (
          <AddUpdateModal
            type={"update"}
            eventId={selectedEventId}
            closeModal={closeModal}
            yourEvents={yourEvents}
            setYourEvents={setYourEvents}
            userId={user && user.userId}
            fetchEvents={fetchEvents}
            setMessage={setMessage}
          />
        )}

        {/* DELETE */}
        {isDeleteModalOpen && (
          <DeleteModal
            type={"delete"}
            eventId={selectedEventId}
            setIsLoading={setIsLoading}
            fetchEvents={fetchEvents}
            closeModal={closeModal}
            setMessage={setMessage}
          />
        )}


    </div>
  );
};

export default Profile;
