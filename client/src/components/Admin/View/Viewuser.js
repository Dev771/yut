import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
import {Typography,Avatar } from 'antd';
import AdminMainPage from '../AdminMainPage';
const { Title } = Typography;

const Usersapp = (props) => {

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
        <AdminMainPage props={props} />
        <div className='Right'>
        <Title level={2} > All Users </Title>
            <table style={{width:"100%"}}>
                    <tr>
                        <th>Avatar</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
            {user.map(a => (
                <tr>
                    <td><Avatar src={a.image}/></td>
                    <td>{a._id}</td>
                    <td style={{fontWeight:"900"}}>{a.name}</td>
                    <td>{a.email}</td>
                </tr>
                ))}
            </table>
        </div>
    </div>
  )
}

export default Usersapp