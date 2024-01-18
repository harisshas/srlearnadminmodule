import React from 'react'
import PropTypes from 'prop-types';
import axios, * as others from 'axios';
import { useState,useEffect } from "react";

let htmlcomment="";
let userdatapasson={};
export default function Contentlogin(props) 
{
  let passwordInput = React.createRef();
  const [loginval,setloginval]=useState(0);

  async function fetchData() 
  {
    try 
    {
      const data = await axios.get('https://srlearnapi.onrender.com/login/now/admin/'+passwordInput.current.value);
      const datalist= await data.data;
      if(datalist.length==0)
      {
        htmlcomment="Entered credentials are incorrect";
        setloginval(1);
        //console.log(loginval);
      }
      else
      {
        //htmlcomment="credentials are correct";
        htmlcomment=""
        props.changeintention("users","");
        userdatapasson=datalist[0];
        setloginval(2);
        //console.log(loginval);
      }
    } 
    catch (error) 
    {
    }
  }

  function buttclick()
  {
     //console.log("username current value:"+usernameInput.current.value);
    if(passwordInput.current.value=="")
    {
      htmlcomment="Password not entered";
      setloginval(4);
    }
    else
    {
      fetchData();
      /*
      try 
      {
        axios.get('https://srlearnapi.onreader.com/login/now/admin/'+passwordInput.current.value).then((response) => 
        {
          console.log(response.data);

          
          if(response.data==false)
          {
            htmlcomment="Entered credentials are incorrect";
            setloginval(1);
            //console.log(loginval);
          }
          else
          {
            //htmlcomment="credentials are correct";
            htmlcomment=""
            props.changeintention("daily",response.data);
            userdatapasson=response.data;
            setloginval(2);
            //console.log(loginval);
          }
          
        });  
      } 
      catch (error) 
      {
        
      }
      */
    }
    
  }

    return (
      <div class="text-center row">
        <div class="col col-12 col-md-4"></div>
        <div class="col col-12 col-md-4">
             <img src="/indian-railways-logo.jpg" alt="" ></img>
            <h1 class="h3 mb-3 fw-normal">Please enter administrator credentials</h1>
             <br></br>
              <div class="form-floating">
                <input ref={passwordInput} type="password" class="form-control bottomrow" id="floatingPassword" name="passwd" placeholder="enter password here"></input>
              </div>

            <br></br>
            <button class="w-100 btn btn-lg btn-primary" onClick={buttclick} type="submit">Sign in</button>
            <br></br>
            <br></br>
            <p class="text-center row" className="commentpar">{htmlcomment}</p>
        </div>
        <br></br>
        <br></br>
        <div class="col col-12 col-md-4"></div>
      </div>)
}
Contentlogin.propTypes = 
{
  setToken: PropTypes.func.isRequired
};
