
import { useNavigate, Link } from 'react-router-dom';
import { setAuthHeader } from '../services/loginService';
import { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee, searchEmployees } from '../services/EmployeeService'
import avatar from '../assets/imgs/avatar.png'; // Import the avatar image

import user_profile from '../assets/imgs/user.png';

const EmployeesCompenent = () => {


    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        department: '',
        role: '',
        status: '',
        gender: '',
        contratType: '',
    });

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getAllEmployees();
    }, [])

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/update-employee/${id}`);
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            getAllEmployees();
        } else {
            searchEmployees(searchTerm).then((response) => {
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function removeEmployee(employeeId) {
        deleteEmployee(employeeId).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.log(error);
        })
    }

    const navigator = useNavigate();
    function logout(e) {
        e.preventDefault()
        setAuthHeader(null)
        navigator('/login')
    }

    function handleFilterChange(e) {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }


    function applyFilters(e) {
        e.preventDefault();

        // Create a new object excluding the empty filters
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== "")
        );

        listEmployees(activeFilters).then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }
    useEffect(() => {
        // Wait for DOM to be fully loaded
        const initializeDashboard = () => {
            try {
                // Side menu
                const sidebar = document.getElementById('sidebar');
                const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
                if (allSideMenu.length) {
                    allSideMenu.forEach(item => {
                        const li = item.parentElement;
                        item.addEventListener('click', function () {
                            allSideMenu.forEach(i => {
                                i.parentElement.classList.remove('active');
                            })
                            li.classList.add('active');
                        })
                    });
                }

                // Menu bar
                const menuBar = document.querySelector('#content nav .bx.bx-menu');
                if (menuBar && sidebar) {
                    menuBar.addEventListener('click', () => {
                        sidebar.classList.toggle('hide');
                    });
                }

                // Search functionality
                const searchButton = document.querySelector('#content nav form .form-input button');
                const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
                const searchForm = document.querySelector('#content nav form');

                if (searchButton && searchButtonIcon && searchForm) {
                    searchButton.addEventListener('click', function (e) {
                        if (window.innerWidth < 576) {
                            e.preventDefault();
                            searchForm.classList.toggle('show');
                            if (searchForm.classList.contains('show')) {
                                searchButtonIcon.classList.replace('bx-search', 'bx-x');
                            } else {
                                searchButtonIcon.classList.replace('bx-x', 'bx-search');
                            }
                        }
                    });
                }

                // Initial sidebar state
                if (sidebar && searchButtonIcon && searchForm) {
                    if (window.innerWidth < 768) {
                        sidebar.classList.add('hide');
                    } else if (window.innerWidth > 576) {
                        searchButtonIcon.classList.replace('bx-x', 'bx-search');
                        searchForm.classList.remove('show');
                    }
                }

                // Resize handler
                const handleResize = () => {
                    if (searchButtonIcon && searchForm && window.innerWidth > 576) {
                        searchButtonIcon.classList.replace('bx-x', 'bx-search');
                        searchForm.classList.remove('show');
                    }
                };
                window.addEventListener('resize', handleResize);

                // Dark mode toggle
                const switchMode = document.getElementById('switch-mode');
                if (switchMode) {
                    switchMode.addEventListener('change', function () {
                        if (this.checked) {
                            document.body.classList.add('dark');
                        } else {
                            document.body.classList.remove('dark');
                        }
                    });
                }

                // Return cleanup function
                return () => {
                    window.removeEventListener('resize', handleResize);
                    // Clean up other event listeners if needed
                };
            } catch (error) {
                console.error('Error initializing dashboard:', error);
            }
        };

        // Run initialization after a small delay to ensure DOM is ready
        const timeoutId = setTimeout(initializeDashboard, 100);

        // Cleanup timeout if component unmounts
        return () => clearTimeout(timeoutId);
    }, []);




    return (

        <div>


            <section id="sidebar">
                <Link to="/management" className="brand" style={{ textDecoration: 'none' }}>
                    <i className='bx bxs-dashboard'></i>
                    <span className="text">EMS</span>
                </Link>
                <ul className="side-menu top">
                   
                    <li className='active'>
                        <Link to="/employees">
                            <i className='bx bxs-group'></i>
                            <span className="text">Employees</span>
                        </Link>
                    </li>
                    <li>
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
                            <input className="form-input"
                                type="search"
                                style={{ width: '200px' }}
                                placeholder="Search By Name"
                                name='name' value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                        </div>
                    </form>


                    <a href="#" className="profile">
                        <img src={user_profile}></img>
                    </a>
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Employees</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="">Employees</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <Link className="active" to="/mangement">Home</Link>
                                </li>
                            </ul>
                        </div>
                        <a href="#" className="btn-download" style={{ textDecoration: 'none' }}>
                            <i className='bx bxs-add-to-queue' ></i>
                            <Link to="/add-employee" style={{ textDecoration: 'none', color: 'white' }}><span className="text">Add Employee</span></Link>
                        </a>
                    </div>
                    <div className="container my-4">
                        <form onSubmit={applyFilters}>
                            <div className="row">
                                {/* Department Filter */}
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="department" className="form-label">Department:</label>
                                    <select className="form-select" id="department" name="department" value={filters.department} onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        <option value="HR">HR</option>
                                        <option value="IT">IT</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>

                                {/* Role Filter */}
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="role" className="form-label">Role:</label>
                                    <select className="form-select" id="role" name="role" value={filters.role} onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </div>

                                {/* Status Filter */}
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="status" className="form-label">Status:</label>
                                    <select className="form-select" id="status" name="status" value={filters.status} onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        <option value="Actif">Actif</option>
                                        <option value="Résilié">Résilié</option>
                                        <option value="Congé">Congé</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                {/* Gender Filter */}
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="gender" className="form-label">Gender:</label>
                                    <select className="form-select" id="gender" name="gender" value={filters.gender} onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>

                                {/* Contract Type Filter */}
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="contratType" className="form-label">Contract Type:</label>
                                    <select className="form-select" id="contratType" name="contratType" value={filters.contratType} onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        <option value="CDI">CDI</option>
                                        <option value="CDD">CDD</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#3C91E6' }}>Apply Filters</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="friends-page d-grid m-20 gap-20">
                        {
                            employees.map(employee =>
                                <div className="friend bg-white rad-6 p-20 p-relative">
                                    <div className="txt-c">
                                        <img className="rad-half mt-10 mb-10" src={user_profile} alt="" />
                                        <h4 className="m-0">{employee.firstName} {employee.lastName}</h4>
                                        <p className="c-grey fs-13 mt-5 mb-0">{employee.jobTitle}</p>
                                    </div>
                                    <div className="icons fs-14 p-relative">
                                        <div className="mb-10">
                                            <i className="fa-regular fa-envelope fa-fw"></i>
                                            <span>{employee.email}</span>
                                        </div>
                                        <div className="mb-10">
                                            <i className="fa-solid fa-phone fa-fw"></i>
                                            <span>{employee.phoneNumber}</span>
                                        </div>
                                        <div className="mb-10">
                                            <i className="fa-solid fa-location-dot fa-fw"></i>
                                            <span>{employee.address}</span>
                                        </div>
                                        <div className="mb-10">
                                            {employee.gender === 'M' ? (
                                                <i className="fa-solid fa-mars fa-fw"></i>
                                            ) : employee.gender === 'F' ? (
                                                <i className="fa-solid fa-venus fa-fw"></i>
                                            ) : (
                                                <i className="fa-solid fa-genderless fa-fw"></i>
                                            )}
                                            <span>{employee.gender}</span>
                                        </div>

                                        <div className="mb-10">
                                            <i className="fa-solid fa-building fa-fw"></i>
                                            <span>{employee.department}</span>
                                        </div>
                                        <div className="mb-10">
                                            <i className="fa-solid fa-user-tag fa-fw"></i>
                                            <span>{employee.role}</span>
                                        </div>
                                        <div className="mb-10">
                                            <i className="fa-solid fa-file-contract fa-fw"></i>
                                            <span>{employee.contratType}</span>
                                        </div>
                                        <div className="mb-10">
                                            <i className="fa-solid fa-dollar-sign fa-fw"></i>
                                            <span>{employee.salary}$</span>
                                        </div>
                                        <div className="mb-10">
                                            {employee.status === 'Actif' ? (
                                                <i className="fa-solid fa-check-circle fa-fw" style={{ color: 'green' }}></i>
                                            ) : employee.status === 'Résilié' ? (
                                                <i className="fa-solid fa-times-circle fa-fw" style={{ color: 'red' }}></i>
                                            ) : employee.status === 'Congé' ? (
                                                <i className="fa-solid fa-pause-circle fa-fw" style={{ color: 'orange' }}></i>
                                            ) : (
                                                <i className="fa-solid fa-question-circle fa-fw"></i>
                                            )}
                                            <span>{employee.status}</span>
                                        </div>


                                    </div>
                                    <div className="info between-flex fs-13">
                                        <span className="c-grey">
                                            Hired {new Date(employee.hireDate).toLocaleDateString('en-GB')}
                                        </span>

                                        <div>
                                            <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                                style={{ marginLeft: '10px' }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }




                    </div>





                </main>

            </section>
            <script src="./src/assets/js/script.js"></script>


        </div>



    )

}

export default EmployeesCompenent