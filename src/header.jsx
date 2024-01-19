import React from 'react';
import PropTypes from 'prop-types';

export default function Heading(props) 
{
    //console.log(props);
    //console.log(props.currentpos);
      
    if(props.currentpos==="daily")
    {
      //console.log("changing intention to daily in header");
      return (
        <nav class="navbar navbar-default header">
        <div class="container-fluid">
          <div class="navbar-header">
            <p class="navbar-brand">SRLearn Mobile Application Administrator Module</p>
          </div>
          <ul class="nav navbar-nav pull-right">
            <li><button class="btn navbar-btn navbarbuttoncust" onClick={function(){props.onnavbuttonclickperiod()}}>Manage Courses</button></li>
            <li><button class="btn navbar-btn navbarbuttoncust" onClick={function(){props.onnavbuttonclicklogout()}}>Logout</button></li>
          </ul>     
        </div>
      </nav>
      );
    }
    if(props.currentpos==="period")
    {
      //console.log("changing intention to period in header");
      return (
        <nav class="navbar navbar-default header">
        <div class="container-fluid">
          <div class="navbar-header">
            <p class="navbar-brand">SRLearn Mobile Application Administrator Module</p>
          </div>
          <ul class="nav navbar-nav pull-right">
            <li><button class="btn navbar-btn navbarbuttoncust" onClick={function(){props.onnavbuttonclickdaily()}}>Manage Users</button></li>
            <li><button class="btn navbar-btn navbarbuttoncust" onClick={function(){props.onnavbuttonclicklogout()}}>Logout</button></li>
          </ul>     
        </div>
      </nav>
      );
    }
    if(props.currentpos==="login")
    {
      //console.log("changing intention to login in header");
      return (
        <nav class="navbar navbar-default header">
        <div class="container-fluid">
          <div class="navbar-header">
            <p class="navbar-brand">SRLearn Mobile Application Administrator Module</p>
          </div>
        </div>
      </nav>
      );
    }
}
