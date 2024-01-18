import React from 'react'
import PropTypes from 'prop-types';
import axios, * as others from 'axios';
import { useState,useEffect, useMemo } from "react";
let htmlcomment="";
let datalist=[];
let masterdatalist=[];
let displayfromdate="";
let displaytodate="";
export default function Contentperiod(props) 
{
      let fromdateInput = React.createRef();
      let todateInput = React.createRef();
      let filterbyidinput = React.createRef();
      let filterbynameinput = React.createRef();
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [loginval,setloginval]=useState(0);
      const [error, setError] = useState(null);

      //let columnlist =["Sl.no","Employee ID","Employee Name ","Attendance Status", "Last Punch","Punch timings"];

      function filterbyidorname()
      {
        datalist=masterdatalist;
        htmlcomment="";
        //console.log(filterbyidinput.current.value);
        datalist=datalist.filter((word) => word.employeeid.includes(filterbyidinput.current.value) && word.employeename.toLowerCase().includes(filterbynameinput.current.value.toLowerCase()));
        setloginval(loginval+1);
      }
      
      function displaydate(dateinput)
      {
            //let dateoutput=dateinput.split("-")[2]+"-"+dateinput.split("-")[1]+"-"+dateinput.split("-")[0].slice(-2);
            let dateoutput=dateinput.split("-")[2]+"-"+dateinput.split("-")[1];
            return dateoutput;
      }

      function displayday(dateinput)
      {
            const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            let dateoutput=new Date(dateinput + "T00:00:00");
            return weekday[dateoutput.getDay()]
      } 
      useEffect(() => 
      {
        htmlcomment="";
        setloginval(loginval+1);
            //fetchData(gettodate(),props.passondata);
      }, []);

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

      function getdateindisplayformat(recdate)
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
        //senddate=yyyy+'-'+mm+'-'+dd;
        displaydate=dd+'-'+mm+'-'+yyyy;
        return displaydate;
      }

      function getnextdateinformat(recdate)
      {
        let senddate="";
        recdate.setDate(recdate.getDate() + 1)
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

      function getperioddatabuttonclick()
      {
        let fromdatenew = new Date(fromdateInput.current.value);
        let todatenew = new Date(todateInput.current.value);
        let one_day = 1000*60*60*24;

        if(fromdateInput.current.value=="" || todateInput.current.value=="")
        {
          htmlcomment="Date fields cannot be empty";
          datalist=[];
          masterdatalist=[];
          setloginval(loginval+1);
          setLoading(false);
        }
        else if(fromdateInput.current.value>todateInput.current.value)
        {
          htmlcomment="From-Date cannot be greater than To-Date";
          datalist=[];
          masterdatalist=[];
          setloginval(loginval+1);
          setLoading(false);
        }
        else if(((todatenew.getTime()-fromdatenew.getTime())/one_day)>31)
        {
          htmlcomment="Period sought cannot be greater than 31 days";
          datalist=[];
          masterdatalist=[];
          setloginval(loginval+1);
          setLoading(false);
        }
        else
        {
          //console.log(fromdateInput.current.value-todateInput.current.value);
          htmlcomment="";
          displayfromdate=getdateindisplayformat(fromdatenew);
          displaytodate=getdateindisplayformat(todatenew);
          fetchData(getdateinformat(fromdatenew),getdateinformat(todatenew),getnextdateinformat(todatenew),props.passondata);
        }
        //console.log(getdateinformat(fromdatenew));
        //console.log(getdateinformat(todatenew));
        //console.log(getnextdateinformat(todatenew));
        //console.log("button clicked");
      }
        
      async function fetchData(fromdatereq,todatereq,nexttodatereq,shopreq) 
      {
            try 
            {
              htmlcomment="";
              const data = await axios.get('http://localhost:3001/period/'+fromdatereq+'/'+todatereq+'/'+nexttodatereq+'/'+shopreq);
              datalist= await data.data;
              masterdatalist=datalist;
              setData(data);
              setLoading(false);
            } 
            catch (error) 
            {
              console.log(error);
              setError(error);
              setLoading(false);
            }
      }
      
      if (loading && datalist.length!=0) 
      {
            return (<div>
                  <div class="text-center row">
                        <h1 >Periodic report of {props.passondata} Shop </h1>
                        <br></br>
                        <div class="col col-12 col-md-2"></div>
                          <div class="col col-12 col-md-8">
                            <div class="col col-12 col-md-1"></div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select from date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select to date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> View data </button>
                            </div>
                          </div>
                        <div class="col col-12 col-md-2"></div>

                        <div class="col col-12 col-md-5"></div>
                        <div class="col col-12 col-md-2">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
                        </div>
                        <div class="col col-12 col-md-5"></div>

                  </div>
                  <br></br>
                  <h1 class="text-center row" ></h1>
              </div>);
      }

      if(error)
      {
            return (<div>
                  <div class="text-center row">
                        <h1 >Periodic report of {props.passondata} Shop </h1>
                        <br></br>
                        <div class="col col-12 col-md-2"></div>
                          <div class="col col-12 col-md-8">
                            <div class="col col-12 col-md-1"></div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select from date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select to date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> View data </button>
                            </div>
                          </div>
                        <div class="col col-12 col-md-2"></div>
                  </div>
                  <br></br>
                  <h1 class="text-center row" >Network Error. Contact Administrator</h1>
              </div>);
      }

      if(masterdatalist.length==0)
      {
            return (<div>
                  <div class="text-center row">
                        <h1 >Periodic report of {props.passondata} Shop </h1>
                        <br></br>
                        <div class="col col-12 col-md-2"></div>
                          <div class="col col-12 col-md-8">
                            <div class="col col-12 col-md-1"></div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select from date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select to date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> View data </button>
                            </div>
                          </div>
                        <div class="col col-12 col-md-2"></div>

                        <div class="col col-12 col-md-4"></div>
                        <div class="col col-12 col-md-4">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
                        </div>
                        <div class="col col-12 col-md-4"></div>

                  </div>
              </div>);
      }

      return (
      <div class="text-center row">
            <h1 >Periodic report of {props.passondata} Shop from {displayfromdate} to {displaytodate}</h1>
            <br></br>
                        <div class="col col-12 col-md-2"></div>
                          <div class="col col-12 col-md-8">
                            <div class="col col-12 col-md-1"></div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select from date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <label class="font-size: 2rem" >Select to date: </label>
                            </div>
                            <div class="col col-12 col-md-2">
                              <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                            </div>
                            <div class="col col-12 col-md-2">
                              <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> View data </button>
                            </div>
                          </div>
                        <div class="col col-12 col-md-2"></div>

                        <div class="col col-12 col-md-4"></div>
                        <div class="col col-12 col-md-4">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
                        </div>
                        <div class="col col-12 col-md-4"></div>

                        <div class="row"></div>
            <br></br>
            <br></br>
            <div class="col col-12 col-md-4"></div>
            <div class="col col-12 col-md-2">
              <input type="text"  class="text-center row" className="filterinput" ref={filterbyidinput} onChange={function(){filterbyidorname()}} placeholder="Filter by ID"  style={{width: "10rem"}}/>
            </div>
            <div class="col col-12 col-md-2">
              <input type="text"  class="text-center row" className="filterinput" ref={filterbynameinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Name" style={{width: "12rem"}}/>
            </div>
            <div class="col col-12 col-md-4"></div>
            <br/>
            <br/>
            <br/>
            {datalist.map((val, key) => {return(
            <div className='pagebreak'>
                  <h5>Employee Name : {val.employeename} & Employee ID: {val.employeeid}</h5>
                  <div className="Table">
                        
                        <br/>                      
                        <table>
                              <tr>
                                    {["Data"].concat(datalist[0].punchsets.map(dataItem => { return displaydate(dataItem.date) })).map((val, key) => {return(<th className="thperioddata" key={key}> {val} </th> )})}
                              </tr>
                              <tr>
                                    {["Day"].concat(datalist[0].punchsets.map(dataItem => { return displayday(dataItem.date) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["Shift"].concat(val.punchsets.map(dataItem => { return dataItem.shiftallotted })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["Status"].concat(val.punchsets.map(dataItem => { return dataItem.inference.whetherpresent })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["In punch"].concat(val.punchsets.map(dataItem => { return dataItem.inference.startinpunch.slice(0,5) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["Out punch"].concat(val.punchsets.map(dataItem => { return dataItem.inference.endingpunch.slice(0,5) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["Time Taken"].concat(val.punchsets.map(dataItem => { return parseInt(dataItem.inference.minutestoconsider) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["OT In punch"].concat(val.punchsets.map(dataItem => { return dataItem.inference.OTinpunch.slice(0,5) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["OT Out punch"].concat(val.punchsets.map(dataItem => { return dataItem.inference.OToutpunch.slice(0,5) })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                              <tr>
                                    {["OT Time Taken"].concat(val.punchsets.map(dataItem => { return dataItem.inference.OTdurationinmins })).map((val, key) => {return(<td className="tdperioddata" key={key}> {val} </td> )})}
                              </tr>
                        </table>
                        <br></br>
                  </div>
            </div> )})}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>)
}


