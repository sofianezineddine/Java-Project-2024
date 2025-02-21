import axios from 'axios';



const REST_API_BASE_URL_CRUD = 'http://localhost:8080/api/employees';



// JWT token management
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];
    }
};


let headers = {};
if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { 'Authorization': `Bearer ${getAuthToken()}` };
}




axios.defaults.headers.post['Content-Type'] = 'application/json';


// export const listEmployees = () => axios.get(REST_API_BASE_URL_CRUD, { headers });


export const createEmployee = (employee) => axios.post(REST_API_BASE_URL_CRUD, employee, { headers });


export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL_CRUD + '/' + employeeId, { headers });


export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL_CRUD + '/' + employeeId, employee, { headers });


export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL_CRUD + '/' + employeeId, { headers });


export const searchEmployees = (name) => axios.get(`${REST_API_BASE_URL_CRUD}/search`, {
    headers,
    params: { name }
});

export const listEmployees = (filters) => {
    let query = new URLSearchParams(filters).toString();
    return axios.get(`${REST_API_BASE_URL_CRUD}/filter?${query}`, { headers });
};


export const getAllEmployees = () => axios.get(REST_API_BASE_URL_CRUD, { headers });


export const getCurrentEmployee = () => {
    const token = getAuthToken(); // Retrieve the token
    if (!token) {
        return Promise.reject(new Error("No token found"));
    }
    return axios.get(`${REST_API_BASE_URL_CRUD}/me`, { headers }
    );
};


export const updateEmployeePhoto = (employeeId, photo) => {
    const formData = new FormData();
    formData.append('photo', photo);
    return axios.post(`${REST_API_BASE_URL_CRUD}/${employeeId}/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getAuthToken()}`
        },
    });
};