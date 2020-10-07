import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Index from "../pages/Index"
import Members from '../pages/Members';
import Campaigns from '../pages/Campaigns'

export default function Routes() {
    return ( <Switch>
        <Route path="/" exact component = {Index}/>
        <Route path='/members' component={Members}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/campaigns' component={Campaigns}/>
        <Route component={SignIn} />
        </Switch>
    );
}