import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../services/loginService';

const RegisterComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE'); // Default role is EMPLOYEE
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: '',
    });

    const navigator = useNavigate();

    // Validate the form
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }

        if (!login.trim()) {
            errorsCopy.login = 'Email is required';
            valid = false;
        } else {
            errorsCopy.login = '';
        }

        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        } else {
            errorsCopy.password = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    const onRegister = (event) => {
        event.preventDefault();
        if (validateForm()) {
            request(
                "POST",
                "/register",
                {
                    firstName: firstName,
                    lastName: lastName,
                    login: login,
                    password: password,
                    role: role, // Include the role in the payload
                }
            ).then((response) => {
                setAuthHeader(response.data.token);
                if(response.data.role === "MANAGER" || response.data.role === "HR") {
                navigator("/management");
                } else {
                  navigator("/employee-dashboard");
                }
            }).catch((error) => {
                console.log(error);
                setAuthHeader(null);
                navigator("/register");
            });
        }
    };

    return (
        <div>
            <section className="background-radial-gradient overflow-hidden">
                {/* Inline CSS code */}
                <style>{`
                    .background-radial-gradient {
                        background-color: hsl(218, 41%, 15%);
                        background-image: radial-gradient(650px circle at 0% 0%,
                            hsl(218, 41%, 35%) 15%,
                            hsl(218, 41%, 30%) 35%,
                            hsl(218, 41%, 20%) 75%,
                            hsl(218, 41%, 19%) 80%,
                            transparent 100%),
                          radial-gradient(1250px circle at 100% 100%,
                            hsl(218, 41%, 45%) 15%,
                            hsl(218, 41%, 30%) 35%,
                            hsl(218, 41%, 20%) 75%,
                            hsl(218, 41%, 19%) 80%,
                            transparent 100%);
                    }
                    #radius-shape-1 {
                        height: 220px;
                        width: 220px;
                        top: -60px;
                        left: -130px;
                        background: radial-gradient(#44006b, #ad1fff);
                        overflow: hidden;
                    }
                    #radius-shape-2 {
                        border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
                        bottom: -60px;
                        right: -110px;
                        width: 300px;
                        height: 300px;
                        background: radial-gradient(#44006b, #ad1fff);
                        overflow: hidden;
                    }
                    .bg-glass {
                        background-color: hsla(0, 0%, 100%, 0.9) !important;
                        backdrop-filter: saturate(200%) blur(25px);
                    }
                `}</style>
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                Employee Management System <br />
                                <span style={{ color: 'hsl(218, 81%, 75%)' }}>Streamline your workforce</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                                Manage employee records, track attendance, and streamline payroll processing all in one place. Our system simplifies HR tasks and enhances team efficiency.
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={onRegister}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example1">First name</label>
                                                    <input
                                                        type="text"
                                                        id="form3Example1"
                                                        name='firstName'
                                                        value={firstName}
                                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example2">Last name</label>
                                                    <input
                                                        type="text"
                                                        id="form3Example2"
                                                        name='lastName'
                                                        value={lastName}
                                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                            <input
                                                type="text"
                                                id="form3Example3"
                                                name='login'
                                                value={login}
                                                className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                                                onChange={(e) => setLogin(e.target.value)}
                                            />
                                            {errors.login && <div className='invalid-feedback'>{errors.login}</div>}
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                            <input
                                                type="password"
                                                id="form3Example4"
                                                name='password'
                                                value={password}
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                        </div>

                                        {/* Role Selection Dropdown */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example5">Role</label>
                                            <select
                                                id="form3Example5"
                                                name="role"
                                                value={role}
                                                className="form-control"
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="EMPLOYEE">Employee</option>
                                                <option value="MANAGER">Manager</option>
                                                <option value="HR">HR</option>
                                            </select>
                                        </div>

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4"
                                            style={{ width: '100%' }}>
                                            Sign up
                                        </button>
                                        <div className="text-center">
                                            <span style={{
                                                marginRight: '5px',
                                            }}>Have an account?</span>

                                            <Link to="/login" style={{
                                                textDecoration: 'none',
                                                color: '#0d6efd',
                                                fontWeight: 'bold'
                                            }}>login</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterComponent;