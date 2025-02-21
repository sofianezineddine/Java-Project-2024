import React, { useState, useEffect } from 'react';
import { createTask, getTask, updateTask } from '../services/TaskService';
import { getAllEmployees } from '../services/EmployeeService'; // Import employee service
import { useNavigate, useParams, Link } from 'react-router-dom';
import user_profile from '../assets/imgs/user.png';

const AddTaskComponent = () => {
    // Task state attributes
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('TODO');
    const [assignedEmployeeIds, setAssignedEmployeeIds] = useState([]);
    const [employees, setEmployees] = useState([]); // State to store the list of employees

    const navigator = useNavigate();
    const { id } = useParams(); // Get task id

    // Fetch task data if editing
    useEffect(() => {
        if (id) {
            getTask(id)
                .then((response) => {
                    const task = response.data;
                    setTitle(task.title);
                    setDescription(task.description);
                    setDueDate(task.dueDate);
                    setStatus(task.status);
                    setAssignedEmployeeIds(task.assignedEmployeeIds);
                })
                .catch((error) => {
                    console.error('Error fetching task:', error);
                });
        }

        // Fetch employees for the assigned employees dropdown
        getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });
    }, [id]);

    // Error state
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: '',
        assignedEmployeeIds: '',
    });

    // Validate the form
    const validateForm = () => {
        const fields = [
            { name: 'title', value: title, message: 'Title is required' },
            { name: 'description', value: description, message: 'Description is required' },
            { name: 'dueDate', value: dueDate, message: 'Due Date is required' },
            { name: 'status', value: status, message: 'Status is required' },
            { name: 'assignedEmployeeIds', value: assignedEmployeeIds, message: 'At least one employee must be assigned' },
        ];

        let valid = true;
        const errorsCopy = { ...errors };

        fields.forEach((field) => {
            if (!field.value || (field.name === 'assignedEmployeeIds' && field.value.length === 0)) {
                errorsCopy[field.name] = field.message;
                valid = false;
            } else {
                errorsCopy[field.name] = '';
            }
        });

        setErrors(errorsCopy);
        return valid;
    };

    // Handle form submission
    const saveOrUpdateTask = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const task = {
                title,
                description,
                dueDate,
                status,
                assignedEmployeeIds,
            };

            if (id) {
                updateTask(id, task)
                    .then((response) => {
                        console.log('Task updated:', response.data);
                        navigator('/tasks');
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            } else {
                createTask(task)
                    .then((response) => {
                        console.log('Task created:', response.data);
                        navigator('/tasks');
                    })
                    .catch((error) => {
                        console.error('Error creating task:', error);
                    });
            }
        }
    };

    // Set page title
    const pageTitle = id ? 'Update Task' : 'Add Task';

    // Sidebar visibility state
    const [sidebarVisible, setSidebarVisible] = useState(true);

    // Handle window resize for sidebar visibility
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {/* Sidebar */}
            <section id="sidebar">
                <Link to="/management" className="brand" style={{ textDecoration: 'none' }}>
                    <i className='bx bxs-dashboard'></i>
                    <span className="text">EMS</span>
                </Link>
                <ul className="side-menu top">
                  
                    <li>
                        <Link to="/employees">
                            <i className='bx bxs-group'></i>
                            <span className="text">Employees</span>
                        </Link>
                    </li>
                    <li className="active">
                        <Link to="/tasks">
                            <i className='bx bx-task'></i>
                            <span className="text">Tasks</span>
                        </Link>
                    </li>
                   
                </ul>
                <ul className="side-menu">
                   
                    <li>
                        <a href="#" className="logout">
                            <i className='bx bxs-log-out-circle'></i>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

            {/* Main Content */}
            <section id="content">
                <nav style={{ justifyContent: 'space-between' }}>
                    <i className="bx bx-menu" onClick={() => setSidebarVisible(!sidebarVisible)}></i>
                    <a href="#" className="profile">
                        <img src={user_profile} alt="User Profile" />
                    </a>
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1 style={{ marginLeft: '20px' }}>{pageTitle}</h1>
                        </div>
                    </div>

                    {/* Task Form */}
                    <form className="friends-page d-grid m-20 gap-20">
                        <div className="friend bg-white rad-6 p-20 p-relative">
                            {/* Title */}
                            <div className="form-group mb-2">
                                <label className="form-label">Title:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Task Title"
                                    name="title"
                                    value={title}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            {/* Description */}
                            <div className="form-group mb-2">
                                <label className="form-label">Description:</label>
                                <textarea
                                    placeholder="Enter Task Description"
                                    name="description"
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            {/* Due Date */}
                            <div className="form-group mb-2">
                                <label className="form-label">Due Date:</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={dueDate}
                                    className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
                            </div>

                            {/* Status */}
                            <div className="form-group mb-2">
                                <label className="form-label">Status:</label>
                                <select
                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                            </div>

                            {/* Assigned Employees */}
                            <div className="form-group mb-2">
                                <label className="form-label">Assigned Employees:</label>
                                <select
                                    multiple
                                    className={`form-control ${errors.assignedEmployeeIds ? 'is-invalid' : ''}`}
                                    name="assignedEmployeeIds"
                                    value={assignedEmployeeIds}
                                    onChange={(e) =>
                                        setAssignedEmployeeIds(Array.from(e.target.selectedOptions, (option) => option.value))
                                    }
                                >
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </select>
                                {errors.assignedEmployeeIds && (
                                    <div className="invalid-feedback">{errors.assignedEmployeeIds}</div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center" style={{ marginTop: '20px' }}>
                                <button className="btn btn-success" onClick={saveOrUpdateTask} style={{ backgroundColor: '#3C91E6' }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </section>
        </div>
    );
};

export default AddTaskComponent;