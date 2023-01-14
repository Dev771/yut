import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
import {Typography,Avatar } from 'antd';
const { Title } = Typography;

const Usersapp = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('/api/admin/AllUser')
            .then(response => {
                console.log(response);
                setUser(response.data.data);
            })    
    },[])
    
  return (
    <div className='flex'>
        <div className='Left sidebar'>
            <span>VIEW</span>
                <ul>
                    <li><a href="/Videoview">Video</a></li>
                    <li><a href="/Userview">User</a></li>
                </ul>
            <span>APPROVAL</span>
                <ul>
                    <li><a href="/AppVideo">Video</a></li>
                    <li><a href="/Appuser">User</a></li>
                </ul>
        </div>
        <div className='Right'>
            <Title level={2} > Users Approval</Title>
                <table style={{width:"100%"}}>
                        <tr>
                            <th>Avatar</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                {user.map(a => (
                    <tr>
                        <td><Avatar src={a.image}/></td>
                        <td>{a._id}</td>
                        <td style={{fontWeight:"900"}}>{a.name}</td>
                        <td>{a.email}</td>
                        <td><button>Delete</button></td>
                    </tr>
                    ))}
                </table>
        </div>
    </div>
  )
}

export default Usersapp