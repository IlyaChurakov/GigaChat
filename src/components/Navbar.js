import React, { useContext } from 'react';
import { Toolbar, AppBar, Button, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, USERS_ROUTE, CHAT_ROUTE } from '../utils/consts'
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
                        <NavLink to={CHAT_ROUTE} style={{textDecoration: 'none'}}>
                            <Button style={{margin: '0 10px'}} variant={'outlined'}>Чат</Button>
                        </NavLink>
                        :
                        null
                    }
                    {user && user.uid == "PfMbKclV8CQlWU78ZidxCUF0Kbi2" 
                        ?
                        <NavLink to={USERS_ROUTE} style={{textDecoration: 'none'}}>
                            <Button style={{margin: '0 10px', textDecoration: 'none'}} variant={'outlined'}>Пользователи</Button>
                        </NavLink>
                        :
                        <div></div>
                    }
                    {user ? 
                        <Button style={{margin: '0 10px'}} onClick={() => auth.signOut()} variant={'outlined'}>Выйти</Button> 
                        :
                        null
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar