import React from 'react';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PostedEventCard = ({ yourEvents, openModal, sectionClicked }) => {
  console.log(yourEvents);

  return (
    <div>
      {yourEvents && yourEvents.length > 0 ? (
        yourEvents.map((event) => (
          <div
            key={event._id}
            className="bg-sky-200 shadow-lg rounded-lg p-6 mb-6"
          >
            {/* Event Header */}
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {event.name}
              </h2>
              {sectionClicked === "posted_events" && (
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
              )}
            </div>

            {/* Event Image */}
            {console.log(event.image)}
            {event.image && (
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}

            {/* Event Details */}
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
        ))
      ) : (
        <p className="text-center">
          No {sectionClicked === "booked_events" ? "Booked" : "Posted"} Events
        </p>
      )}
    </div>
  );
};

export default PostedEventCard;
