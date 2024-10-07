import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TaskManagement.css';
import { UserContext } from '../../../../Context/UserContext';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // Used for course being edited
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newCourse, setNewCourse] = useState({ name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
    let { userToken } = useContext(UserContext);
    const [newUpdatedCourse, setNewUpdatedCourse] = useState({ id:'', name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
    
    const baseUrl = 'https://localhost:7107/api';
    
    // Fetch courses
    useEffect(() => {
        fetchCourses();
    }, []);
    
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Courses`);
            setCourses(response.data.data);
        } catch (error) {
            setErrorMessage('Failed to fetch courses');
            console.error('Error fetching courses:', error);
        }
    };
    }, [baseUrl,courses]);


    // Select a course for update
    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setNewCourse({
            name: course.name,
            description: course.description,
            resoursesUrl: course.resoursesUrl,
            trainingFieldId: course.trainingFieldId
        });
        setNewUpdatedCourse({
            id: course.id,
            name: course.name,
            description: course.description,
            resoursesUrl: course.resoursesUrl,
            trainingFieldId: course.trainingFieldId
        });
    };

    // Create new course or update existing course
    const handleSaveCourse = async () => {
        if (selectedCourse) {
            // Update course logic
            try {
                const response = await axios.put(
                    `${baseUrl}/Courses/update/${selectedCourse.id}`,
                    newUpdatedCourse,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                    }
                );
                if (response.data && response.data.data) {
                    setSuccessMessage('Course updated successfully');
                    fetchCourses();  // Refetch courses after update
                }
                setNewUpdatedCourse({ id: '', name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
                setSelectedCourse(null);
            } catch (error) {
                console.error('Error updating course:', error.response?.data);
                setErrorMessage('Failed to update course');
            }
        } else {
            // Create new course logic
            if (newCourse.name && newCourse.description && newCourse.resoursesUrl && newCourse.trainingFieldId) {
                try {
                    const response = await axios.post(`${baseUrl}/Courses/add`, newCourse,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${userToken}`,
                            },
                        });
                    if (response.data && response.data.data) {
                        setSuccessMessage('Course created successfully');
                        fetchCourses();  // Refetch courses after addition
                    }
                    setNewCourse({ name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
                } catch (error) {
                    setErrorMessage('Failed to create course');
                }
            } else {
                setErrorMessage('Please fill in all course fields');
            }
        }
    };

    // Delete a course
    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`${baseUrl}/Courses/delete/${courseId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            setSuccessMessage('Course deleted successfully');
            fetchCourses();  // Refetch courses after deletion
        } catch (error) {
            setErrorMessage('Failed to delete course');
        }
    };

    return (
        <div className="task-manager">
            <h2>Manage Courses </h2>
            {/* Error and success messages */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            {/* Create or Update Course */}
            <div className="form-container">
                <h3>{selectedCourse ? 'Update Course' : 'Create New Course'}</h3>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={selectedCourse ? newUpdatedCourse.name : newCourse.name}
                    onChange={(e) => selectedCourse
                        ? setNewUpdatedCourse({ ...newUpdatedCourse, name: e.target.value })
                        : setNewCourse({ ...newCourse, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Course Description"
                    value={selectedCourse ? newUpdatedCourse.description : newCourse.description}
                    onChange={(e) => selectedCourse
                        ? setNewUpdatedCourse({ ...newUpdatedCourse, description: e.target.value })
                        : setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Resources URL"
                    value={selectedCourse ? newUpdatedCourse.resoursesUrl : newCourse.resoursesUrl}
                    onChange={(e) => selectedCourse
                        ? setNewUpdatedCourse({ ...newUpdatedCourse, resoursesUrl: e.target.value })
                        : setNewCourse({ ...newCourse, resoursesUrl: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Training Field ID"
                    value={selectedCourse ? newUpdatedCourse.trainingFieldId : newCourse.trainingFieldId}
                    onChange={(e) => selectedCourse
                        ? setNewUpdatedCourse({ ...newUpdatedCourse, trainingFieldId: parseInt(e.target.value) })
                        : setNewCourse({ ...newCourse, trainingFieldId: parseInt(e.target.value) })}
                />
                <button onClick={handleSaveCourse}>
                    {selectedCourse ? 'Update Course' : 'Create Course'}
                </button>
            </div>

            {/* List of Courses */}
            <h3>Courses</h3>
            <ul>
                {courses && courses.map((course) => (
                    course && ( // Add this check to ensure course is not null or undefined
                        <li key={course.id} className='course'>
                            <h4>Course Name: {course.name}</h4>
                            <p>Course description: {course.description}</p>
                            <p>Resources Url: {course.resoursesUrl}</p>
                            <p>Training Field Id: {course.trainingFieldId}</p>
                            <div className="buttonContainer">
                                <button onClick={() => handleCourseSelect(course)}>Edit Course</button>
                                <button onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
