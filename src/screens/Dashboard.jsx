import React, { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import Navbar from '../components/Navbar'
import '../styles/dashstyle.css'
import Counter from '../components/Counter'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);



export default function Dashboard() {

    const [empData, setempData] = useState([])
    const [ageData, setageData] = useState([0, 0, 0]); //age<20, age>=20 && age<=30, age>30
    const [statusdata, setstatusdata] = useState([0, 0, 0, 0]); //total, Remote Location, Contract Employee, Full- time


    const loadData = async () => {
        let response = await fetch("https://employee-management-api-a9px.onrender.com/api/employeeData", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        setempData(response[0]);
    }

    const ageCounter = async () => {
        const age = [0, 0, 0]
        empData.map((v) => {
            if (v.age < 20) {
                age[0]++;
            }
            else if (v.age >= 20 && v.age <= 30) {
                age[1]++;
            }
            else if (v.age > 30) {
                age[2]++;
            }
        })
        setageData(age);
    }

    const statusCounter = async () => {
        const st = [0, 0, 0, 0]
        empData.map((v) => {
            console.log("I am clicked");
            if (v.status === 'Remote Location') {
                st[1]++;
            } else if (v.status === 'Contract Employee') {
                st[2]++;
            }
            else if (v.status === 'Full-Time') {
                st[3]++;
            }
            st[0]++
        })
        setstatusdata(st);
    }

    useEffect(() => {
        loadData();
        ageCounter();
        statusCounter();
    }, [empData])
    // empData is a dependency here means, useEffect will run on rendering of website and then it will run when there is any change in empData

    console.log(empData);


    const data = {
        labels: ['Age(<20)', 'Age (20-30)', 'Age(>30)'],
        datasets: [
            {
                label: 'No of Employees',
                data: ageData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const Baroptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Employee Status Chart',
            },
        },
    };

    const labels = ['Total', 'Remote Location', 'Contract Employee', 'Full-time'];

    const Bardata = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map((e, i) => statusdata[i]),
                backgroundColor: 'rgba(116, 209, 89, 0.8)',
            },
        ],
    };

    return (
        <div>
            <Navbar />
            <div className='nbox'>
                <Counter statusdata={statusdata} />
            </div>
            <div className='graphBox'>
                <div className='box'>
                    <h2 className='text-center'>Age Pie Chart</h2>
                    <Pie data={data} />
                </div>
                <div className='box'>
                    <Bar options={Baroptions} data={Bardata} />
                </div>
            </div>
        </div>
    )
}
