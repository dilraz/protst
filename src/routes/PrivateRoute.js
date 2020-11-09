import React, {useContext} from "react";
import { Route,Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../Auth";
import fire from "../fire"

const PrivateRoute  = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
   var history = useHistory();
   var isLogged;
  return(
<Route
{...rest}
render={routeProps =>
!!currentUser  ? (
    <RouteComponent {...routeProps} />
) : (
    <Redirect to={"/signin"+ history.location.pathname} />
    

)
}

/>
    

    );


   

}

export default PrivateRoute;