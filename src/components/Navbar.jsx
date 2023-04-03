import { Avatar } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import BadgeIcon from '@mui/icons-material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';


export default function Navbar() {

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const handleAddEmployee = () => {
        navigate("/addEmployee");
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    let navigate = useNavigate()

    const handlelogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        navigate("/");
        toast('Logged Out', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    let myname = 'Keshav';

    const handleDashboard = () => {
        navigate('/dashboard', myname);
    }

    return (
        <div>
            <ToastContainer />
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className='badgeicon'><BadgeIcon /></span>

                    <Link className="navbar-brand" to="/">
                        Employee Management
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {!localStorage.getItem("authToken") ?
                            <ul className="navbar-nav  msauto float-end ms-lg-auto px-3" style={{ '--bs-scroll-height': '100px' }}>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">
                                        <button type="button" className="btn btn-outline-info">Login</button>
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link active" to="/signup">
                                        <button type="button" className="btn btn-outline-info">SignUp</button>
                                    </Link>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav  msauto float-end ms-lg-auto px-3" style={{ '--bs-scroll-height': '100px' }}>
                                <li className='nav-item'>
                                    <button type='button' className='btn btn-primary' style={{ 'height': '90%', 'margin-right': '15px', 'marginTop': '5px' }} onClick={handleDashboard}>
                                        <DashboardIcon />
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="btn btn-warning" style={{ 'height': '90%', 'margin-right': '15px', 'marginTop': '5px' }} onClick={handleAddEmployee}>Add Employee</button>
                                </li>
                                <li className="nav-item dropstart">
                                    <Link className="nav-link " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Avatar {...stringAvatar(localStorage.getItem('userName'))} />
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/">Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className='text-center'>
                                            <button type="button" className="btn btn-outline-danger " onClick={handlelogout}>Log Out</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        }


                    </div>
                </div>
            </nav>
        </div>
    )
}
