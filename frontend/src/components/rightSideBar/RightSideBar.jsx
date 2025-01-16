import React from 'react'
import '../../style/RightSideBar.css'
import LOGO from '../../assets/taskPlanet.png'
import useGetAllUserPost from '../hook/useGetAllUserPost'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function RightSideBar() {
  useGetAllUserPost();
  const navigate = useNavigate();
  const { userSubmit } = useSelector((store) => store.post);
  return (
    <div className='rightSide h-screen w-screen'>
      {
        userSubmit?.map((singleUser) => {
          return (
            <div className='rightSideCard' key={singleUser._id}>
              <div className='flex gap-2 ml-6 mt-3'>
                <span className='font-bold font-mono'>{singleUser?.name}</span>
                <p className='usernameBadge cursor-pointer hover:text-yellow-600'>@{singleUser?.social_media_handle}</p>
              </div>
              <div className='imgBox mt-4 border-t-2'>
                {
                  singleUser?.images?.map((singleImage, index) => {
                    return (
                      <a href={singleImage} target="_blank" rel="noopener noreferrer">
                        <img
                          src={singleImage}
                          alt="Uploaded"
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </a>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RightSideBar
