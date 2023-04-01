import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/updatestyle.css'
import Navbar from '../components/Navbar';


export default function Update() {

    let navigate = useNavigate()
    let pid = useParams().id;

    const [updatedetails, setupdatedetails] = useState({
        id: pid,
        name: "",
        age: "",
        address: "",
        department: "",
        status: ""
    })

    const handleChange = (event) => {
        setupdatedetails({
            ...updatedetails,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://employee-management-api.vercel.app/api/updateEmployee", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: updatedetails.id,
                name: updatedetails.name,
                age: updatedetails.age,
                department: updatedetails.department,
                status: updatedetails.status,
                address: updatedetails.address
            })
        })

        const json = await response.json();
        const employeeUpdated = json.success;

        if (employeeUpdated) {
            navigate("/");
            alert("Employee Updated Successfully");
        }
        else {
            alert("Updation failed");
        }
    }

    return (
        <div>
            <Navbar />
            <style href='../style/updatestyle.css'></style>
            <link rel="stylesheet" href="../style/updatestyle.css" />
            <div className="main-block">
                <div className="left-part">
                    <i className="fas fa-envelope"></i>
                    <i className="fas fa-at"></i>
                    <i className="fas fa-mail-bulk"></i>
                </div>
                <form id='update-form' action="/" onSubmit={handleSubmit}>
                    <h1>Update Employee info</h1>
                    <div className="info">
                        <input className="fname" type="text" name="name" placeholder="Full name" onChange={handleChange} value={updatedetails.name} required />
                        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={updatedetails.age} required />
                        <input type="text" name="department" placeholder="Department" onChange={handleChange} value={updatedetails.department} required />

                        <label htmlFor="status">Employee Status : </label>
                        <select name="status" className="update-form-select" aria-label="Default select example" onChange={handleChange} value={updatedetails.status} required>
                            <option>-</option>
                            <option value="Remote Location">Remote Location</option>
                            <option value="Contract Employee">Contract Employee</option>
                            <option value="Full-Time">Full-Time</option>
                        </select>
                        <input type="text" name="address" placeholder="Address" required onChange={handleChange} value={updatedetails.address} />
                    </div>
                    <button id='update-btn' type="submit" href="/">Submit</button>
                </form>
            </div>
        </div >
    )
}
