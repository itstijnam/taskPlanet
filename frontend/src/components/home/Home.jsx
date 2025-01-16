import React, { useState } from 'react';
import '../../style/Home.css';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSubmit } from '../../store/userPostSlice';
import useGetAllUserPost from '../hook/useGetAllUserPost';

function Home() {
  
  useGetAllUserPost();
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch()
  const { userSubmit } = useSelector((store) => store.post)
  console.log('home: ', userSubmit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('social_media_handle', socialHandle);
    
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUserSubmit([res.data.userSubmit, ...userSubmit]));
        setName('')
        setSocialHandle('')
        setSocialHandle([])
      }
    } catch (error) {
      toast.error(error?.res?.data?.message)
    }
  };

  return (
    <>
      <Header />
      <main className="mainGrnd">
        <div className="mainCard">
          <form onSubmit={handleFormSubmit}>
            <div>
              <h3>User Submission Form</h3>
            </div>
            <div className='formDetail'>
              <div className=''>
                <span>Name: </span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <span>Social Media Handle: </span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your social media handle"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <span>Upload Images:</span>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Home;
