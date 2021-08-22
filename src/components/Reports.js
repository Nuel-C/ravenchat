import React from 'react'
import './css/chat.css'
import { useState } from 'react'
import './css/message.css'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'


export const Reports = () => {


    const [reports, setReports] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        fetch('/getreports', {
            method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            if(data.success){
                setReports(data.reports)
            }else{
                setError(data.message)
            }
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    },[])

    return (
        <div>
            <div>
                <h4 id='headder'>Raven Livestream User Report Log</h4>
                <Link to='/chat'><button className='btn btn-danger' style={{color:'white'}}>Chat</button></Link>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    
                    <div className='col-sm-12' id='texting-area'>
                    <span style={{color:'red'}}>{error}</span>
                        <div id='message-display'>
                            {
                                reports.map(msg => {
                                    return(
                                        <div key={reports.indexOf(msg)}>
                                            <div id='message-area' style={{borderLeft:'5px solid blue' }}>
                                                <div id='user-time'>
                                                    <span style={{color:'blue'}} >
                                                        {msg.username}
                                                    </span>
                                                    <span>
                                                        {msg.date + ', ' + msg.time}
                                                    </span>
                                                </div>
                                                <div id='message'>
                                                    <span>{msg.reason}</span>
                                                </div>
                                            </div><br/>
                                        </div>
                                    )
                                }).reverse()
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
