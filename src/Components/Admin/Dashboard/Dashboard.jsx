import React, { useContext } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import '../Dashboard.css'
 import { GrCloudComputer } from "react-icons/gr";
 import { FaWpforms } from "react-icons/fa";
 import { GoDotFill } from "react-icons/go";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCaretDown, faChevronDown, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineForm } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';





function Dashboard({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();
    let {userToken,setUserToken} = useContext(UserContext);
    if (!userToken) {
        // If no userToken, redirect to login page or handle it accordingly
        navigate('/login');
        return null; // Prevent rendering of the component
    }
    const logOut = ()=>{
        localStorage.removeItem('userToken');
        setUserToken(null);
        // setUserData(null);
        navigate('/login');
      }
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <GrCloudComputer  className='icon_header'/> TMS
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item' >
                <a href="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
               

            </li>


            <li className='sidebar-list-item' >
            <BsFillGrid3X3GapFill className='icon'/> Tables 
            
            <div className="items pt-4 ps-3">
              <a href="/dashboard/trainers"  >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faPersonChalkboard} /> Trainers
                </a>
            </div>
            <div className="items pt-4 ps-3" >
              <a href="/dashboard/trainees" >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faUser} /> Trainees
                </a>
            </div>
            <div className="items pt-4 ps-3" >
              <a href="/dashboard/trainings" >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faBarsProgress} /> Trainings
                </a>
            </div>     
            </li>

            <li className='sidebar-list-item' >
            <AiOutlineForm className='icon'/> Forms 
            
            <div className="items pt-4 ps-3">
              <a href="/dashboard/addTrainer"  >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faPersonChalkboard} /> Trainers
                </a>
            </div>
            <div className="items pt-4 ps-3" >
              <a href="/dashboard/addTrainee" >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faUser} /> Trainees
                </a>
            </div>
            <div className="items pt-4 ps-3" >
              <a href="/dashboard/addTraining" >
                    <GoDotFill className='icon'/> <FontAwesomeIcon icon={faBarsProgress} /> Trainings
                </a>
            </div>  
              
            </li>
            <li className='sidebar-list-item' >
            <div className="items pt-4 ps-3" >
              <button className='bg-transparent border-0 logout' onClick={logOut} >
                    {/* <GoDotFill className='icon'/> <FontAwesomeIcon icon={faBarsProgress} />  */}
                    Logout
                </button>
            </div>    
            </li>
            
        </ul>
    </aside>
  )
}

export default Dashboard