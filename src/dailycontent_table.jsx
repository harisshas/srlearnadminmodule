import React from 'react'
import PropTypes from 'prop-types';
import axios, * as others from 'axios';
import { useState,useEffect } from "react";
import { wait } from '@testing-library/user-event/dist/utils';
//let datalist=[];
let displaydate="";
let htmlcomment="";
let sortkey={text:"",slno:"▲",employeeid:"♢",employeename:"♢",attendancestatus:"♢",lastpunch:"♢",punchtimings:"♢"};
export default function Contentdaily(props) 
{
  let fromdateInput = React.createRef();
  let madeinitialcall=0;
  const [loginval,setloginval]=useState(0);
  const [datalist,setdatalist]=useState([]);
      //console.log(props.passondata);

      async function getdailydatafrombackend(datereq,shopreq)
      {
        console.log("calling "+loginval);
        // axios.get('http://192.168.236.46:3001/daily/'+datereq+'/'+shopreq).then((response) => 
        // {
        //   //console.log(response.data);
        //   console.log("calling from inside "+loginval);
        //   datalist=response.data;
        //   sortkey={text:"slno ASC",slno:"▲",employeeid:"♢",employeename:"♢",attendancestatus:"♢",lastpunch:"♢",punchtimings:"♢"};
        //   setloginval(loginval+1);
        // });
        let response=await axios.get('http://192.168.236.46:3001/daily/'+datereq+'/'+shopreq);
        let datalisttemp= await response.data;
        setdatalist(datalisttemp);
        
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
      
      function sortbycolumn(sortColumn)
      {
        if(sortkey.text.includes("ASC") && sortkey.text.includes(sortColumn))
        {
          let datalisttemp=datalist;
          datalisttemp.sort(function(a,b){ var x = a[sortColumn] > b[sortColumn]? -1:1; return x; }); // descending order
          sortkey={text:"",slno:"♢",employeeid:"♢",employeename:"♢",attendancestatus:"♢",lastpunch:"♢",punchtimings:"♢"};
          sortkey.text=sortColumn+" DESC";
          sortkey[sortColumn]="▼";

        }
        else
        {
          datalist.sort(function(a,b){ var x = a[sortColumn] < b[sortColumn]? -1:1; return x; }); // ascending order
          sortkey={text:"",slno:"♢",employeeid:"♢",employeename:"♢",attendancestatus:"♢",lastpunch:"♢",punchtimings:"♢"};
          sortkey.text=sortColumn+" ASC";
          sortkey[sortColumn]="▲";
        }
        
        setloginval(loginval+1);
      }
   

      console.log(datalist);
      console.log(loginval);
      console.log(madeinitialcall);
      if(loginval==0 && madeinitialcall==0)
      {
        console.log("calling from outside "+loginval);
        madeinitialcall=1;
        getdailydatafrombackend(gettodaysdate(),props.passondata);
        
      }
      
      return (<div>
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
        <div className="Table">
            <table>
                <tr>
                    <th onClick={function(){sortbycolumn("slno")}}>Sl.no {sortkey.slno}</th>
                    <th onClick={function(){sortbycolumn("employeeid")}}>Employee ID {sortkey.employeeid}</th>
                    <th onClick={function(){sortbycolumn("employeename")}}>Employee Name {sortkey.employeename}</th>
                    <th onClick={function(){sortbycolumn("attendancestatus")}}>Attendance Status {sortkey.attendancestatus}</th>
                    <th onClick={function(){sortbycolumn("lastpunch")}}>Last Punch {sortkey.lastpunch}</th>
                    <th onClick={function(){sortbycolumn("punchtimings")}}>Punch timings {sortkey.punchtimings}</th>
                </tr>
                {datalist.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.slno}</td>
                            <td>{val.employeeid}</td>
                            <td>{val.employeename}</td>
                            <td>{val.attendancestatus}</td>
                            <td>{val.lastpunch}</td>
                            <td>{val.punchtimings}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    </div>);
}

