import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './Navbar.css';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState('src/assets/user.png'); 
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  let {userToken,setUserToken} = useContext(UserContext);

  // const handleLogout = () => {
  //   axios.post('/api/logout')
  //     .then(() => {
  //       alert("Logged out successfully");
  //       window.location.href = '/login';
  //     })
  //     .catch(error => {
  //       console.error("Logout error", error);
  //     });
  // };
  const navigate = useNavigate()


const logOut = ()=>{
        localStorage.removeItem('userToken');
        setUserToken(null);
        // setUserData(null);
        navigate('/login');
      }


  // Fetch user photo from the API //i need to delete it if there is no profile pic for the trainer
  useEffect(() => {
    axios.get('/api/user-profile')
      .then(response => {
        const photoUrl = response.data.photoUrl;
        if (photoUrl) {
          setUserPhoto(photoUrl);
        }
      })
      .catch(error => {
        console.error("Error fetching user profile", error);
        setUserPhoto('src/assets/user.png');
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close the dropdown if clicked outside
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <header className="header">
      <div className="header__logo">CompanyName</div>
      <nav className="header__nav">
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={userPhoto} alt="User Profile" className="header__profile-pic" />
          <span className="header__caret"></span>
        </div>
      </nav>
      {dropdownVisible && (
        <div className="dropdown" ref={dropdownRef}>
          <ul>
            <li><button type="button" onClick={logOut}><a href="">Logout</a></button></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
