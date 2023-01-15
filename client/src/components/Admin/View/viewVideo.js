import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
import {Typography } from 'antd';
import AdminMainPage from '../AdminMainPage';
import moment from 'moment';
const { Title } = Typography;

const Videoapp = (props) => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const handleClick = (video) =>{

        axios.delete('/api/admin/deleteVideo', { data: {_id: video._id}})
        .then(response => {
            if(response.data.status === 'Success') {
                window.location.reload()
            } else {
                alert(response.data.message)
            }
        })
    }


  return (
    <div className='flex'>
        <AdminMainPage props={props} />
        <div className='Right'>
             <Title level={2} > All Video  </Title>
                <table style={{width:"100%"}}>
                    <tr>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Views</th>
                    <th>Duration</th>
                    <th>Author</th>
                    <th>Author Email</th>
                    <th>Author ID</th>
                    <th>Remove Video</th>
                    </tr>
                    {videos.map(a => (
                    <tr>
                        <td>{a.title}</td>
                        <td>
                            <a href={`/video/${a._id}`}>
                                <img style={{ width: '7em',borderRadius: "5%", height:"4em" }} alt="thumbnail" src={`http://localhost:5000/${a.thumbnail}`} />
                            </a>
                        </td>
                        <td>{moment(a.createdAt).format("MMM Do YY")}</td>
                        <td>{a.description}</td>
                        <td>{a.views}</td>
                        <td>{a.duration}</td>
                        <td style={{fontWeight:"900"}}>{a.writer.name}</td>
                        <td>{a.writer.email}</td>
                        <td>{a.writer._id}</td>
                        <td><button className='button cancel' onClick={() => handleClick(a)}>Delete</button></td>
                    </tr>
                    ))}
                </table>
        </div>
    </div>
  )
}

export default Videoapp