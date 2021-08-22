import React from 'react'
import './css/message.css'
import { useState } from 'react'
import { showForm } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

export const Message = ({message, username, time, user}) => {
    const [userClick, setUserClick] = useState(false)
    const showFormm = useSelector(state => state.showForm)
    const dispatch = useDispatch()

    return (
        <div>
            <div id='message-area' style={{borderLeft: username !== user ? '5px solid blue' : '5px solid green' }} onClick={() => setUserClick(!userClick)}>
                <div id='user-time'>
                    <span style={{color: username !== user ? 'blue' : 'green' }} >
                        {
                            username === user ? <span>Me</span> : username
                        }
                    </span>
                    <span>
                        {time}
                    </span>
                </div>
                <div id='message'>
                    <span>{message}</span>
                    <span style={{display: userClick && username !== user ? 'block' : 'none'}}><button className='btn btn-danger'>Block</button> <button className='btn btn-danger' onClick={() => dispatch(showForm({value:!showFormm.value, reportUsername:username}))}>Report</button></span>
                </div>
            </div><br/>
        </div>
    )
}
