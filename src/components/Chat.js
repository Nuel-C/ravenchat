import React from 'react'
import './css/chat.css'
import io from 'socket.io-client'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/index'
import { updateName } from '../actions/index'
import {Message} from './Message'
import img from '../img/user.png'
import logOut from '../img/power.svg'
import { Redirect, Link } from 'react-router-dom'
import { showForm } from '../actions'


const socket = io.connect('https://raven-chat.herokuapp.com/')
// const socket = io.connect('http://localhost:5000/')


export const Chat = (props) => {

    const user = useSelector(state => state.userReducer)
    const showFormm = useSelector(state => state.showForm)
    const login = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [reason, setReason] = useState('')
    const [reportUser, setReportUser] = useState('')
    const [messages, setMessages] = useState([])

    const log_out = () => {
        dispatch(logout())
        dispatch(updateName({
            username: ' ',
            blockedUsers:[],
            messages:[]
        }))
    }

    // Message from server
        socket.on('message', message => {
            setMessages([...messages, {
                username: message.username,
                time: message.time,
                message:message.text
            }])
        })

    //Send message
    function sendMessage(e){

        e.preventDefault()

        socket.on('message', message => {

                var userDetails = {
                username: props.location.state,
                blockedUsers:[],
                messages:[...user.messages, {
                    username: message.username,
                    time: message.time,
                    message:message.text
                }]
            }

            dispatch(updateName(userDetails))

            setMessage('')
            setMessages([...messages, {
                username: message.username,
                time: message.time,
                message:message.text
            }])
            
        })

        socket.emit('chatMessage', {username: user.username, message})
        setMessage('')
        
    }

    function report(e){
        e.preventDefault()

        setSuccess('Sending...')
        setError('')

        const data = { username: showFormm.reportUsername, reason };

        fetch('/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        if(data.success){
            setSuccess(data.message)
            setError('')
        }else{
            setError(data.message)
            setSuccess('')
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        });

        setTimeout(()=>{
            setSuccess('')
            setError('')
            setReason('')
        }, 7000)
        
    }

    return (
        <div>
            {
            login === false ? <Redirect to = '/'/> : null
            }
            <div id='report-section' style={{
                        display: showFormm.value ? 'block' : 'none',
                    }}>
                        <div style={{display:'flex',flexDirection:'row-reverse'}}><button onClick={() => dispatch(showForm({value:!showFormm.value, reportUsername:''}))} style={{background:'transparent', color:'white', padding:'2%', paddingRight:'4%', paddingLeft:'4%'}}>x</button ></div><br/>
                            <span style={{color:'green'}}>{success}</span>
                            <span style={{color:'red'}}>{error}</span>
                            <form onSubmit={report} id='report-form'>
                                Report User:
                                <input required type = 'text'
                                    onChange = {(e)=>{setReportUser(e.target.value)}}
                                    value = {showFormm.reportUsername}
                                    className = 'form-control form-group'
                                    id='report'
                                    readOnly
                                /><br/>
                                Reason:
                                <textarea required type = 'text'
                                    placeholder = 'Reason for Reporting User'
                                    onChange = {(e)=>{setReason(e.target.value)}}
                                    value = {reason}
                                    className = 'form-control form-group'
                                    id='report'
                                    height='30%'
                                ></textarea><br/>
                                <input 
                                    id='submit'
                                    type = 'submit'
                                    className = 'btn btn-block form-control form-group'
                                    value = 'Submit'
                                />
                            </form>
            </div>

            <div>
                <h4 id='headder'>Raven Livestream Chat</h4>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-4' id='rooms'>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Link to='/reports'><button className='btn btn-danger' style={{color:'white'}}>Blacklist</button></Link>
                            <button onClick={log_out} className='btn btn-danger' style={{color:'white'}}><img src={logOut} style={{height:'1rem', width:'1rem'}} alt=''/></button>
                        </div>
                        <h2 style={{marginTop:'10%'}}><strong>Online Users</strong></h2>
                        <hr style={{border:'1px solid black'}}/>
                        <ul className='users'>
                            <div id='users'>
                                <h4><li><img id='userss' src={img} alt=''/>Musa</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Mike</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Peter</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Sophia</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Mufasa</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Scar</li></h4><br/>
                                <h4><li><img id='userss' src={img} alt=''/>Nala</li></h4><br/>
                            </div>
                        </ul><br/>
                    </div>

                    <div className='col-sm-8' id='texting-area'>

                        <div id='mobile-controls' style={{flexDirection:'row', justifyContent:'space-between', borderBottom:'1px solid white'}}>
                            <Link to='/reports'><button className='btn btn-danger'  style={{marginBottom:'5%',color:'white'}}>Blacklist</button></Link>
                            <button onClick={log_out} className='btn btn-danger'  style={{marginBottom:'5%',color:'white'}}><img src={logOut} style={{height:'1rem', width:'1rem'}} alt=''/></button>
                        </div>

                        <div id='message-display'>
                            {
                                messages.map(msg => {
                                    return(
                                        <Message key={(messages.indexOf(msg)*Math.random())} user={user.username} message={msg.message} username={msg.username} time={msg.time}/>
                                    )
                                }).reverse()
                            }
                        </div>
                        <div>
                            <form onSubmit={sendMessage} id='typing-area'>
                                <input required type = 'text'
                                    placeholder = 'type message'
                                    onChange = {(e)=>{setMessage(e.target.value)}}
                                    value = {message}
                                    className = 'form-control form-group'
                                    id='type'
                                />
                                <input 
                                    id='send'
                                    type = 'submit'
                                    className = 'btn btn-block form-control form-group'
                                    value = 'send'
                                />
                            </form>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
