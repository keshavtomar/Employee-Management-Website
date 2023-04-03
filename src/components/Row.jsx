import React, { useEffect, useState } from 'react'
import Eye from '@mui/icons-material/RemoveRedEye';
import UpdateIcon from '@mui/icons-material/Edit';
import '../styles/tablestyle.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/map.css'
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


export default function Row(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [lat, setlat] = useState()
    const [lon, setlon] = useState()


    const city = props.data.address;


    const setCoordinates = async () => {
        const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=5148a17aade8598e3088f02cfe1ca5c3");
        const res = await response.json();
        await setlat(res[0].lat)
        await setlon(res[0].lon)
    }



    useEffect(() => {
        setCoordinates()
    }, [])


    let navigate = useNavigate()

    const handleUpdate = () => {
        navigate("/update/" + props.data.id);
    }




    function MyVerticallyCenteredModal(pps) {


        return (
            <Modal
                {...pps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {pps.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>id : </strong> {pps.id}</p>
                    <p><strong>Age : </strong> {pps.age}</p>
                    <p><strong>Employee Status : </strong> {pps.status}</p>
                    <p><strong>Department : </strong> {pps.department}</p>
                    <p><strong>Address : </strong> {pps.address}</p>

                    <MapContainer center={[lat, lon]} zoom={9}>
                        <TileLayer
                            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=ziqabEmrtmEsU40tEFXN"
                        />
                        <Marker
                            position={[lat, lon]}
                        />
                    </MapContainer>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={pps.onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
        );
    }



    let i = props.ind;


    return (
        <tr className={(i % 2) === 1 ? 'active-row' : ''} >

            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.age}</td>
            <td>
                <button type="button" className={(i % 2) === 0 ? 'btn btn-info' : 'btn btn-info text-success'} onClick={() => setModalShow(true)}>
                    <Eye></Eye>
                </button>
            </td>
            <td>
                <button type="button" className={(i % 2) === 0 ? 'btn btn-info' : 'btn btn-info text-success'}>
                    <UpdateIcon onClick={handleUpdate}></UpdateIcon>
                </button>
            </td>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={props.data.id}
                name={props.data.name}
                age={props.data.age}
                status={props.data.status}
                department={props.data.department}
                address={props.data.address}
            />
        </tr>
    )
}
