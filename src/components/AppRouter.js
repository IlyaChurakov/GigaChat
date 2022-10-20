import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE, CHAT_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes } from '../routes';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..';

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    console.log(user)
    return user ? 
        (
            <Switch>
                {privateRoutes.map(({path, Component}) => 
                    <Route path={path} key={path} component={Component} exact/>
                )}
                <Redirect to={CHAT_ROUTE}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) => 
                    <Route path={path} key={path} component={Component} exact/>
                )}
                <Redirect to={LOGIN_ROUTE}/>
            </Switch>
        )
}

export default AppRouter