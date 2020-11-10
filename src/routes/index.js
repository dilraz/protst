import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from "../Auth";
import Members from '../Members';
import Campaigns from '../pages/Campaigns';
import CampaignSingle from "../pages/CampaignSingle";
import Index from "../pages/Index";
import Profile from "../pages/Profile";
import SignIn from '../pages/SignIn';
import Thread from "../pages/Thread";
import VideoApp from "../VideoApp";
import About from "../pages/About"
import PrivateRoute from "./PrivateRoute";
import CreateCampaign from "../pages/CreateCampaign"
import CreateThread from '../pages/CreateThread';
import EditCampaign from '../pages/EditCampaign';
import ViewProfile from "../pages/ViewProfile"
import EditThread from '../pages/EditThread';

const Routes = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path="/" component={Index} />
                    <PrivateRoute exact path='/profile' component={Profile} />
                    <Route path='/signin/:next' component={SignIn} />
                    <Route path='/login' component={SignIn} />
                    <Route path='/about' component={About} />
                    <Route exact path='/campaigns' component={Campaigns} />
                    <PrivateRoute exact path='/viewCampaign/:id' component={CampaignSingle} />
                    <PrivateRoute exact path='/createThread/:camp' component={CreateThread} />
                    <PrivateRoute exact path='/editThread/:cid/:tid' component={EditThread} />
                    <PrivateRoute exact path='/editCampaign/:cid' component={EditCampaign} />
                    <PrivateRoute exact path='/viewProfile/:user' component={ViewProfile} />
                    <PrivateRoute exact path='/videoGroup/:name' component={VideoApp} />
                    <PrivateRoute exact path="/createCampaign" component={CreateCampaign}/>
                    <PrivateRoute exact path='/thread/:camp/:thread' component={Thread} />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default Routes;