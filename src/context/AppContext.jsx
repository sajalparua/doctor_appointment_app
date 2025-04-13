import { createContext, useState } from "react";



export const AppContext = createContext();


const  AppContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [bookingAppointment, setBookingAppointment] = useState([]);
     const [showMorePopUp, setShowMorePopup] = useState(false); 
    

    const handelDelete = (id) => {
        const updatedBookingAppointment = bookingAppointment.filter((item) => item.id !== id);
        setBookingAppointment(updatedBookingAppointment);
    }

    return (
        <AppContext.Provider value={{isDarkMode , showMorePopUp , setShowMorePopup ,setIsDarkMode ,handelDelete, bookingAppointment , setBookingAppointment}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;