import axios from 'axios';

const REST_API_BASE_URL_TASKS = 'http://localhost:8080/api/tasks';

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

// Create Task
export const createTask = (task) => axios.post(REST_API_BASE_URL_TASKS, task, { headers });

// Get Task by ID
export const getTask = (taskId) => axios.get(REST_API_BASE_URL_TASKS + '/' + taskId, { headers });


// Update Task
export const updateTask = (taskId, task) => axios.put(REST_API_BASE_URL_TASKS + '/' + taskId, task, { headers });

// Delete Task
export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL_TASKS + '/' + taskId, { headers });

// Search Tasks by Title
export const searchTasks = (title) => axios.get(`${REST_API_BASE_URL_TASKS}/search`, {
    headers,
    params: { title }
});


export const listTasks = (filters) => {
    let query = new URLSearchParams(filters).toString();
    return axios.get(`${REST_API_BASE_URL_TASKS}/filter?${query}`, { headers });
};


export const getTasksByEmployee = (employeeId) => {
    return axios.get(`${REST_API_BASE_URL_TASKS}/employee/${employeeId}`, { headers });
};

export const completeTask = (taskId) => {
    return axios.put(`${REST_API_BASE_URL_TASKS}/complete/${taskId}`, {}, { headers });
};