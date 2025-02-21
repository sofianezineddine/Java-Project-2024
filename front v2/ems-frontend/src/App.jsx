import './App.css';
import AddUpdateEmployeeCompenent from './compenents/AddUpdateEmployeeCompenent';
import LoginCompenent from './compenents/LoginCompenent';
import RegisterCompenent from './compenents/RegisterCompenent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerCompenent from './compenents/MangerCompenent';
import EmployeesCompenent from './compenents/EmployeesCompenent';
import TasksCompenent from './compenents/TasksCompenent';
import AddTaskComponent from './compenents/AddTaskCompenent';
import EmployeeDashboard from './compenents/EmployeeDashboard';
import MyTasksCompenent from './compenents/MyTasksCompenent';
import SettingsCompenent from './compenents/SettingsCompenent';

function App() {
    

    return (
        <>
            <BrowserRouter>
                {/* <HeaderCompenent/> */}
                <Routes>
                    {/* http://localhost:5173 */}
                    <Route path='/' element={<LoginCompenent />}></Route>

                    {/* http://localhost:5173/login */}
                    <Route path='/login' element={<LoginCompenent />}></Route>

                    {/* http://localhost:5173/register */}
                    <Route path='/register' element={<RegisterCompenent />}></Route>

                    {/* http://localhost:5173/employees */}
                    <Route path='/employees' element={<EmployeesCompenent />}></Route>

                    {/* http://localhost:5173/management */}
                    <Route path='/management' element={<ManagerCompenent />}></Route>

                    {/* http://localhost:5173/tasks */}
                    <Route path='/tasks' element={<TasksCompenent />}></Route>

                    {/* http://localhost:5173/add-employee */}
                    <Route path='/add-employee' element={<AddUpdateEmployeeCompenent />}></Route>

                    {/* http://localhost:5173/add-task */}
                    <Route path='/add-task' element={<AddTaskComponent />}></Route>

                    {/* http://localhost:5173/update-employee/:id */}
                    <Route path='/update-employee/:id' element={<AddUpdateEmployeeCompenent />}></Route>

                    {/* http://localhost:5173/update-task/:id */}
                    <Route path='/update-task/:id' element={<AddTaskComponent />}></Route>
                    
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/my-tasks" element={<MyTasksCompenent />} />
                    <Route path="/settings" element={<SettingsCompenent />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;