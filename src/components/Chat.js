import React, { useContext, useState, useRef, useEffect, getSnapshotBeforeUpdate } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..';
import { Button, Grid, Box, TextField, Avatar } from '@mui/material'
import { Container } from '@mui/system';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader';
import firebase from "firebase/compat/app";

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const chatRef = useRef()
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])
    
    const sendMessage = async () => {
        if (value) {
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setValue('')
        }
    }

    if (loading) {
        return <Loader/>
    }

    const getDate = (message) => {
        try {
            let seconds = message.createdAt.seconds

            let res = new Date(+seconds * 1000)
            
            let time = [res.getHours(), res.getMinutes()].map(function (x) {
                return x < 10 ? "0" + x : x
            }).join(":")

            return time
        } catch{}
    }

    return (
        <Container>
            <Grid 
                container 
                style={{height: window.innerHeight - 70, marginTop: 20}}
                justifyContent={'center'}
            >
                <div 
                    className='chat'
                    style={{width: '80%', height: '70vh', overflowY: 'auto'}}
                    
                >
                    {messages.map((message, i) =>
                        <div key={i} style={{
                            margin: 5, 
                            border: user.uid === message.uid ? '2px solid #1565C0' : '1px solid lightgray',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            maxWidth: '45%',
                            wordWrap: 'break-word',
                            padding: 7,
                            borderRadius: 20
                        }}>
                            <div className='msgWrapper' container>
                                <div className='titleWrapper'>
                                    <img src={message.photoURL} className="avatar"/>
                                    <div className='userName'>{message.displayName}</div>
                                </div>
                                <div>&nbsp;{getDate(message)}</div>
                            </div>
                            <div className='message'>{message.text}</div>
                            
                        </div> 
                    )}
                    <div ref={chatRef}></div>
                </div>
                <Grid
                    container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{width: '80%'}}
                >
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        className='textField'
                        value={value}
                        autoComplete='off'
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                sendMessage()
                            }
                        }}
                        style={{width: '85%', transform: 'translateX(-138px)'}}
                    >
                        
                    </TextField>
                    <Button 
                        onClick={sendMessage}
                        variant={'outlined'}
                        style={{
                            transform: 'translate(-10px, -46px)'
                        }}    
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat