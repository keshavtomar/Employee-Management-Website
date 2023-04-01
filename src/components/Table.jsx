import React, { useState, useEffect } from 'react'
import '../styles/tablestyle.css'
import Row from './Row';



export default function Table() {

    const [empData, setempData] = useState([])

    const loadData = async () => {
        let response = await fetch("https://employee-management-api.vercel.app/api/employeeData", {
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
    }, [])

    return (
        <div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>View</th>
                        <th>
                            Update
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {empData !== [] ?
                        empData.map((emp, i) => {
                            return (
                                <Row data={emp} ind={i} key={i} />
                            );
                        })
                        :
                        null
                    }
                </tbody>
            </table>
        </div >
    )
}
