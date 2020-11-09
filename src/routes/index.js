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
import PrivateRoute from "./PrivateRoute";
import CreateCampaign from "../pages/CreateCampaign"
const Routes = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path="/" component={Index} />
                    <Route exact path='/members' component={Members} />
                    <PrivateRoute exact path='/profile' component={Profile} />
                    <Route path='/signin/:next' component={SignIn} />
                    <Route path='/login' component={SignIn} />
                    <Route exact path='/campaigns' component={Campaigns} />
                    <PrivateRoute exact path='/viewCampaign/:id' component={CampaignSingle} />
                    <Route exact path='/videoGroup/:name' component={VideoApp} />
                    <Route exact path="/createCampaign" component={CreateCampaign}/>
                    <Route exact path='/thread/:camp/:thread' component={Thread} />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default Routes;