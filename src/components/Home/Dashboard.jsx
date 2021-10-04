import { useEffect, useState } from 'react'
import axios from 'axios'
import DeviceList from './DeviceList'
import classes from '../../styles/dashboard.module.css'

const Dashboard = () => {

    const [devices, setDevices] = useState([])

    const fetchData = async () => {

        const { token } = JSON.parse(localStorage.getItem('device-register'))

        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const res = await axios.get(`${process.env.REACT_APP_API}/fetchdevices`, { headers })

        if (res.status === 200) {
            setDevices(res.data)
            console.log(res.data)
            return
        }

        console.log(res.status)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={classes.container}>
            <h2>All Logged in Devices</h2>
            <DeviceList devices={devices} />
        </div>
    )
}

export default Dashboard