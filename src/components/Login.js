import React, { useContext } from 'react';
import { Container } from '@mui/system';
import { Button, Grid, Box } from '@mui/material'
import { Context } from '..';
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Login = () => {
    const {firebase, auth} = useContext(Context)
    const {firestore} = useContext(Context)
    const [users] = useCollectionData(
        firestore.collection('users')
    )

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)

        // let userUid = user.uid

        // if (user.uid) {
        //     firestore.collection('users').userUid.photoURL = userUid.photoURL
        // }

        let userUids = []

        users.forEach(item => {
            userUids.push(item.uid)
        })

        if (userUids.includes(user.uid, 0) === false) {
            firestore.collection('users').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    return (
        <Container>
            <Grid 
                container 
                style={{height: window.innerHeight - 50}}
                alignItems={'center'}
                justifyContent={'center'}    
            >
                <Grid 
                    style={{width: 400, background: '#222222'}}
                    container
                    alignItems={'center'}
                    direction={'column'}
                >
                    <Box p={5}>
                        <Button onClick={login} variant='outlined'>Log in with Google account</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login