import React from 'react'
import PropTypes from 'prop-types';
import axios, * as others from 'axios';
import { useState,useEffect, useMemo } from "react";


let sortkey={text:"",slno:"▲",coursename:"♢",videolink:"♢",coursedescription:"♢",update:"♢"};
let datalist=[];
let masterdatalist=[];

let htmlcomment="";
let tempcoursename="";
let tempvideolink="";
let tempcoursedescription="";

let keyselected;

let displaydate="";

let mode="Create";

function Contentcourses(props) 
{
  let coursenameInput = React.createRef();
  let videolinkInput = React.createRef();
  let coursedescriptionInput = React.createRef();

  let filterbycoursenameinput = React.createRef();
  let filterbycoursecontentinput = React.createRef();
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginval,setloginval]=useState(0);
  const [error, setError] = useState(null);
  
  useEffect(() => 
  {
     fetchData(gettodaysdate(),props.passondata);
  }, []);

  async function fetchData() 
  {
    try 
    {
      const data = await axios.get('https://srlearnapi.onrender.com/courselist');
      datalist= await data.data;
      for(let i=0;i<datalist.length;i++)
      {
        datalist[i].slno=i+1;
      }
      //console.log(datalist);
      masterdatalist=datalist;
      setData(data);
      setLoading(false);
    } 
    catch (error) 
    {
      setError(error);
      setLoading(false);
    }
  }
  
  async function updatecourseinfo(courseid) 
  {
    try 
    {
      ///updatecourse/:courseidentered/:coursenameentered/:videolinkentered/:descentered
      const dataresp = await axios.get('https://srlearnapi.onrender.com/updatecourse/'+courseid+'/'+coursenameInput.current.value+'/'+videolinkInput.current.value+'/'+coursedescriptionInput.current.value);
      const datarespval= await dataresp.data;
      htmlcomment="Course updated successfully";
      tempcoursename="";
      tempvideolink="";
      tempcoursedescription="";
      mode="Create";
      fetchData();
    } 
    catch (error) 
    {
        setError(error);
        setLoading(false);
    }
  }

  async function createcourse() 
  {
    try 
    {
      // /createcourse/:coursenameentered/:videolinkentered/:descentered
      const dataresp = await axios.get('https://srlearnapi.onrender.com/createcourse/'+coursenameInput.current.value+'/'+videolinkInput.current.value+'/'+coursedescriptionInput.current.value);
      const datarespval= await dataresp.data;
      htmlcomment="Course created successfully";
      tempcoursename="";
      tempvideolink="";
      tempcoursedescription="";
      mode="Create";
      fetchData();
    } 
    catch (error) 
    {
        setError(error);
        setLoading(false);
    }
  }
  
    function oninputchange()
    {
      //console.log(coursedescriptionInput.current.value);
      tempcoursename=coursenameInput.current.value;
      tempvideolink=videolinkInput.current.value;
      tempcoursedescription=coursedescriptionInput.current.value;
      setloginval(loginval+1);
    }

  
    function updatcoursebuttonclick(key)
    {
      //console.log(masterdatalist[key-1]);

      tempcoursename=masterdatalist[key-1].coursename;
      tempvideolink=masterdatalist[key-1].videolink;
      tempcoursedescription=masterdatalist[key-1].description;

      keyselected=key;
      mode="Update";
      setloginval(loginval+1);
    }

    function updatecoursedetailsbuttonclick()
    {
      //console.log("keyselected: "+keyselected);
      //console.log(masterdatalist[keyselected-1]);
      if(mode=="Update")
      {
        updatecourseinfo(masterdatalist[keyselected-1]._id);
      }
      else if(mode=="Create")
      {
        createcourse();
      }
      
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
      function filterbyidorname()
      {
        datalist=masterdatalist;
        //console.log(filterbyidinput.current.value);
        //datalist=datalist.filter((word) => word.coursename.includes(filterbycoursenameinput.current.value));
        datalist=datalist.filter((word) => word.coursename.includes(filterbycoursenameinput.current.value) && word.description.toLowerCase().includes(filterbycoursecontentinput.current.value.toLowerCase()));
        datalist.sort(function(a,b){ var x = a.slno < b.slno? -1:1; return x; }); // ascending order
        let sortkey={text:"",slno:"▲",coursename:"♢",videolink:"♢",coursedescription:"♢",update:"♢"};
        sortkey.text="slno"+" ASC";
        setloginval(loginval+1);
      }
      
      function sortbycolumn(sortColumn)
      {
        
        if(sortkey.text.includes("ASC") && sortkey.text.includes(sortColumn))
        {
          datalist.sort(function(a,b){ var x = a[sortColumn] > b[sortColumn]? -1:1; return x; }); // descending order
          sortkey={text:"",slno:"♢",coursename:"♢",videolink:"♢",coursedescription:"♢",update:"♢"};
          sortkey.text=sortColumn+" DESC";
          sortkey[sortColumn]="▼";
        }
        else
        {
          datalist.sort(function(a,b){ var x = a[sortColumn] < b[sortColumn]? -1:1; return x; }); // ascending order
          sortkey={text:"",slno:"♢",coursename:"♢",videolink:"♢",coursedescription:"♢",update:"♢"};
          sortkey.text=sortColumn+" ASC";
          sortkey[sortColumn]="▲";
        }
        //console.log(sortkey);
        setloginval(loginval+1);
      }

  if (loading || error) 
  {
    
    let displaytext="";
    if(loading)
    {
      displaytext="Loading. Please Wait";
    }
    else if(error)
    {
      displaytext="Network Error. Login and try Again or Contact Administrator";
    }
    
    return (<div>
        <div class="text-center row">
              <h1 >Course Management Module</h1>
              <br></br>
              <div class="col col-12 col-md-12">
                <div class="col col-12 col-md-3"></div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Course title:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input type="text" onChange={function(){oninputchange()}} value ={tempcoursename || ""} ref={coursenameInput} className="filterinput "  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Video link:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input type="text" onChange={function(){oninputchange()}} value ={tempvideolink || ""} ref={videolinkInput} className="filterinput "  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <button class="font-size: 2rem" onClick={function(){updatecoursedetailsbuttonclick()}}> {mode} </button>
                  </div>
                  <div class="col col-12 col-md-3"></div>
            </div>
            <br></br>
          <br></br>
          <div class="col col-12 col-md-12">
                <div class="col col-12 col-md-2"></div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Desription:</label>
                  </div>
                  <div class="col col-12 col-md-6">
                    <textarea ref={coursedescriptionInput} onkeyup={function(){oninputchange()}} value={tempcoursedescription} name="paragraph_text" cols="100" rows="3" className="filterinputforcoursedescription"></textarea>
                  </div>
                  <div class="col col-12 col-md-2"></div>
          </div>
          </div>
        <br></br>
        <h2 class="text-center row">{displaytext}</h2>
    </div>);
  }

  return (<div id="capture">
    <div class="text-center row " >
          <h1 >Course Management Module</h1>
          <br></br>
          <div class="col col-12 col-md-12">
                <div class="col col-12 col-md-2"></div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Course title:</label>
                  </div>
                  <div class="col col-12 col-md-3">
                    <input type="text" onChange={function(){oninputchange()}} value ={tempcoursename || ""} ref={coursenameInput} className="filterinput "  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Video link:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input type="text" onChange={function(){oninputchange()}} value ={tempvideolink || ""} ref={videolinkInput} className="filterinput "  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <button class="font-size: 2rem" onClick={function(){updatecoursedetailsbuttonclick()}}> {mode} </button>
                  </div>
                  <div class="col col-12 col-md-2"></div>
          </div>
          <br></br>
          <br></br>
          <div class="col col-12 col-md-12">
                <div class="col col-12 col-md-2"></div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Desription:</label>
                  </div>
                  <div class="col col-12 col-md-6">
                    <textarea onChange={function(){oninputchange()}} ref={coursedescriptionInput} value={tempcoursedescription} name="paragraph_text" cols="100" rows="3" className="filterinputforcoursedescription"></textarea>
                  </div>
                  <div class="col col-12 col-md-2"></div>
          </div>
          <br></br>
          <div class="col col-12 col-md-5"></div>
          <div class="col col-12 col-md-2">
            <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
          </div>
          <div class="col col-12 col-md-5"></div>
    </div>
    <br></br>
    <div className="Table" >
        <table>
            <tr>
                <th className="thdailydata" onClick={function(){sortbycolumn("slno")}}>S.no {sortkey.slno}</th>
                <th className="thdailydata" onClick={function(){sortbycolumn("coursename")}}>Course Name {sortkey.coursename}</th>
                <th className="thdailydata" >Video link </th>
                <th className="thdailydata" >Course description </th>
                <th className="thdailydata" >Update </th>
            </tr>
            <tr>
                <th className="thdailydata"> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbycoursenameinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Course Name"  /></th>
                <th className="thdailydata"> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbycoursecontentinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Course Content"  /></th>
                <th className="thdailydata"> </th>
            </tr>
            {datalist.map((val, key) => {
                return (
                    <tr key={key}>
                        <td className="tddailydata">{val.slno}</td>
                        <td className="tddailydata">{val.coursename}</td>
                        <td className="tddailydata">{val.videolink}</td>
                        <td className="tdcoursedescription">{val.description}</td>
                        <td className="tddailydata"><button class="font-size: 2rem" onClick={function(){updatcoursebuttonclick(val.slno)}}> Update </button></td>
                    </tr>
                )
            })}
        </table>
    </div>
    <br></br>
    <br></br>
    <br></br>
</div>);
}

export default Contentcourses;


