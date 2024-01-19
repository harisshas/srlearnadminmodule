import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Heading from "./header.jsx";
import Footing from "./footer.jsx";
import Contentlogin from "./logincontent.jsx";
import Contentusers from "./contentusers.jsx";
import Contentcourses from "./contentcourses.jsx";

var passondetails={};

function App() 
{
  const  [intention, setintention] = useState("login");
  const [intentioncount, setintentioncount] = useState(0);

  function changeintention(value1,value2)
  {
    //console.log("intention set to:",value1);
    //console.log("intention values:",value2);
    passondetails=value2;
    setintention(value1);
    setintentioncount(intentioncount+1);
  }
  function navbuttonclicklogout()
  {
    //console.log("logout button clicked");
    changeintention("login",null);
  }
  function navbuttonclickperiod()
  {
    //console.log("logout button clicked");
    changeintention("period",passondetails);
  }
  function navbuttonclickdaily()
  {
    //console.log("logout button clicked");
    changeintention("users",passondetails);
  }
  if(intention=="login")
  {
    return (
      <div class="container">
          <Heading currentpos="login"/>
          <Contentlogin changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
  else if(intention=="users")
  {
    return (
      <div class="container">
          <Heading currentpos="daily" onnavbuttonclicklogout={navbuttonclicklogout} onnavbuttonclickperiod={navbuttonclickperiod}/>
          <Contentusers passondata={passondetails} changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
  else if(intention=="period")
  {
    return (
      <div class="container">
          <Heading currentpos="period" onnavbuttonclicklogout={navbuttonclicklogout} onnavbuttonclickdaily={navbuttonclickdaily}/>
          <Contentcourses passondata={passondetails} changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
 
}

export default App;