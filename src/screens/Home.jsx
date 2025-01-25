import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/AppContext";
import axiosInstance from "../utils/axiosInstance";
import BookModal from "../components/BookModal";
import Loader from "../components/Loader";

{/* BOOK MODAL */}
const Home = () => {
  // essentials - isLoading
  const { isLoading, setIsLoading, user, setUser } = useContext(GlobalContext);

  // list of events
  const [events, setEvents] = useState([]);

  //modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // selected
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEventIds, setBookedEventIds] = useState([]);

  // isGuest
  const [isGuest, setIsGuest] = useState(false)


  //functions
  const bookedEvents = async () => {
    try {
      const response = await axiosInstance.post("/api/user/bookedEvents/false");
      console.log(response.data);
      setBookedEventIds(response.data.bookedEventIds);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/api/event/");
      const eventsFetched = response.data.events;
      console.log("Events Fetched",eventsFetched);
      
      setEvents(eventsFetched);

      console.log("IN Fetch Events Role:", user.role);
      //Fetch bookedEvents
      console.log(user.role);
      
      if (user.role === "guest") {
      } else await bookedEvents();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const bookEvent = (event) => {
    if (user.role === "guest") setIsGuest(true);
    setSelectedEvent(event);
    setIsBookModalOpen(true);

  };
  // Fetch User Details
  const fetchUserDetails = async () => {
    console.log("IN fetchUserDetails");

    try {
      const res = await axiosInstance.get("/api/user/fetch_userdetails");
      console.log(res.data);
      setUser(res.data)
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect - fetchUserDetails
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // fetchEvents
  useEffect(() => {
    fetchEvents();
  }, [user.role]);
  console.log(events);
  


  return (
    <div className="p-7 min-h-screen">
      <h1 className="text-3xl mb-3">Welcome {user && user.email}</h1>
      <div>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          events &&
          events.map((event) => (
            <div
              key={event._id}
              className={`${
                bookedEventIds.includes(event._id)
                  ? "bg-blue-700/10 opacity-70"
                  : "bg-white"
              } shadow-lg rounded-lg p-6 mb-6`}
            >
              <div className="flex justify-between">
                <h2 className=" text-2xl font-bold text-gray-800 mb-2">
                  {event.name}
                </h2>
              </div>

              {event.image && (
              <img
                src={event.image}
                alt={event.name}
                className="w-fit h-60 object-contain rounded-lg mb-4"
              />
            )}
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

              <div className="text-end">
                <button
                  className={`bg-blue-800 text-white px-2 rounded ${
                    bookedEventIds.includes(event._id)
                      ? "cursor-not-allowed"
                      : false
                  }`}
                  disabled={bookedEventIds.includes(event._id) ? true : false}
                  onClick={() => bookEvent(event)}
                >
                  {bookedEventIds.includes(event._id) ? "Booked" : "Book"}
                </button>
              </div>
            </div>
          ))
        )}


        {/* BOOK MODAL */}
        {isBookModalOpen && (
          <BookModal
            isGuest={isGuest}
            setIsGuest={setIsGuest}
            fetchUserDetails={fetchUserDetails}
            event={selectedEvent}
            setIsBookModalOpen={setIsBookModalOpen}
            fetchEvents={fetchEvents}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
