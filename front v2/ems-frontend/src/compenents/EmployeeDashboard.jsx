import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setAuthHeader, getAuthToken } from '../services/loginService';
import { listTasks, deleteTask, searchTasks } from '../services/TaskService';
import { getAllEmployees } from '../services/EmployeeService';
import user_profile from '../assets/imgs/user.png';
import { getTasksByEmployee, completeTask } from '../services/TaskService';
import { getCurrentEmployee, updateEmployeePhoto } from '../services/EmployeeService';

const EmployeeDashboard = () => {
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
                    <li className="active">
                        <Link to="/employee-dashboard">
                            <i className='bx bxs-dashboard'></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    
                    <li className=''>
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
                            <h1>My Personal Info</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="">Personal</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <Link className="active" to="/employee-dashboard">Home</Link>
                                </li>
                            </ul>
                        </div>
                       
                    </div>
               
                    {employeeInfo && (
                
            
                    <table className="table table-bordered table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{employeeInfo.firstName} {employeeInfo.lastName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{employeeInfo.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone</th>
                                <td>{employeeInfo.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{employeeInfo.address}</td>
                            </tr>
                            <tr>
                                <th scope="row">Job Title</th>
                                <td>{employeeInfo.jobTitle}</td>
                            </tr>
                            <tr>
                                <th scope="row">Department</th>
                                <td>{employeeInfo.department}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{employeeInfo.status}</td>
                            </tr>
                            <tr>
                                <th scope="row">Salary</th>
                                <td>{employeeInfo.salary}$</td>
                            </tr>
                            <tr>
                                <th scope="row">Hire Date</th>
                                <td>{new Date(employeeInfo.hireDate).toLocaleDateString('en-GB')}</td>
                            </tr>
                        </tbody>
                    </table>
                   )}
                </main>
            </section>
            <script src="./src/assets/js/script.js"></script>
        </div>
    );
};

export default EmployeeDashboard;