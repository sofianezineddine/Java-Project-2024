import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setAuthHeader, getAuthToken } from '../services/loginService';
import { listTasks, deleteTask, searchTasks } from '../services/TaskService';
import { getAllEmployees } from '../services/EmployeeService';
import user_profile from '../assets/imgs/user.png';
import { getTasksByEmployee, completeTask } from '../services/TaskService';
import { getCurrentEmployee, updateEmployeePhoto } from '../services/EmployeeService';

const MyTasksCompenent = () => {
    const [tasks, setTasks] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [photo, setPhoto] = useState(null); // To handle photo upload
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const token = getAuthToken(); // Retrieve the token
                if (!token) {
                    console.error('No token found');
                    setAuthHeader(null);
                    navigate('/login'); // Redirect to login if no token exists
                    return;
                }

                // Set the token in the headers
                setAuthHeader(token);

                // Fetch current employee data
                const employeeResponse = await getCurrentEmployee();
                const employeeData = employeeResponse.data;

                if (employeeData.id) {
                    setEmployeeInfo(employeeData);

                    // Fetch tasks assigned to the employee
                    const tasksResponse = await getTasksByEmployee(employeeData.id);
                    setTasks(tasksResponse.data);
                } else {
                    console.error('Employee ID is missing');
                }
            } catch (error) {
                console.error('Error fetching employee info:', error);

                // Handle unauthorized access
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Token expired or invalid');
                    setAuthHeader(null);
                    navigate('/login'); // Redirect to login
                }
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchEmployeeData();
    }, [navigate]);

    // Handle marking a task as completed
    const handleCompleteTask = (taskId) => {
        completeTask(taskId)
            .then((response) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, status: 'COMPLETED' } : task
                    )
                );
            })
            .catch((error) => {
                console.error('Error completing task:', error);
            });
    };

    // Handle photo upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const formData = new FormData();
            formData.append('photo', file);

            updateEmployeePhoto(employeeInfo.id, formData)
                .then((response) => {
                    setEmployeeInfo({ ...employeeInfo, photoUrl: response.data.photoUrl }); // Update photo URL
                })
                .catch((error) => {
                    console.error('Error uploading photo:', error);
                });
        }
    };

    // Handle logout
    const logout = (e) => {
        e.preventDefault();
        setAuthHeader(null);
        navigate('/login');
    };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
}
    return (
        <div className={darkMode ? 'dark' : ''}>
            <section id="sidebar">
                <Link to="/employee-dashboard" className="brand" style={{ textDecoration: 'none' }}>
                    <i className='bx bxs-dashboard'></i>
                    <span className="text">EMS</span>
                </Link>
                <ul className="side-menu top">
                    <li className="">
                        <Link to="/employee-dashboard">
                            <i className='bx bxs-dashboard'></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    
                    <li className='active'>
                        <Link to="/my-tasks">
                            <i className='bx bx-task'></i>
                            <span className="text">My Tasks</span>
                        </Link>
                    </li>
                    
                </ul>
                <ul className="side-menu">
                   
                    <li>
                        <a href="" className="logout" onClick={logout}>
                            <i className='bx bxs-log-out-circle'></i>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>
            <section id="content">
                <nav style={{ justifyContent: 'space-between' }}>
                    <i className='bx bx-menu'></i>
                    <a href="#" className="profile">
                        <img src={user_profile} alt="Profile" />
                    </a>
                </nav>
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>My Tasks</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="">tasks</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <Link className="active" to="/employee-dashboard">Home</Link>
                                </li>
                            </ul>
                        </div>
                       
                    </div>
               {/* Assigned Tasks */}
               <div className="">
    {tasks.length > 0 ? (
        <div className="row">
            {tasks.map((task) => (
                <div key={task.id} className="col-md-6 col-lg-4 mb-4">
                    <div
                        className="card h-100"
                        style={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <div className="card-body p-4">
                            <h5
                                className="card-title"
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#40ff00',
                                }}
                            >
                                {task.title}
                            </h5>
                            <p
                                className="card-text"
                                style={{
                                    fontSize: '0.9rem',
                                    color: '#555',
                                    marginBottom: '1rem',
                                }}
                            >
                                {task.description}
                            </p>
                            <p
                                className="card-text"
                                style={{ fontSize: '0.9rem', color: '#555' }}
                            >
                                <strong>Due Date:</strong>{' '}
                                {new Date(task.dueDate).toLocaleDateString('en-GB')}
                            </p>
                            <p
                                className="card-text"
                                style={{
                                    fontSize: '0.9rem',
                                    color: task.status === 'COMPLETED' ? 'green' : '#555',
                                }}
                            >
                                <strong>Status:</strong> {task.status}
                            </p>
                            {task.status !== 'COMPLETED' && (
                                <button
                                    className="btn btn-primary w-100"
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem',
                                        fontSize: '0.9rem',
                                    }}
                                    onClick={() => handleCompleteTask(task.id)}
                                >
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p
            style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                color: '#777',
                marginTop: '2rem',
            }}
        >
            No tasks assigned to you.
        </p>
    )}
</div>       
                </main>
            </section>
            <script src="./src/assets/js/script.js"></script>
        </div>
    );
};

export default MyTasksCompenent;