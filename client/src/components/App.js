import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
// import AdminPage from './Admin/AdminMainPage';
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage"
import DetailVideoPage from "./views/DetailVideoPage/DetailVideoPage"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"
import AllVideos from './views/Allvideos/AllVideos';
import Usersapp from './Admin/Approve/Usersapp';
import Videoapp from './Admin/Approve/Videoapp';
import ViewVideo from './Admin/View/viewVideo';
import Viewuser from './Admin/View/Viewuser';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/Allvideos" component={Auth(AllVideos, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
          {/* <Route exact path='/Admin123' component={Auth(AdminPage, null)} /> */}
          <Route exact path='/Userview' component={Auth(Viewuser, true)} />
          <Route exact path='/Videoview' component={Auth(ViewVideo, true)} />
          <Route exact path='/Appuser' component={Auth(Usersapp, true)} />
          <Route exact path='/AppVideo' component={Auth(Videoapp, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
