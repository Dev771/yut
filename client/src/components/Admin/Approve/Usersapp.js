import React, { useEffect, useState } from 'react';
// import  DeleteOutlined  from '@ant-design/icons';
import '../AdminMainPage.css';
import axios from 'axios';
import {Typography,Avatar,Icon } from 'antd';
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
    },[]);

    const handleClick1 = (user, cond) => {
        axios.post(`/api/admin/AppUser`, {data: user, cond})
            .then(response => {
                if(response.data.status === 'Error') {
                    alert(response.data.message)
                } else {
                    window.location.reload()
                }
            })
    }

    const handleClick = (user) => {
        axios.delete(`/api/admin/deleteUser`, {data: user})
            .then(response => {
                if(response.data.status === 'Error') {
                    alert(response.data.message)
                } else {
                    window.location.reload()
                }
            })
    }
    
  return (
    <div className='flex'>
        <AdminMainPage props={props} />
        <div className='Right'>
            <Title level={2} > Users Approval</Title>
                <table style={{width:"100%"}}>
                        <tr>
                            <th>Avatar</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>User Type</th>
                            <th>Action</th>
                        </tr>
                {user.map(a => (
                    <tr>
                        <td><Avatar src={a.image}/></td>
                        <td>{a._id}</td>
                        <td style={{fontWeight:"900"}}>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.type}</td>
                        <td>
                            {a.type === 'User' ?  (
                                <button className='button approve' onClick={() => handleClick1(a, 'approve')}>
                                    <div>
                                        <Icon type="check" />
                                        <span>Approve</span>
                                    </div>
                                </button>   
                            ) : (
                                <button className='button cancel' onClick={() => handleClick1(a, 'reject')}>
                                    <div>
                                        <Icon type="close" />
                                        <span>Remove Admin</span>
                                    </div>
                                </button>
                            )} 
                        </td>
                        <td>
                        {
                            a.type === 'User' ? (
                                <button className='button cancel' onClick={() => handleClick(a)}>
                                    <div>
                                        <Icon type="delete" />
                                        <span>
                                            Delete
                                        </span>
                                    </div>
                                </button>
                            ) : (
                                <button className='button admin'>Can not Delete</button>
                            )
                        }
                          
                        </td>
                    </tr>
                    ))}
                </table>
        </div>
    </div>
  )
}

export default Usersapp