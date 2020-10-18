import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import SignIn from '../pages/SignIn';
import Index from "../pages/Index"
import Members from '../Members';
import Campaigns from '../pages/Campaigns';
import VideoApp from "../VideoApp";
import CampaignSingle from "../pages/CampaignSingle"
import Wall from "../pages/Wall"
import Profile from "../pages/Profile"
import {AuthProvider} from "../Auth"

const Routes = () => {
    return ( 
    <AuthProvider>
    <Router>
        <div>
        <Route  exact path="/"  component = {Index}/>
        <Route exact path='/members' component={Members}/>
        <Route Route path='/profile' component={Profile}/>
        <Route exact path='/signin' component={SignIn}/>
        <Route exact path='/campaigns' component={Campaigns}/>
        <Route exact path='/viewCampaign/:id' component={CampaignSingle}/>
        <PrivateRoute exact path='/videoGroup/:name' component = {VideoApp}/>
        <Route exact path='/wall/:tag' component = {Wall}/>
        </div>
        </Router>
        </AuthProvider>
    );
}

export default Routes;