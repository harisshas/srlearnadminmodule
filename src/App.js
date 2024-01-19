import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Heading from "./header.jsx";
import Footing from "./footer.jsx";
import Contentlogin from "./logincontent.jsx";
import Contentusers from "./contentusers.jsx";
import Contentperiod from "./periodiccontent.jsx";
import Contentshiftallot from "./shiftallotcontent.jsx";

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
  function navbuttonclickshiftallot()
  {
    //console.log("logout button clicked");
    changeintention("shiftallot",passondetails);
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
          <Heading currentpos="daily" onnavbuttonclickshiftallot={navbuttonclickshiftallot}  onnavbuttonclicklogout={navbuttonclicklogout} onnavbuttonclickperiod={navbuttonclickperiod}/>
          <Contentusers passondata={passondetails} changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
  else if(intention=="period")
  {
    return (
      <div class="container">
          <Heading currentpos="period" onnavbuttonclickshiftallot={navbuttonclickshiftallot} onnavbuttonclicklogout={navbuttonclicklogout} onnavbuttonclickdaily={navbuttonclickdaily}/>
          <Contentperiod passondata={passondetails} changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
  else if(intention=="shiftallot")
  {
    return (
      <div class="container">
          <Heading currentpos="shiftallot" onnavbuttonclicklogout={navbuttonclicklogout} onnavbuttonclickperiod={navbuttonclickperiod} onnavbuttonclickdaily={navbuttonclickdaily}/>
          <Contentshiftallot passondata={passondetails} changeintention={changeintention}/>
          <Footing />
        </div>
    );
  }
  
}

export default App;