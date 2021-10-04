import React, { useReducer } from 'react'
import { AuthContext } from './store/authContext'
import AppRouter from './routing/AppRouter.jsx'
import authReducer from './store/authReducer'
import './styles/global.css'

const App = () => {
  const [auth, authDispatch] = useReducer(authReducer, {})

  return (
    <AuthContext.Provider value={{ auth, authDispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
