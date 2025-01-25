import axiosInstance from "./axiosInstance";

export const fetchBookedEvents = async (setYourEvents) => {
    try {
      const response = await axiosInstance.post("/api/user/bookedEvents/true");
      console.log(response.data);
      setYourEvents(response.data.bookedEvents);
    } catch (error) {
      console.log(error);
    }
  };