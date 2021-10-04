import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PublicRoute from './PublicRoute.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import PageNotFound from '../components/404.jsx'
import LandingPage from '../components/Authentication/LandingPage.jsx'
import LoginPage from '../components/Authentication/LoginPage.jsx'
import SignupPage from '../components/Authentication/SignupPage.jsx'
import Dashboard from '../components/Home/Dashboard.jsx'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute path='/' exact={true} component={LandingPage} />
                <PublicRoute path='/login' component={LoginPage} />
                <PublicRoute path='/signup' component={SignupPage} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter