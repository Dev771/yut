import React, { useEffect, useState } from 'react';
import '../AdminMainPage.css';
import axios from 'axios';
import {Typography } from 'antd';
const { Title } = Typography;

const Videoapp = () => {

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
             <Title level={2} > All Video  </Title>
                <table style={{width:"100%"}}>
                    <tr>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Author</th>
                    <th>Description</th>
                    </tr>
                    {videos.map(a => (
                    <tr>
                        <td>{a.title}</td>
                        <td>
                            <a href={`/video/${a._id}`}>
                                <img style={{ width: '7em',borderRadius: "5%", height:"4em" }} alt="thumbnail" src={`http://localhost:5000/${a.thumbnail}`} />
                            </a>
                        </td>
                        <td style={{fontWeight:"900"}}>{a.writer.name}</td>
                        <td>{a.email}</td>
                    </tr>
                    ))}
                </table>
        </div>
    </div>
  )
}

export default Videoapp