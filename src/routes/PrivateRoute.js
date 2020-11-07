import React, {useContext} from "react";
import { Route,Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../Auth";
import fire from "../fire"

const PrivateRoute  = ({component: RouteComponent, ...rest}) => {
    
    const {currentUser} = useContext(AuthContext);
   var history = useHistory();
   var isLogged;
   fire.auth().onAuthStateChanged(
    function(user)
    {
        if(user)
        {
           
            isLogged="y";
           // console.log(isLogged);
        }else{
          
          isLogged="n";
         // console.log(isLogged);
        }
    });

    if(isLogged ="y"){
    return (
        
<Route
{...rest}
render={routeProps =>
!!currentUser  ? (
    <RouteComponent {...routeProps} />
) : (
     null
    //

)
}

/>
    

    );
}

if(isLogged == "n")
{
    return(
    <Redirect to={"/signin"+ history.location.pathname} />
)
}
}

export default PrivateRoute;