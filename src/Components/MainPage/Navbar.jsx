import React, { useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {
    let {userToken,setUserToken,userId , setUserId,userData,setUserData} = useContext(UserContext);
    const navigate = useNavigate();

const logOut = ()=>{
        localStorage.removeItem('userToken');
        setUserToken(null);
        // setUserData(null);
        navigate('/login');
      }
    return (
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <a className="navbar-brand" href="#">
      <FontAwesomeIcon icon={faRobot} className='academyIcon pe-1' /> TMS
        {/* Company */}
        </a>
      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button> */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            {(userData || userToken) && userData.userType==0 && <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={`/dashboard`}>Dashboard</Link>
          </li>}
          {(userData || userToken) && userData.userType==1 && <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={`/classroom`}>Dashboard</Link>
          </li>}
          {(userData || userToken) && userData.userType==2 && <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={`/TMS`}>Dashboard</Link>
          </li>}
            
          {/* 
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> */}
        </ul>
        <form className="d-flex" role="search">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
          {!userData || !userToken ?  <Link className="btn btn-outline-light" to={`/login`}>Login</Link>:<button className='btn btn-outline-light' onClick={logOut} >
                    {/* <GoDotFill className='icon'/> <FontAwesomeIcon icon={faBarsProgress} />  */}
                    Logout
                </button>}
         
        </form>
      </div>
    </div>
  </nav>
  

    )
  }
  