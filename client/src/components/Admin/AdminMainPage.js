import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

const AdminMainPage = (props) => {

    // let user = useSelector(state => state.user);

    useEffect(() => {
        // console.log(props)
        if(props.props.user.userData && props.props.user.userData.type !== 'Admin') {
            // alert(user.type)
            props.props.history.push("/")
        }
    },[props])

  return (
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
  )
}

export default AdminMainPage