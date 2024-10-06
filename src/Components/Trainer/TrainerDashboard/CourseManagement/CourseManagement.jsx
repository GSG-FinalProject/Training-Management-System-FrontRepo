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
    let {userToken,setUserToken} = useContext(UserContext);

    const baseUrl = 'https://localhost:7107/api';
    // Fetch courses 
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Courses`);
                setCourses(response.data.data);
            } catch (error) {
                setErrorMessage('Failed to fetch courses');
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [baseUrl]);


    // Select a course for update
    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setNewCourse({
            name: course.name,
            description: course.description,
            resoursesUrl: course.resoursesUrl || '',
            trainingFieldId: course.trainingFieldId || 1
        });
    };

    // Create new course or update existing course
    const handleSaveCourse = async () => {
        if (selectedCourse) {
            try {
                const response = await axios.put(`${baseUrl}/Courses/update/${selectedCourse.id}`,
                    newCourse,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                    });
                console.log(response.data);
                setCourses(courses.map(course => course.id === selectedCourse.id ? response.data.data : course));
                setNewCourse({ name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
                setSelectedCourse(null);
                setSuccessMessage('Course updated successfully');
            } catch (error) {
                console.error('Error updating course:', error.response?.data);
                setErrorMessage('Failed to update course');
            }
        } else {
            if (newCourse.name && newCourse.description && newCourse.resoursesUrl) {
                try {
                    const response = await axios.post(`${baseUrl}/Courses/add`, newCourse);
                    setCourses([...courses, response.data.data]);
                    setNewCourse({ name: '', description: '', resoursesUrl: '', trainingFieldId: '' });
                    setSuccessMessage('Course created successfully');
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
            await axios.delete(`${baseUrl}/Courses/delete/${courseId}`);
            setCourses(courses.filter(course => course.id !== courseId));
            setSuccessMessage('Course deleted successfully');
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
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Resources URL"
                    value={newCourse.resoursesUrl}
                    onChange={(e) => setNewCourse({ ...newCourse, resoursesUrl: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Training Field ID"
                    value={newCourse.trainingFieldId}
                    onChange={(e) => setNewCourse({ ...newCourse, trainingFieldId: parseInt(e.target.value) })}
                />
                <button onClick={handleSaveCourse}>
                    {selectedCourse ? 'Update Course' : 'Create Course'}
                </button>
            </div>
            {/* List of Courses */}
            <h3>Courses</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h4>Course Name: {course.name}</h4>
                        <p>Course description:{course.description}</p>
                        <p> Resourses Url:{course.resoursesUrl}</p>
                        <p>Training Field Id:{course.trainingFieldId}</p>
                        <div className="buttonContainer">
                            <button onClick={() => handleCourseSelect(course)}>Edit Course</button>
                            <button onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
