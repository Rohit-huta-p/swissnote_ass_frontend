
import axiosInstance  from "./axiosInstance";

export const postEvent = async (setIsLoading, eventDetails, setSuccess,setMessage, setYourEvents, closeModal) => {
    
    try {
        const uploadData = new FormData();
        uploadData.append("name", eventDetails.name);
        uploadData.append("description", eventDetails.description);
        uploadData.append("date", eventDetails.date);
        uploadData.append("time", eventDetails.time);

        if (eventDetails.image) {
            uploadData.append("image", eventDetails.image);
          }
        setIsLoading(true);
        const res = await axiosInstance.put(`/api/event/add`, uploadData,  {
            headers: { "Content-Type": "multipart/form-data" },
          })
        setSuccess(true)
        console.log("EVENT ADDED", res.data);
        
        setYourEvents((prevEvents) => [ res.data.eventPosted, ...prevEvents]);
        setMessage(res.data.message);
        setIsLoading(false);
        closeModal();

      } catch (error) {
          console.log(error);
          setIsLoading(false) 
          
      }
}


export const updateEvent = async (eventId, eventDetails, closeModal, fetchEvents) => {
    try {
      const response = await axiosInstance.patch(`/api/event/edit/${eventId}`, eventDetails)
      closeModal('update')
      fetchEvents();
      
    } catch (error) {
      
    }
}

export const deleteEvent = async (setIsLoading, eventId, fetchEvents, closeModal, setMessage) => {
    try {
        console.log("IN DELETE FUNC");
        
        setIsLoading(true)
        const response = await axiosInstance.delete(`/api/event/delete/${eventId}`)
        console.log("IN DELETE", response);
        setIsLoading(false)
        closeModal('delete')
        fetchEvents(response.data.message);

    } catch (error) {
        console.log(error);
    }
}
