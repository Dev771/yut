import React, { useEffect } from 'react';
import './AdminMainPage.css';
import axios from 'axios';

const AdminMainPage = () => {

    useEffect(() => {
        axios.get('/api/admin/AllUser')
            .then(response => {
                console.log(response);
            })    
    },[])

    return (
        <div className='flex'>
            <div className='Left'>
                Left
            </div>
            <div className='Right'>
                Right
            </div>
        </div>
    )
}

export default AdminMainPage