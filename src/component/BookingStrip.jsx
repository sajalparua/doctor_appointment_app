import React, { useContext } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { AppContext } from '../context/AppContext';



const BookingStrip = ({item , index}) => {
const {handelDelete , setShowMorePopup} = useContext(AppContext); 

const deleteHandler = (id) => {
  handelDelete(id) 
  setShowMorePopup(false)
}

  return (
    <div onClick={(e)=>e.stopPropagation()} key={index} className={`appointment ${item.category}`} >
    <section>{item.category}</section>
    <section>{item.startTime}</section>
      <div className='appointment-content'>
      <svg className='curve' xmlns="http://www.w3.org/2000/svg" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
<polygon points="50,0 0,53 100,53" fill="white" stroke="none" />

<path d="M50,0 L0,53 M50,0 L100,53" stroke="black" stroke-width="2" fill="none" />
    </svg>

      {/* <section className='curve'></section> */}
    <div className={`detailspopup`} >
      <div className="popheader">
        <section className='d-flex'>
           <section className='name_logo'><span></span></section>
        <section className='mx-2 text-left'> 
          <section className='fs-6'>{item.name}</section>
          <span>{item.doctor}</span></section> 
        </section>
      
          <div className="editesection d-flex ">
            <section className='icons_wrap'><MdEdit />
            </section>
            <section onClick={()=>deleteHandler(item.id)} className='icons_wrap'><MdDelete />
            </section>
            </div>  
      </div>
      <div className='d-flex justify-content-between fs-6 py-1'>
        <section className='d-flex align-items-center'>
        <LuAlarmClockCheck/>
        <span>{item.startTime}</span>
        </section>
        <section className='d-flex align-items-center'>
           <section className={`doti ${item.category}`}></section>
          <span>{item.category}</span>
        </section>
      </div>

    
   
    </div>
    </div>
</div>
  )
}

export default BookingStrip