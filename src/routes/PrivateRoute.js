import React, {useContext} from "react";
import { Route,Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../Auth";

const PrivateRoute  = ({component: RouteComponent, ...rest}) => {
    
    const {currentUser} = useContext(AuthContext);
   var history = useHistory();
   
    return (
        
<Route
{...rest}
render={routeProps =>
!!currentUser ? (
    <RouteComponent {...routeProps} />
) : (
    <Redirect to={"/signin"+ history.location.pathname} />

)
}
/>

    );
}

export default PrivateRoute;