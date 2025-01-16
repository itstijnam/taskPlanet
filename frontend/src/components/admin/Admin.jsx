import React from 'react'
import LeftSideBar from '../leftSideBar/LeftSideBar'
import RightSideBar from '../rightSideBar/RightSideBar'

function Admin() {
  return (
    <div className='flex overflow-hidden'>
        <div>
            <LeftSideBar/>
        </div>
        <div  className=''>
            <RightSideBar/>
        </div>
    </div>
  )
}

export default Admin