import { useNavigate, Link } from 'react-router-dom';
import { setAuthHeader } from '../services/loginService';
import { useState, useEffect } from 'react';
import avatar from '../assets/imgs/avatar.png'; // Import the avatar image
import welcome from '../assets/imgs/welcome.png'; // Import the avatar image
import new_01 from '../assets/imgs/news-01.png'; // Import the avatar image
import new_02 from '../assets/imgs/news-02.png'; // Import the avatar image
import new_03 from '../assets/imgs/news-03.png'; // Import the avatar image
import new_04 from '../assets/imgs/news-04.png'; // Import the avatar image
import act_01 from '../assets/imgs/activity-01.png'; // Import the avatar image
import act_02 from '../assets/imgs/activity-02.png'; // Import the avatar image
import act_03 from '../assets/imgs/activity-02.png'; // Import the avatar image
import course1 from '../assets/imgs/course-01.jpg'; // Import the avatar image
import course2 from '../assets/imgs/course-02.jpg'; // Import the avatar image
import course3 from '../assets/imgs/course-03.jpg'; // Import the avatar image
import course4 from '../assets/imgs/course-04.jpg'; // Import the avatar image
import course5 from '../assets/imgs/course-05.jpg'; // Import the avatar image
import friend01 from '../assets/imgs/friend-01.jpg'; // Import the avatar image
import friend02 from '../assets/imgs/friend-02.jpg'; // Import the avatar image
import friend03 from '../assets/imgs/friend-03.jpg'; // Import the avatar image
import friend04 from '../assets/imgs/friend-04.jpg'; // Import the avatar image
import friend05 from '../assets/imgs/friend-05.jpg'; // Import the avatar image
import pdf from '../assets/imgs/pdf.svg'; // Import the avatar image
import avi from '../assets/imgs/avi.svg'; // Import the avatar image
import dll from '../assets/imgs/dll.svg'; // Import the avatar image
import eps from '../assets/imgs/eps.svg'; // Import the avatar image
import psd from '../assets/imgs/psd.svg'; // Import the avatar image
import zip from '../assets/imgs/zip.svg'; // Import the avatar image
import project from '../assets/imgs/project.png'; // Import the avatar image
import team01 from '../assets/imgs/team-01.png'; // Import the avatar image
import team02 from '../assets/imgs/team-02.png'; // Import the avatar image
import team03 from '../assets/imgs/team-03.png'; // Import the avatar image
import team05 from '../assets/imgs/team-05.png'; // Import the avatar image
import team04 from '../assets/imgs/team-04.png'; // Import the avatar image
import user_profile from '../assets/imgs/user.png';

const ManagerCompenent = () => {
    const navigator = useNavigate();


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

    function logout(e) {
        e.preventDefault()
        setAuthHeader(null)
        navigator('/login')
    }

    return (

        <div>

            <section id="sidebar">
                <Link to="/management" className="brand" style={{ textDecoration: 'none' }}>
                    <i className='bx bxs-dashboard'></i>
                    <span className="text">EMS</span>
                </Link>
                <ul className="side-menu top">
                    <li className="active">
                        <Link to="/management">
                            <i className='bx bxs-dashboard'></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    <li>
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

                <nav style={{ justifyContent: 'space-between' }}>
                    <i className='bx bx-menu'></i>

                    <a href="#" className="profile">
                        <img src={user_profile}></img>
                    </a>
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Dashboard</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="">Dashboard</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="#">Home</a>
                                </li>
                            </ul>
                        </div>
                      
                    </div>

                    <ul className="box-info">
                        <li>
                            <i className='bx bxs-calendar-check' ></i>
                            <span className="text">
                                <h3>1020</h3>
                                <p>New Order</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-group' ></i>
                            <span className="text">
                                <h3>2834</h3>
                                <p>Visitors</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-dollar-circle' ></i>
                            <span className="text">
                                <h3>$2543</h3>
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>


                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Recent Orders</h3>
                                <i className='bx bx-search' ></i>
                                <i className='bx bx-filter' ></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Date Order</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={user_profile}></img>
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status completed">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={user_profile}></img>
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={user_profile}></img>
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status process">Process</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={user_profile}></img>
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={user_profile}></img>
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status completed">Completed</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="todo">
                            <div className="head">
                                <h3>Todos</h3>
                                <i className='bx bx-plus' ></i>
                                <i className='bx bx-filter' ></i>
                            </div>
                            <ul className="todo-list">
                                <li className="completed">
                                    <p>Todo List</p>
                                    <i className='bx bx-dots-vertical-rounded' ></i>
                                </li>
                                <li className="completed">
                                    <p>Todo List</p>
                                    <i className='bx bx-dots-vertical-rounded' ></i>
                                </li>
                                <li className="not-completed">
                                    <p>Todo List</p>
                                    <i className='bx bx-dots-vertical-rounded' ></i>
                                </li>
                                <li className="completed">
                                    <p>Todo List</p>
                                    <i className='bx bx-dots-vertical-rounded' ></i>
                                </li>
                                <li className="not-completed">
                                    <p>Todo List</p>
                                    <i className='bx bx-dots-vertical-rounded' ></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </section>
            <script src="./src/assets/js/script.js"></script>
        </div>



    )

}

export default ManagerCompenent