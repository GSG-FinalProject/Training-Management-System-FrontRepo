import React, { useState } from 'react';
import TaskManagement from './TaskManagement/TaskManagement';
import Feedback from './Feedback/Feedback';
import Profile from './Profile/Profile';
import './TrainerDashboard.css'
import CourseManagement from './CourseManagement/CourseManagement';

const TrainerDashboard = () => {
    const [activeTab, setActiveTab] = useState('course');

    return (
        <>
            <div className="floating-circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className='trainer-dashboard'>
                <h1>Trainer Dashboard</h1>
                <div className='buttonsContainer'>
                    <button className='button' onClick={() => setActiveTab('course')}>Manage Course</button>
                    <button className='button' onClick={() => setActiveTab('tasks')}>Manage Tasks</button>
                    <button className='button' onClick={() => setActiveTab('feedback')}>Feedback</button>
                    {/* <button className='button' onClick={() => setActiveTab('profile')}>Profile</button> */}
                </div>
                {activeTab === 'course' && <CourseManagement />}
                {activeTab === 'tasks' && <TaskManagement />}
                {activeTab === 'feedback' && <Feedback />}
                {/* {activeTab === 'profile' && <Profile />} */}
            </div>
        </>
    );
};

export default TrainerDashboard;
