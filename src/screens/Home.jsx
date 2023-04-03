import React from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

export default function Home() {

    return (
        <div>
            <Navbar />
            <div className='container d-flex justify-content-center'>
                <Table />
            </div>
        </div>
    )
}
