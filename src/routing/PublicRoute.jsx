import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../store/authContext'

const PublicRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext)

    return (
        <Route {...rest} component={(props) => {
            return auth.uid ? (
                <Redirect to='/dashboard' />
            ) : (
                <>
                    <Component {...props} />
                </>
            )
        }} />
    )
}

export default PublicRoute