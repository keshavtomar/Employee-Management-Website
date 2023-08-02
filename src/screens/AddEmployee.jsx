import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/formstyle.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function AddEmployee() {
    let navigate = useNavigate();

    const [details, setdetails] = useState({
        name: "",
        age: "",
        department: "",
        status: "",
        address: ""
    })

    function onChange(event) {
        setdetails({
            ...details,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const responseid = await fetch("https://employee-management-api-a9px.onrender.com/api/getId", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        })

        const ids = await responseid.json();
        const gotId = ids.id;

        const response = await fetch("https://employee-management-api-oyx7.onrender.com/api/addEmployee", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: gotId,
                name: details.name,
                age: details.age,
                department: details.department,
                status: details.status,
                address: details.address
            })
        })
        const json = await response.json();
        const employeeAdded = json.success;

        if (employeeAdded) {
            navigate("/");
            toast('Employee Added Successfully', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Failed to add', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }




    return (
        <div>
            <Navbar />
            <div className='form-area' >
                <form onSubmit={handleSubmit} style={{ 'width': '100%', 'margin': '0' }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input name='name' type="name" className="form-control" id="exampleInputEmail1" value={details.name} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
                        <input name='age' type="Number" className="form-control" id="exampleInputPassword1" value={details.age} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Department</label>
                        <input name='department' type="text" className="form-control" id="exampleInputPassword1" value={details.department} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status">Employee Status : </label>
                        <select name="status" className="form-select" aria-label="Default select example" defaultValue="Remote Location" value={details.status} onChange={onChange} >
                            <option>-</option>
                            <option value="Remote Location">Remote Location</option>
                            <option value="Contract Employee">Contract Employee</option>
                            <option value="Full-Time">Full-Time</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className='form-label'>Address : </label>
                        <input name='address' type='text' className='form-control' value={details.address} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
