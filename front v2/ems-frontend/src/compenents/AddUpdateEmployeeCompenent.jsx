import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams, Link } from 'react-router-dom';
import user_profile from '../assets/imgs/user.png';

const AddUpdateEmployeeCompenent = () => {
  // Employee state attributes
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('M');
  const [hireDate, setHireDate] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('IT');
  const [role, setRole] = useState('Employé');
  const [contratType, setContratType] = useState('CDI');
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState('Actif');

  const navigator = useNavigate();
  const { id } = useParams(); // Get employee id

  // Fetch employee data if editing
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          const employee = response.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
          setPhoneNumber(employee.phoneNumber);
          setAddress(employee.address);
          setGender(employee.gender);
          setHireDate(employee.hireDate);
          setJobTitle(employee.jobTitle);
          setDepartment(employee.department);
          setRole(employee.role);
          setContratType(employee.contratType);
          setSalary(employee.salary);
          setStatus(employee.status);
        })
        .catch((error) => {
          console.error('Error fetching employee:', error);
        });
    }
  }, [id]);

  // Error state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: '',
    hireDate: '',
    jobTitle: '',
    department: '',
    role: '',
    contratType: '',
    salary: '',
    status: '',
  });

  // Validate the form
  const validateForm = () => {
    const fields = [
      { name: 'firstName', value: firstName, message: 'First Name is required' },
      { name: 'lastName', value: lastName, message: 'Last Name is required' },
      { name: 'email', value: email, message: 'Email is required' },
      { name: 'phoneNumber', value: phoneNumber, message: 'Phone Number is required' },
      { name: 'address', value: address, message: 'Address is required' },
      { name: 'gender', value: gender, message: 'Gender is required' },
      { name: 'hireDate', value: hireDate, message: 'Hire Date is required' },
      { name: 'jobTitle', value: jobTitle, message: 'Job Title is required' },
      { name: 'department', value: department, message: 'Department is required' },
      { name: 'role', value: role, message: 'Role is required' },
      { name: 'contratType', value: contratType, message: 'Contract Type is required' },
      { name: 'salary', value: salary, message: 'Salary must be greater than 0' },
      { name: 'status', value: status, message: 'Status is required' },
    ];

    let valid = true;
    const errorsCopy = { ...errors };

    fields.forEach((field) => {
      if (!field.value || (field.name === 'salary' && field.value <= 0)) {
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
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        gender,
        hireDate,
        jobTitle,
        department,
        role,
        contratType,
        salary: parseFloat(salary),
        status,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log('Employee updated:', response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('Error updating employee:', error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log('Employee created:', response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('Error creating employee:', error);
          });
      }
    }
  };

  // Set page title
  const pageTitle = id ? 'Update Employee' : 'Add Employee';

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

          {/* Employee Form */}
          <form className="friends-page d-grid m-20 gap-20">
            <div className="friend bg-white rad-6 p-20 p-relative">
              {/* First Name */}
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              {/* Last Name */}
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              {/* Email */}
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Phone Number */}
              <div className="form-group mb-2">
                <label className="form-label">Phone Number:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </div>

              {/* Address */}
              <div className="form-group mb-2">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Address"
                  name="address"
                  value={address}
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
            </div>

            <div className="friend bg-white rad-6 p-20 p-relative">
              {/* Gender */}
              <div className="form-group mb-2">
                <label className="form-label">Gender:</label>
                <select
                  className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>

              {/* Hire Date */}
              <div className="form-group mb-2">
                <label className="form-label">Hire Date:</label>
                <input
                  type="date"
                  name="hireDate"
                  value={hireDate}
                  className={`form-control ${errors.hireDate ? 'is-invalid' : ''}`}
                  onChange={(e) => setHireDate(e.target.value)}
                />
                {errors.hireDate && <div className="invalid-feedback">{errors.hireDate}</div>}
              </div>

              {/* Job Title */}
              <div className="form-group mb-2">
                <label className="form-label">Job Title:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Job Title"
                  name="jobTitle"
                  value={jobTitle}
                  className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
              </div>

              {/* Department */}
              <div className="form-group mb-2">
                <label className="form-label">Department:</label>
                <select
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
              </div>

              {/* Role */}
              <div className="form-group mb-2">
                <label className="form-label">Role:</label>
                <select
                  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                </select>
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
              </div>
            </div>

            <div className="friend bg-white rad-6 p-20 p-relative">
              {/* Contract Type */}
              <div className="form-group mb-2">
                <label className="form-label">Contract Type:</label>
                <select
                  className={`form-control ${errors.contratType ? 'is-invalid' : ''}`}
                  name="contratType"
                  value={contratType}
                  onChange={(e) => setContratType(e.target.value)}
                >
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Freelance">Freelance</option>
                </select>
                {errors.contratType && <div className="invalid-feedback">{errors.contratType}</div>}
              </div>

              {/* Salary */}
              <div className="form-group mb-2">
                <label className="form-label">Salary:</label>
                <input
                  type="number"
                  placeholder="Enter Salary"
                  name="salary"
                  value={salary}
                  className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                  onChange={(e) => setSalary(e.target.value)}
                />
                {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
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
                  <option value="Actif">Active</option>
                  <option value="Congé">On Leave</option>
                  <option value="Résilié">Resigned</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>

              {/* Submit Button */}
              <div className="text-center" style={{ marginTop: '20px' }}>
                <button className="btn btn-success" onClick={saveOrUpdateEmployee} style={{ backgroundColor: '#3C91E6' }}>
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

export default AddUpdateEmployeeCompenent;