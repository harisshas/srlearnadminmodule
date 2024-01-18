import React from 'react'
import PropTypes from 'prop-types';
import axios, * as others from 'axios';
import { useState,useEffect } from "react";
let datalist=[];
let displaydate="";
let htmlcomment="";
export default function Contentdaily(props) 
{
  let fromdateInput = React.createRef();
  const [loginval,setloginval]=useState(0);
      //console.log(props.passondata);
      function getdailydatafrombackend(datereq,shopreq)
      {
        console.log("calling");
        axios.get('http://localhost:3001/daily/'+datereq+'/'+shopreq).then((response) => 
        {
          //console.log(response.data);
          datalist=response.data;
          setloginval(loginval+1);
        });
      }
      function getperioddatabuttonclick()
      {
        let fromdatenew = new Date(fromdateInput.current.value);
        //console.log("button clicked");
        getdailydatafrombackend(getdateinformat(fromdatenew),props.passondata)
        //console.log(fromdatenew.getDate());
      }
      function getdateinformat(recdate)
      {
        let senddate="";
        let dd=recdate.getDate();
        let mm=recdate.getMonth()+1;
        let yyyy=recdate.getFullYear();
        if(dd<10)
        {
          dd='0'+dd;
        }
        if(mm<10)
        {
          mm='0'+mm;
        }
        //2023-10-14
        senddate=yyyy+'-'+mm+'-'+dd;
        displaydate=dd+'-'+mm+'-'+yyyy;
        return senddate;
      }
      function gettodaysdate()
      {
        let today=new Date();
        let dd=today.getDate();
        let mm=today.getMonth()+1;
        let yyyy=today.getFullYear();
        if(dd<10)
        {
          dd='0'+dd;
        }
        if(mm<10)
        {
          mm='0'+mm;
        }
        //2023-10-14
        today=yyyy+'-'+mm+'-'+dd;
        displaydate=dd+'-'+mm+'-'+yyyy;
        return today;
      }
      function createrow(datain,index)
      {
      if(index==0)
      {
      return (
        <div>
              <div class="text-center row">
                    <h1 >Day wise report of {props.passondata} Shop for {displaydate}</h1>
                    <br></br>
                    <div class="col col-12 col-md-4"></div>
                      <div class="col col-12 col-md-4">
                      
                        <div class="col col-12 col-md-4">
                          <label class="datepickerlabel" >Select date: </label>
                        </div>
                        <div class="col col-12 col-md-4">
                          <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                        </div>
                        <div class="col col-12 col-md-4">
                          <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> View data </button>
                        </div>
                      
                      </div>
                    <div class="col col-12 col-md-4"></div>
              </div>
              <br></br>
             <div align="" class="text-center row">
                <div class="col col-1 col-md-1">
                  <h4><b> Sl No </b></h4>
                </div>
                <div class="col col-2 col-md-2">
                  <h4 class="unitname"><b> Employee ID </b></h4>
                </div>
                <div class="col col-3 col-md-2">
                  <h4 class="unitname"><b> Employee Name </b></h4>
                </div>
                <div class="col col-3 col-md-2">
                  <h4 class="unitname"><b> Attendance Status </b></h4>
                </div>
                <div class="col col-2 col-md-2">
                  <h4 class="unitname"><b> Last punch </b></h4>
                </div>
                <div class="col col-4 col-md-3">
                  <h4 class="unitname"><b> Punch logs </b></h4>
                </div>
             </div>
             <div align="" class="text-center row">
                <div class="col col-1 col-md-1">
                  <h4> {datain.slno} </h4>
                </div>
                <div class="col col-2 col-md-2">
                  <h4 class="unitname"> {datain.employeeid} </h4>
                </div>
                <div class="col col-3 col-md-2">
                  <h4 class="unitname"> {datain.employeename} </h4>
                </div>
                <div class="col col-2 col-md-2">
                  <h4 class="unitname"> {datain.attendancestatus} </h4>
                </div>
                <div class="col col-2 col-md-2">
                  <h4 class="unitname"> {datain.lastpunch} </h4>
                </div>
                <div class="col col-4 col-md-3">
                  <h4 class="unitname"> {datain.punchtimings} </h4>
                </div>
 
               </div>
          </div>);
      }
      return (<div align="" class="text-center row">
      <div class="col col-12 col-md-1">
        <h4> {datain.slno} </h4>
      </div>
      <div class="col col-2 col-md-2">
        <h4 class="unitname"> {datain.employeeid} </h4>
      </div>
      <div class="col col-3 col-md-2">
        <h4 class="unitname"> {datain.employeename} </h4>
      </div>
      <div class="col col-2 col-md-2">
         <h4 class="unitname"> {datain.attendancestatus} </h4>
      </div>
      <div class="col col-2 col-md-2">
        <h4 class="unitname"> {datain.lastpunch} </h4>
      </div>
      <div class="col col-4 col-md-3">
        <h4 class="unitname"> {datain.punchtimings} </h4>
      </div>
 
     </div>);
      }
      if(loginval==0)
      {
         getdailydatafrombackend(gettodaysdate(),props.passondata);
        
      }
      
      return (<div>
            {datalist.map(createrow)}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>);
}

