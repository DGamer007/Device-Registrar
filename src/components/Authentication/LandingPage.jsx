import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { login } from '../../store/authAction'
import { AuthContext } from '../../store/authContext'
import classes from '../../styles/landing-page.module.css'

const LandingPage = () => {
    const history = useHistory()

    const { authDispatch } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)

    const fetchAuth = async () => {
        if (!localStorage.getItem('device-register')) {
            setLoading(false)
            return
        }

        const { email, token } = JSON.parse(localStorage.getItem('device-register'))
        const body = { email }
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/verify`, body, { headers })

            if (res.status === 202) {
                authDispatch(login(res.data))
            }
            else {
                localStorage.setItem('device-register', '')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            localStorage.setItem('device-register', '')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAuth()
    }, [])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <header className={classes.header}>
                <h1>Device Registrar</h1>
                <h4>Keep track of all your logged in Devices</h4>
            </header>
            <div className={classes.container}>
                <button onClick={() => history.push('/login')}>Login</button>
                <button onClick={() => history.push('/signup')}>Signup</button>
            </div>
            <footer className={classes.footer}>
                Creator:<a href='https://github.com/DGamer007' target='_blank'>Dhruv Prajapati</a>
            </footer>
        </div>
    )
}

export default LandingPage