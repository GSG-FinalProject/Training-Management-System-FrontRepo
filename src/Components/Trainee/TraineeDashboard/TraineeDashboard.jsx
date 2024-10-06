import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TraineeDashboard.css';

function TraineeDashboard() {
    const [course, setCourse] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [userName, setUserName] = useState('');
    const [completedFiles, setCompletedFiles] = useState([]);
    const [completedAssignments, setCompletedAssignments] = useState([]);
    const [trainingProgress, setTrainingProgress] = useState(0);
    // Fetch user name, course data, and assignments when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const userResponse = await axios.get('/api/user'); // Replace with the actual endpoint
                // setUserName(userResponse.data.name);
                const courseResponse = await axios.get('https://localhost:7107/api/Courses');
                setCourse(courseResponse.data.data);
                const assignmentsResponse = await axios.get('https://localhost:7107/api/Task');
                console.log(assignmentsResponse.data.data);
                setAssignments(assignmentsResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // useEffect(() => {
    //     if (assignments.length > 0) {
    //         const totalAssignments = assignments.length;
    //         const completedAssignmentsCount = assignments.filter(a => a.isCompleted).length;
    //         const progress = totalAssignments ? (completedAssignmentsCount / totalAssignments) * 100 : 0;
    //         setTrainingProgress(progress.toFixed(0)); // Set overall training progress
    //     }
    // }, [assignments]);

    const handleAssignmentClick = (assignment) => {
        setSelectedAssignment(assignment);
        setModalVisible(true); // Show modal when assignment clicked
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    // Submit the selected file for an assignment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus('Please select a file to submit.');
            return;
        }
        // Prepare FormData
        const formData = new FormData();
        formData.append('taskId', selectedAssignment.taskId);
        formData.append('filePath', file); 
        formData.append('traineeId', 'your-trainee-id');
    
        try {
            const response = await axios.post('https://localhost:7107/api/submission', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setUploadStatus('Assignment submitted successfully!');
                setModalVisible(false);
                setNotification('Assignment submitted successfully!');
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            } else {
                setUploadStatus('Error submitting assignment.');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
            setUploadStatus('Error submitting assignment.');
        }
    };
    // const markAsCompleted = async (assignmentId) => {
    //     try {
    //         await axios.post('/api/complete-assignment', {
    //             studentId: currentStudentId, // Assuming you have the current student's ID
    //             assignmentId: assignmentId,
    //         });
    //         // Update the UI by fetching the new assignments data
    //         const updatedAssignments = assignments.map(assignment =>
    //             assignment.id === assignmentId ? { ...assignment, isCompleted: true } : assignment
    //         );
    //         setAssignments(updatedAssignments);
    //         setCompletedAssignments(updatedAssignments.filter(a => a.isCompleted)); // Update completed assignments
    //     } catch (error) {
    //         console.error('Error marking assignment as complete:', error);
    //     }
    // };
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
            <div className="dashboard">
                <h1 className='heading'>Trainee Dashboard</h1>
                {/* Display user name
                {userName && <h2>Hi, {userName}!</h2>} */}
                {/* <div className="progress-tracker">
                    <div className="progress-bar">
                        <div className="progress-bar-filled" style={{ width: `${trainingProgress}%` }}></div>
                    </div>
                    <h3>{trainingProgress}%</h3>
                </div> */}
                {/* Notification for submission */}
                {notification && (
                    <div className="notification">
                        <p>{notification}</p>
                    </div>
                )}
                {/* Display loading */}
                {loading && <p>Loading course data and assignments...</p>}
                {!loading && (
                    <>
                        {/* Display course and its files/links */}
                        <div className="course-section">
                            {course && course.length > 0 ? (
                                <ul>
                                    {course.map((courseItem, index) => (
                                        <li key={index}>
                                            <h2>{courseItem.name}</h2>
                                            <p>{courseItem.description}</p>
                                            <a href={courseItem.resoursesUrl} download>
                                                {courseItem.resoursesUrl ? 'tap here to view the Resource' : 'No Resources Available'}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No courses available.</p>
                            )}
                        </div>
                        {/* Display assignments from different API */}
                        <div className="assignments-section">
                            <h2>Tasks</h2>
                            {assignments.length > 0 ? (
                                <ul>
                                    {assignments.map((assignment) => (
                                        <li key={assignment.id} className={`assignment`}>
                                            <a onClick={() => handleAssignmentClick(assignment)}>
                                                {assignment.title}
                                            </a>
                                            <p className="deadline">Deadline: {assignment.deadline}</p>
                                            <p>{assignment.description}</p>
                                            {/* Mark as Completed Button */}
                                            {/* {!assignment.isCompleted ? (
                                                <button onClick={() => markAsCompleted(assignment.id)}>
                                                    Mark as Complete
                                                </button>
                                            ) : (
                                                <span>✔ Completed</span>
                                            )} */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                    <p>No tasks available.</p>
                                </>
                            )}
                        </div>
                    </>
                )}
                {/* Modal for assignment submission */}
                {modalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{selectedAssignment.name}</h2>
                            <p>Deadline: {selectedAssignment.deadline}</p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="link">Submit a link for the assignment:</label>
                                <input
                                    type="url"
                                    id="link"
                                    value={file}
                                    onChange={(e) => setFile(e.target.value)}
                                    placeholder="https://"
                                    required
                                />
                                <button type="submit">Submit Assignment</button>
                            </form>
                            {/* Display upload status */}
                            {uploadStatus && <p>{uploadStatus}</p>}
                            {/* Close modal */}
                            <button onClick={() => setModalVisible(false)} className="modal-close">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}

export default TraineeDashboard;
