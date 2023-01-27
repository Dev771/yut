import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import "../LandingPage/landingpage.css";
const { Title } = Typography;
const { Meta } = Card;
function AllVideos() {

    const [Videos, setVideos] = useState([])
    const [tag, setTag] = useState([])

    useEffect(() => {
        axios.get(`/api/video/getVideos/${tag}`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [tag])






    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`}>
                <div className='aspect'>
                    <img style={{ width: '100%',borderRadius: "5%", height:"100%" }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                </div>
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} 
                    sx={{ width: 150, height: 150 }}
                    />
                }
                title={video.title}
            />
            <span style={{fontWeight : "900"}}>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    const handleClick = (type) =>{
        setTag(type)

    } 

    return (
        <div style={{ width: '85%', margin: '1.5rem auto' }}>
            <div className='headings'>
            <Title level={2} className="title" >All videos</Title> 
            <a onClick={() => handleClick("JavaScript")}> JavaScript</a>
            <a onClick={() => handleClick("C")}> C</a>
            <a onClick={() => handleClick("C++")}> C++</a>
            <a onClick={() => handleClick("HTML")}> HTML</a>
            <a onClick={() => handleClick("CSS")}> CSS</a>
            <a onClick={() => handleClick("Python")}> Python</a>
            <a onClick={() => handleClick(" ")}>Others</a>
            </div>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default AllVideos
