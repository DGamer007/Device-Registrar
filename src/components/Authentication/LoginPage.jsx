import { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../store/authContext'
import { login } from '../../store/authAction'
import DeviceModal from '../Home/DeviceModal'
import classes from '../../styles/login-page.module.css'

const LoginPage = () => {
    const { authDispatch } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)

    const submitButtonHandler = async (e) => {
        e.preventDefault()

        const res = await axios.post(`${process.env.REACT_APP_API}/login`, { email: e.target.elements.email.value, password: e.target.elements.password.value })

        if (res.status === 202) {
            localStorage.setItem('device-register', JSON.stringify({
                email: e.target.elements.email.value,
                token: res.data.token
            }))
            setIsOpen(true)
            return
        }

        console.log(`Error Code: ${res.status}\nError: ${res.statusText}`)
        e.target.reset()
    }

    const registerDevice = async (e) => {
        e.preventDefault()

        const { token } = JSON.parse(localStorage.getItem('device-register'))
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const body = {
            deviceName: e.target.elements.name.value,
            deviceModel: e.target.elements.model.value
        }

        const res = await axios.post(`${process.env.REACT_APP_API}/registerdevice`, body, { headers })

        if (res.status === 201) {
            authDispatch(login(res.data.uid))
            return
        }

        console.log(res.status)
        e.target.reset()
    }

    return (
        <div className={classes.masterContainer}>
            <div className={classes.container}>
                <h2>Welcome Back !</h2>
                <form onSubmit={submitButtonHandler}>
                    <div>
                        <img src='/images/email.png' alt='Email Label' />
                        <input type='email' name='email' placeholder='Enter Email' required />
                    </div>
                    <div>
                        <img src='/images/key.png' alt='Password Label' />
                        <input type='password' name='password' placeholder='Enter Password' required />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
            <DeviceModal isOpen={isOpen} registerDevice={registerDevice} />
        </div>
    )
}

export default LoginPage