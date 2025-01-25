import React, { useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { GlobalContext } from "../contexts/AppContext";
import GuestLogin from "./GuestLogin";

const BookModal = ({isGuest,setIsGuest, fetchUserDetails, event,setIsBookModalOpen, fetchEvents}) => {
    const {user} = useContext(GlobalContext)
    const {isLoading, setIsLoading} = useContext(GlobalContext);
    const [persons, setPersons] = useState(1)

    
    const bookEvent = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post(`/api/event/book/${event._id}`, {persons})
            console.log(response.data);
            setIsLoading(false)
            setIsBookModalOpen(false)
            fetchEvents()
        } catch (error) {
            
        }
    }


    
    
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

          {isGuest ? (
            <GuestLogin fetchUserDetails={fetchUserDetails} setIsGuest={setIsGuest}/>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Confirm Booking
            </h2>
            <div className="space-y-4">
              <div className="text-gray-700">
                <p className="text-lg font-semibold">{event.name}</p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Time:</span> {event.time}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="persons" className="font-medium text-gray-600">
                  Number of Persons
                </label>
                <input
                  type="number"
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="persons"
                  value={persons}
                  onChange={(e) => setPersons(e.target.value)}
                  min="1"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setIsBookModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => bookEvent()}
                >
                  Confirm
                </button>
              </div>
            </div>
            </div>
          )}

      
      </div>
    </div>
  );
};

export default BookModal;
