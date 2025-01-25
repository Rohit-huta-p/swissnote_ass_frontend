import React from 'react'
import {BarLoader} from 'react-spinners'
const Loader = ({loading}) => {
  return (
    <> 
        {loading && (
        <div className={`flex flex-col items-center`}>
          <p className='text-[#544bbf]'>Loading...</p>
          <BarLoader size={40} color="#544bbf"/>
          {/* <p>Loading...</p> */}
        </div>
    )} 
    </>
  )
}

export default Loader