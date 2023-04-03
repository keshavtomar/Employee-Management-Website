import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home'
import Form from './screens/AddEmployee'
import Update from './screens/Update';
import Dashboard from './screens/Dashboard'
import { LoginContext } from './components/ContextProvider/Context';
import { useEffect, useContext, useState } from "react";

function App() {
  const { empData, setempData } = useContext(LoginContext);

  const loadData = async () => {
    let response = await fetch("https://employee-management-api-oyx7.onrender.com/api/employeeData", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()
    setempData(response[0]);
  }

  useEffect(() => {
    loadData();
    console.log(empData);
  })

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/addEmployee" element={<Form />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/update/:id" element={<Update />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router >
    </div>
  );
}

export default App;
