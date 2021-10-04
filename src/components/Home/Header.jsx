import { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../store/authContext'
import { logout } from '../../store/authAction'
import classes from '../../styles/header.module.css'

const Header = () => {

    const { authDispatch } = useContext(AuthContext)

    const logoutHandler = async () => {
        const { token } = JSON.parse(localStorage.getItem('device-register'))
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        const res = await axios.post(`${process.env.REACT_APP_API}/logout`, {}, { headers })

        if (res.status === 200) {
            authDispatch(logout())
            localStorage.setItem('device-register', '')
            return
        }

        console.log(res.status)
    }

    return (
        <header className={classes.container}>
            <div>
                <h1>Device Registrar</h1>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </header>
    )
}

export default Header