import React, {useContext, useEffect, useState} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '..';
import Loader from './Loader';

const Users = () => {
    const {firestore} = useContext(Context)
    const [users] = useCollectionData(
        firestore.collection('users').orderBy('createdAt')
    )
    
    const getDate = (message) => {
        try {
            let seconds = message.createdAt.seconds

            let res = new Date(+seconds * 1000)

            let year = res.getFullYear(),
                month = res.toLocaleString('en-US', {month: 'long'}),
                day = res.getDate(),
                hour = res.getHours(),
                minute = res.getMinutes()

            let time = `${day < 10 ? '0' + day : day} ${month} ${year} ${hour}:${minute}`

            return time
        } catch{}
    }

    const renderItems = (arr) => {

        if (arr !== undefined) {
            const items =  arr.map((item, i) => {
                return (
                    <li key={i} className='users-list'>
                        <img src={item.photoURL} style={{height: '60px', marginRight: 10, borderRadius: 50}}/>
                        <div>
                            <div>ID пользователя: {item.uid}</div>
                            <div>Имя пользователя: {item.displayName}</div>
                            <div>Дата регистрации: {getDate(item)}</div>
                        </div>
                    </li>
                )
            })
            return (
                <ul>
                    {items}
                </ul>
            )
        } else {
            return <Loader/>
        }
    }

    return (
        <div className='users'>
            <h1 style={{marginBottom: 20}}>База пользователей</h1>
            <ul>
                {renderItems(users)}
            </ul>
        </div>
    )
}

export default Users