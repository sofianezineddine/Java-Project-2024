
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../services/loginService';

const LoginComponent = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
      username: '',
      password: '',
     
    });


  const navigator = useNavigate();

  // Validate the form
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    // Validate first name
    if (username.trim()) {
      errorsCopy.username = '';
    } else {
      errorsCopy.username = 'Username is required';
      valid = false;
    }

    // Validate last name
    if (password.trim()) {
      errorsCopy.password = '';
    } else {
      errorsCopy.password = 'Password is required';
      valid = false;
    }

    
   
    // Update the state with the error messages
    setErrors(errorsCopy);

    return valid;
  }


  const onLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
        request("POST", "/login", { login: username, password: password })
            .then((response) => {
              console.log(response.data); // Log the full response
              setAuthHeader(response.data.token);
              const userRole = response.data.role; // Get the role from the backend response
              if (userRole === "MANAGER" || userRole === "HR") {
                  navigator("/employees");
              } else {
                  navigator("/employee-dashboard");
              }
            })
            .catch((error) => {
                console.log(error);
                
                setAuthHeader(null);
                navigator("/login");
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
                    <form action='' onSubmit={onLogin}>
                     

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Username</label>
                        <input 
                        type="text" 
                        name='username'
                        id="form2Example2" 
                        value={username}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        onChange={(e) => setUsername(e.target.value)}
                         />
                          {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input 
                        type="password" 
                        id="form3Example3" 
                        name='password'
                        value={password}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        onChange={(e) => setPassword(e.target.value)}
                         />
                          {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                      </div>

                     

                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4" style={{
                        width: '100%'
                      }}>
                        Log in
                      </button>

                      
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

export default LoginComponent;
