import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Login.css'

function CreateAdminAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    const updatedUsername = input.replace(/\s+/g, '_');
    const toSmallUpdatedUsername = updatedUsername.toLowerCase();
    setUsername(toSmallUpdatedUsername);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/admin/register`,
        { username, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
        console.log(error)
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
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
              </div>
              <div>
                <span>Email: </span>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
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
            <button type="submit" className='createAdminNavigation'>Create Admin Account</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateAdminAccount;
