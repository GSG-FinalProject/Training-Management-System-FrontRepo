import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TraineeDashboard.css';
import { UserContext } from '../../../Context/UserContext';

function TraineeDashboard() {
    const [course, setCourse] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(0);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]); // State for feedbacks

    let { userToken, userId,userData } = useContext(UserContext);

    // Fetch courses, assignments, and feedback data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseResponse = await axios.get('https://localhost:7107/api/Courses');
                setCourse(courseResponse.data.data);

                const assignmentsResponse = await axios.get('https://localhost:7107/api/Task');
                setAssignments(assignmentsResponse.data.data);

                // Fetch feedbacks
                const feedbacksResponse = await axios.get('https://localhost:7107/api/Feedback');
                setFeedbacks(feedbacksResponse.data.data); // Save feedback data to state

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAssignmentClick = (assignment) => {
        setSelectedAssignment(assignment);
        setModalVisible(true);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus('Please select a file to submit.');
            return;
        }

        // Prepare FormData for submission
        const formData = new FormData();
        formData.append('taskId', selectedAssignment.id);
        formData.append('filePath', file);
        formData.append('traineeId', userId);

        try {
            const response = await axios.post('https://localhost:7107/api/submission', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });


            if (response.status === 201) {
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

    return (
        <>
            <div className="floating-circles">
                {/* Floating circles animation */}
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
            <div className="traineeDashboard">
                <h1 className='heading'>Trainee Dashboard</h1>
                <h2>Hi {userData.firstName} !👋</h2>
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
                            <h2>Courses</h2>
                            {course && course.length > 0 ? (
                                <ul>
                                    {course.map((courseItem, index) => (
                                        <li key={index} className='course'>
                                            <h2>Course Name: {courseItem.name}</h2>
                                            <p>Course description: {courseItem.description}</p>
                                            <a href={courseItem.resoursesUrl} target='_blank'>
                                                {courseItem.resoursesUrl ? 'Tap here to view the Resource' : 'No Resources Available'}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No courses available.</p>
                            )}
                        </div>
                        {/* Display assignments */}
                        <div className="assignments-section">
                            <h2>Tasks</h2>
                            {assignments.length > 0 ? (
                                <ul>
                                    {assignments.map((assignment) => (
                                        <li key={assignment.id} className="task">
                                            <a onClick={() => handleAssignmentClick(assignment)}>
                                                {assignment.title}
                                            </a>
                                            <p className="deadline">Deadline: {assignment.deadline}</p>
                                            <p>{assignment.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tasks available.</p>
                            )}
                        </div>
                        {/* Feedback Section */}
                        <div className="feedback-section">
                            <h2>All Feedbacks</h2>
                            {feedbacks.length > 0 ? (
                                feedbacks.map(feedback => (
                                    <div key={feedback.id} className="feedback-item">
                                        <p><strong>Comment:</strong> {feedback.comment}</p>
                                        <p><strong>Rating:</strong> {feedback.rating} /10</p>
                                        <p><strong>Given At:</strong> {new Date(feedback.givenAt).toLocaleString()}</p>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p>No feedback available.</p>
                            )}
                        </div>
                    </>
                )}
                {/* Modal for assignment submission */}
                {modalVisible && selectedAssignment && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{selectedAssignment.title || 'No name available'}</h2>
                            <p>Deadline: {selectedAssignment.deadline || 'No deadline set'}</p>
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
