import React from 'react'
import BookingStrip from './BookingStrip';

const IconClose = () => <span className="icon icon-close">✖</span>;




const MoreModel = ({ setIsEdite ,moreData,setShowMorePopup}) => {
  return (
    <div className="modal-overlay">
    <div className="modals ">
      <div className="modal-header">
        <h3>Others Appointment</h3>
        <button onClick={()=>setShowMorePopup(false)} className="close-btn">
          <IconClose />
        </button>
      </div>
      <div>
{moreData.map((item,index)=>{
  
   return(index !== 0 &&<BookingStrip setIsEdite={setIsEdite} item={item} index={index}/> )

})
  }
      </div>
    </div>
  </div>
  )
}

export default MoreModel