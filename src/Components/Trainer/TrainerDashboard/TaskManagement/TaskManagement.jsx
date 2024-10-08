import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TaskManagement.css';
import { UserContext } from '../../../../Context/UserContext';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]); // State to hold courses
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '', courseId: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let { userToken } = useContext(UserContext);

    const baseUrl = 'https://localhost:7107/api';

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Task`);
                setTasks(response.data.data);
            } catch (error) {
                setErrorMessage('Failed to fetch tasks');
                console.error('Error fetching tasks:', error);
            }
        };
    
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Courses`);
                setCourses(response.data.data); // Store fetched courses
            } catch (error) {
                setErrorMessage('Failed to fetch courses');
                console.error('Error fetching courses:', error);
            }
        };
    
        fetchTasks();
        fetchCourses(); // Fetch courses on component mount
    }, [baseUrl]); // Only use baseUrl as a dependency

    // Select a task for update
    const handleTaskSelect = (task) => {
        setSelectedTask(task);
        setNewTask({
            title: task.title || '',
            description: task.description || '',
            deadline: task.deadline || '',
            courseId: task.courseId || '',
        });
    };

    // Create or update task
    const handleSaveTask = async () => {
        if (selectedTask) {
            // Update existing task
            try {
                const response = await axios.put(`${baseUrl}/Task/${selectedTask.id}`, newTask, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                // Update the local state directly
                setTasks((prevTasks) => prevTasks.map(task => task.id === selectedTask.id ? response.data.data : task));
                setNewTask({ title: '', description: '', deadline: '', courseId: '' });
                setSuccessMessage('Task updated successfully');
            } catch (error) {
                console.error('Error updating Task:', error.response?.data);
                setErrorMessage('Failed to update Task');
            }
        } else {
            // Create new task
            if (newTask.title && newTask.description && newTask.deadline) {
                try {
                    const response = await axios.post(`${baseUrl}/Task`, newTask, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                    });
    
                    // Add the new task to the task list
                    setTasks((prevTasks) => [...prevTasks, response.data.data]);
    
                    setNewTask({ title: '', description: '', deadline: '', courseId: '' });
                    setSuccessMessage('Task created successfully');
                } catch (error) {
                    console.error('Error creating task:', error.response?.data);
                    setErrorMessage('Failed to create task');
                }
            } else {
                setErrorMessage('Please fill in all task fields');
            }
        }
    };

    // Delete a task
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${baseUrl}/Task/${taskId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            // Remove the deleted task from the task list
            setTasks(tasks.filter(task => task.id !== taskId));
            setSuccessMessage('Task deleted successfully');
        } catch (error) {
            setErrorMessage('Failed to delete task');
        }
    };

    return (
        <div className="task-manager">
            <h2>Manage Tasks</h2>
            {/* Error and success messages */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {/* Create or Update Task */}
            <div className="form-container">
                <h3>{selectedTask ? 'Update Task' : 'Create New Task'}</h3>
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Task deadline"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
                <select
                    value={newTask.courseId}
                    onChange={(e) => setNewTask({ ...newTask, courseId: parseInt(e.target.value) })}
                >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
                <button onClick={handleSaveTask}>
                    {selectedTask ? 'Update Task' : 'Create Task'}
                </button>
            </div>
            {/* List of Tasks */}
            <h3>Tasks</h3>
            <ul>
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        task && (
                            <li key={task.id}>
                                <h4>Task title: {task.title}</h4>
                                <p>Task description: {task.description}</p>
                                <p>Task deadline: {task.deadline}</p>
                                <p>Course Id: {task.courseId}</p>
                                <div className="buttonContainer">
                                    <button onClick={() => handleTaskSelect(task)}>Edit Task</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
                                </div>
                            </li>
                        )
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </ul>
        </div>
    );
};

export default TaskManagement;
