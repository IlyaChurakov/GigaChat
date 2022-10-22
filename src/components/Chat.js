import React, { useContext, useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..';
import { Button, Grid, TextField} from '@mui/material'
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
        <Container >
            <Grid 
                className="container"
                container 
                style={{height: window.innerHeight - 70 - 20, marginTop: 20}}
                justifyContent={'center'}
            >
                <div 
                    className='chat'
                    style={{width: '80%', height: '70vh', overflowY: 'auto'}}
                    
                >
                    {messages.map((message, i) =>
                        <div key={i} style={{
                            margin: 5,
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            maxWidth: '45%',
                            wordWrap: 'break-word',
                            padding: 7,
                            borderRadius: 20,
                            background: user.uid === message.uid ? '#051E34' : '#39393D'
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
                    className='gridForTxtField'
                    style={{width: '80%'}}
                >
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        className='textField'
                        value={value}
                        autoComplete='off'
                        placeholder='Напишите сообщение...'
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage()
                            }
                        }}
                        style={{width: '80%', height: 56}}
                    >
                        
                    </TextField>
                    <Button 
                        onClick={sendMessage}
                        variant={'outlined'}
                        style={{
                            height: 56,
                            width: '18%'
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