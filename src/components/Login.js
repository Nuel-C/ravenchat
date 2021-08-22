import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { login } from '../actions/index'
import { updateName } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'



export const Login = () => {


    const loggedin = useSelector(state => state.isLoggedIn)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()


    function submit(e){
        e.preventDefault()
        setMessage('*Loggin In*')
        setError('')
        var details = {
            username: username,
            password: password,
        }
        axios.post('/login', details)
        .then(res => {
        if(res.data.success === false){
            setMessage('')
            setError(res.data.message)
        }
        if(res.data.success === true){
            const userDetails = {
                username: res.data.username,
                blockedUsers: [res.data.blockedUsers],
                messages:[]
            }

            dispatch(login())
            dispatch(updateName(userDetails))
        }
        })
        .catch((error) => {
            console.log(error)
            setMessage('')
            setError('Server Error')
        })

        setTimeout(()=>{
            setMessage('')
            setError('')
        }, 7000)
    }

    return (
        
        <div>
            {
                loggedin ? <Redirect to={{
                    pathname: "/chat",
                    state: username
                  }} /> : null
            }
            <div id='form' className='container' style={{paddingTop: '10%'}}>
                    <h2 style={{textAlign:'center'}}>LOG<span style={{color:'#5458f7'}}>IN</span></h2>
                    <div className='form-div'>
                    <span style={{color:'green'}}>{message}</span>
                    <span style={{color:'red'}}>{error}</span>
                        <form onSubmit={submit}>
                        Username:
                        <input required type = 'text'
                        placeholder = 'Username'
                        onChange = {(e)=>{setUsername(e.target.value)}}
                        value = {username}
                        className = 'form-control form-group'
                        /><br/>
                        Password:
                        <input required type = 'password'
                        placeholder = 'Password'
                        onChange = {(e)=>{setPassword(e.target.value)}}
                        value = {password}
                        className = 'form-control form-group'
                        /><br/>
                        <input 
                        id='submit'
                        type = 'submit'
                        className = 'btn btn-block form-control form-group'
                        value = 'submit'
                        />
                        </form><br/>
                        <Link to='/signup' style={{color:'#5458f7'}}>*Sign Up*</Link>
                    </div>
                </div>
        </div>
        
    )
}
