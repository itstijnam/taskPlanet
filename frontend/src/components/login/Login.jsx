import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuthAdmin } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const pageUrl = 'create/admin-account'

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    const updatedUsername = input.replace(/\s+/g, '_');
    const toSmallUpdatedUsername = updatedUsername.toLowerCase();
    setUsername(toSmallUpdatedUsername);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}admin/login`,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthAdmin(res.data.admin));
        console.log(res.data.admin)
        navigate('/admin');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <main className="mainGrnd">
        <div className="mainCard">
          <form onSubmit={handleFormSubmit}>
            <div>
              <h3>Admin Login</h3>
            </div>
            <div className="formDetail">
              <div>
                <span>Username: </span>
                <div>
                  <input
                    type="text"
                    name="username"
                    maxLength={30}
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange} // Handle space-to-underscore conversion
                    required
                  />
                </div>
              </div>
              <div>
                <span>Password:</span>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
            <button type="submit">Login</button>
            <Link to="/create/admin-account" className='createAdminNavigation'>Create Admin Account</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
