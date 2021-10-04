import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../store/authContext'
import Header from '../components/Home/Header.jsx'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { auth } = useContext(AuthContext)

    return (
        <Route {...rest} component={(props) => {
            return auth.uid ? (
                <>
                    <Header />
                    <Component {...props} />
                </>
            ) : (
                <Redirect to='/' />
            )
        }} />
    )
}

export default PrivateRoute