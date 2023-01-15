import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
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
                    <th>Author</th>
                    {/* <th>Description</th> */}
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
                        <td style={{fontWeight:"900"}}>{a.writer.name}</td>
                        {/* <td>{a.email}</td> */}
                        <td><button onClick={() => handleClick(a, 'approve')}>Approve</button>  / <button onClick={() => handleClick(a, 'reject')}>Reject</button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Videoapp