import { useNavigate, Link } from 'react-router-dom';
import { setAuthHeader } from '../services/loginService';
import { useEffect, useState } from 'react';
import { listTasks, deleteTask, searchTasks } from '../services/TaskService';
import { getAllEmployees } from '../services/EmployeeService';
import user_profile from '../assets/imgs/user.png';

const TaskComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        assignedEmployee: '',
    });

    function getAllTasksList() {
        listTasks().then((response) => {
            setTasks(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark', !darkMode);
    };

    function getAllEmployeesList() {
        getAllEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getAllTasksList();
        getAllEmployeesList();
    }, []);

    function addNewTask() {
        navigate('/add-task');
    }

    function updateTask(id) {
        navigate(`/update-task/${id}`);
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            getAllTasksList();
        } else {
            searchTasks(searchTerm).then((response) => {
                setTasks(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function removeTask(taskId) {
        deleteTask(taskId).then((response) => {
            getAllTasksList();
        }).catch(error => {
            console.log(error);
        });
    }

    const navigator = useNavigate();
    function logout(e) {
        e.preventDefault();
        setAuthHeader(null);
        navigator('/login');
    }

    function handleFilterChange(e) {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }

    function applyFilters(e) {
        e.preventDefault();
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== "")
        );
        listTasks(activeFilters).then((response) => {
            setTasks(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const getEmployeeNames = (assignedEmployeeIds) => {
        return assignedEmployeeIds
            .map((id) => {
                const employee = employees.find((emp) => emp.id === id);
                return employee ? `${employee.firstName} ${employee.lastName}` : null;
            })
            .filter((name) => name !== null)
            .join(', ');
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
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
                    <li className='active'>
                        <Link to="/tasks">
                            <i className='bx bx-task'></i>
                            <span className="text">Tasks</span>
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
                <nav>
                    <i className='bx bx-menu'></i>
                    <form action="#" method="get" onSubmit={handleSearch}>
                        <div className="form-input">
                            <input
                                className="form-input"
                                type="search"
                                style={{ width: '200px' }}
                                placeholder="Search By Title"
                                name='title'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                <i className='bx bx-search'></i>
                            </button>
                        </div>
                    </form>
                    {
                        /**
                        <input
                        type="checkbox"
                        id="switch-mode"
                        hidden
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                    <label htmlFor="switch-mode" className="switch-mode"></label>
                         */
                    }

                    <a href="#" className="profile">
                        <img src={user_profile} alt="Profile" />
                    </a>
                </nav>
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Tasks</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="">Tasks</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <Link className="active" to="/management">Home</Link>
                                </li>
                            </ul>
                        </div>
                        <Link to="/add-task" className="btn-download" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className='bx bxs-add-to-queue'></i>
                            <span className="text">Add Task</span>
                        </Link>
                    </div>
                    <div className="container my-4">
                        <form onSubmit={applyFilters}>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="status" className="form-label">Status:</label>
                                    <select
                                        className="form-select"
                                        id="status"
                                        name="status"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">All</option>
                                        <option value="TODO">To Do</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="assignedEmployee" className="form-label">Assigned Employee:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="assignedEmployee"
                                        name="assignedEmployee"
                                        value={filters.assignedEmployee}
                                        onChange={(e) => setFilters({ ...filters, assignedEmployee: e.target.value })}
                                        placeholder="Employee Name"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#3C91E6' }}>
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="friends-page d-grid m-20 gap-20">
                        {tasks.map((task) => (
                            <div className={`friend ${darkMode ? 'dark' : ''} bg-white rad-6 p-20 p-relative`} key={task.id}>
                                <div className="txt-c">
                                    <h4 className="m-0">{task.title}</h4>
                                    <p className="c-grey fs-13 mt-5 mb-0">{task.description}</p>
                                </div>
                                <div className="icons fs-14 p-relative">
                                    <div className="mb-10">
                                        <i className="fa-solid fa-calendar-days fa-fw"></i>
                                        <span>Due Date: {new Date(task.dueDate).toLocaleDateString('en-GB')}</span>
                                    </div>
                                    <div className="mb-10">
                                        <i className="fa-solid fa-tasks fa-fw"></i>
                                        <span>Status: {task.status}</span>
                                    </div>
                                    <div className="mb-10">
                                        <i className="fa-solid fa-users fa-fw"></i>
                                        <span>
                                            Assigned Employees: {getEmployeeNames(task.assignedEmployeeIds) || 'None'}
                                        </span>
                                    </div>
                                </div>
                                <div className="info between-flex fs-13">
                                    <div>
                                        <button className='btn btn-info' onClick={() => updateTask(task.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </section>
            <script src="./src/assets/js/script.js"></script>
        </div>
    );
};

export default TaskComponent;