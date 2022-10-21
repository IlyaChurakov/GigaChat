import React, { useContext } from 'react';
import { Toolbar, AppBar, Button, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..';

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <AppBar style={{background: '#222222'}} position="static">
            <Toolbar variant={'dense'}>
                <Grid container justifyContent={'flex-end'}>
                    {
                        <div style={{
                            fontFamily: 'Fuzzy Bubbles, cursive', 
                            fontSize: '30px', 
                            position: 'absolute', 
                            left: 30, top: '50%', 
                            transform: 'translateY(-50%)'
                        }}>
                            GigaChat
                        </div>
                    }
                    {user ? 
                        <Button onClick={() => auth.signOut()} variant={'outlined'}>Выйти</Button> 
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={'outlined'}>Логин</Button>
                        </NavLink>
                        
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar