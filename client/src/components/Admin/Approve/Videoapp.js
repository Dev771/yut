import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
import moment from 'moment';
import {Typography } from 'antd';
import AdminMainPage from '../AdminMainPage';
// import { useNavigate } from 'react-router-dom'
const { Title } = Typography;

const Videoapp = (props) => {

    const [videos, setVideos] = useState([]);
    // const navigate = useNavigate();

    const handleClick = (video, Condition) => {
        
        Condition === 'approve' ? (
            axios.post('/api/admin/videoApproved', { _id: video._id })
                .then(response => {
                    if(response.data.status === "Success") {
                        window.location.reload()
                    } else {
                        alert(response.data.message)
                    }
                })
        ) : (
            axios.delete('/api/admin/deleteVideo', { data: {_id: video._id}})
                .then(response => {
                    if(response.data.status === 'Success') {
                        window.location.reload()
                    } else {
                        alert(response.data.message)
                    }
                })
        )
        
    }

    useEffect(() => {
        axios.get('/api/admin/getVideosforApproval')
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

  return (
    <div className='flex'>
        <AdminMainPage props={props} />
        <div className='Right'>
             <Title level={2} > Video Approval </Title>
                <table style={{width:"100%"}}>
                    <tbody>
                    <tr>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Author</th>
                    <th>Author Email</th>
                    <th>Author ID</th>
                    <th>Action</th>  
                    </tr>
                    {videos.map((a, i) => (
                    <tr key={i}>
                        <td>{a.title}</td>
                        <td>
                            <a href={`/video/${a._id}`}>
                                <img style={{ width: '7em',borderRadius: "5%", height:"4em" }} alt="thumbnail" src={`http://localhost:5000/${a.thumbnail}`} />
                            </a>
                        </td>
                        <td>{moment(a.createdAt).format("MMM Do YY")}</td>
                        <td>{a.description}</td>
                        <td>{a.duration}</td>
                        <td style={{fontWeight:"900"}}>{a.writer.name}</td>
                        <td>{a.writer.email}</td>
                        <td>{a.writer._id}</td>
                        <td><button className='button approve' onClick={() => handleClick(a, 'approve')}>Approve</button>   
                        <button className='button cancel' onClick={() => handleClick(a, 'reject')}>Reject</button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Videoapp