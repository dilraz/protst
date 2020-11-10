import React, {useContext} from "react";
import { Route,Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../Auth";
import fire from "../fire"

const PrivateRoute  = ({component: RouteComponent, ...rest}) => {
    
    const {currentUser} = useContext(AuthContext);
   var history = useHistory();
   var isLogged = localStorage.getItem("isThere");
  //console.log(isLogged)

   
    

//console.log("path",history.location.pathname)
if((history.location.pathname.includes("/profile") && isLogged == null) ||(history.location.pathname.includes("/viewProfile") && isLogged == null) || (history.location.pathname.includes("/editCampaign") && isLogged == null)  || (history.location.pathname.includes("/editThread") && isLogged == null) || (history.location.pathname.includes("/createThread") && isLogged == null) || (history.location.pathname.includes("/createCampaign") && isLogged == null) || (history.location.pathname.includes("/viewCampaign") && isLogged == null) 
|| (history.location.pathname.includes("/videoGroup") && isLogged == null) || (history.location.pathname.includes("/thread") && isLogged == null))
{
    return(
    <Redirect to={"/signin"+ history.location.pathname} />
)

}else{
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
}

export default PrivateRoute;