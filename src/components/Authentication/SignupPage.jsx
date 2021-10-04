import { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../store/authContext'
import { login } from '../../store/authAction'
import DeviceModal from '../Home/DeviceModal'
import classes from '../../styles/signup-page.module.css'

const SignupPage = () => {
    const { authDispatch } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const body = {
            firstName: e.target.elements.fName.value,
            lastName: e.target.elements.lName.value,
            userName: e.target.elements.uName.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        const res = await axios.post(`${process.env.REACT_APP_API}/signup`, body)

        if (res.status === 201) {
            localStorage.setItem('device-register', JSON.stringify({
                email: e.target.elements.email.value,
                token: res.data.token
            }))
            setIsOpen(true)
            return
        }

        console.log(res.status)
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
        <div>
            <div className={classes.container}>
                <h2>Welcome !</h2>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="fName">First Name</label>
                        <input type='text' name='fName' required />
                    </div>


                    <div>
                        <label htmlFor="lName">Last Name</label>
                        <input type='text' name='lName' required />
                    </div>

                    <div>
                        <label htmlFor="uName">User Name</label>
                        <input type='text' name='uName' required />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' required />
                    </div>


                    <div>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' required />
                    </div>

                    <button type='submit'>Sign UP</button>
                </form>
            </div>
            <DeviceModal isOpen={isOpen} registerDevice={registerDevice} />
        </div>
    )
}

export default SignupPage