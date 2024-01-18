import React, { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


let sortkey={text:"",slno:"▲",username:"♢",phoneno:"♢",password:"♢",status:"♢",update:"♢"};
let datalist=[];
let masterdatalist=[];
let displaydate="";
let htmlcomment="";
let tempusername="";
let tempphoneno="";
let temppassword="";
let tempstatus="Approved";
let keyselected;

function Contentdaily(props) 
{
  let usernameInput = React.createRef();
  let passwordInput = React.createRef();
  let phonenoInput = React.createRef();
  let statusinput = React.createRef();

  let filterbyusernameinput = React.createRef();
  let filterbyphonenoinput = React.createRef();
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginval,setloginval]=useState(0);
  const [error, setError] = useState(null);
  


  

  useEffect(() => 
  {
    
    fetchData(gettodaysdate(),props.passondata);
  }, []);

  async function fetchData(datereq,shopreq) 
  {
    try 
    {
      const data = await axios.get('https://srlearnapi.onrender.com/userlist');
      datalist= await data.data;
      for(let i=0;i<datalist.length;i++)
      {
        datalist[i].slno=i+1;
        if(datalist[i].status=="active")
        {
          datalist[i].status="Approved";
        }
        else if(datalist[i].status=="apppending")
        {
          datalist[i].status="Pending";
        }
        else if(datalist[i].status=="blocked")
        {
          datalist[i].status="Blocked";
        }
      }
      //console.log(datalist);
      masterdatalist=datalist;
      htmlcomment="";
      setData(data);
      setLoading(false);
    } 
    catch (error) 
    {
      setError(error);
      setLoading(false);
    }
  }
  
  async function updateuserinfo(userid) 
  {
    try 
    {
      let statusupdate="active";
      if(statusinput.current.value=="Approved")
      {
        statusupdate="active";
      }
      else if(statusinput.current.value=="Pending")
      {
        statusupdate="apppending";
      }
      else if(statusinput.current.value=="Blocked")
      {
        statusupdate="blocked";
      }
      //https://srlearnapi.onrender.com/updateuser/1705232820726/username10/password10/56789425/active
      const dataresp = await axios.get('https://srlearnapi.onrender.com/updateuser/'+userid+'/'+usernameInput.current.value+'/'+passwordInput.current.value+'/'+phonenoInput.current.value+'/'+statusupdate);
      const datarespval= await dataresp.data;
      htmlcomment="Data updated successfully";
      setloginval(loginval+1);
    } 
    catch (error) 
    {
        setError(error);
        setLoading(false);
    }
  }
  
    function oninputchange()
    {
      setloginval(loginval+1);
    }

  
    function updateuserbuttonclick(key)
    {
      console.log(masterdatalist[key-1]);
      tempusername=masterdatalist[key-1].username;
      tempphoneno=masterdatalist[key-1].phoneno;
      temppassword=masterdatalist[key-1].password;
      //tempstatus=masterdatalist[key-1].status;
      keyselected=key;
      setloginval(loginval+1);
    }

    function updateuserdetailsbuttonclick()
    {
      updateuserinfo(masterdatalist[keyselected-1].userid);
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
        datalist=datalist.filter((word) => word.username.includes(filterbyusernameinput.current.value) && word.phoneno.toLowerCase().includes(filterbyphonenoinput.current.value.toLowerCase()));
        datalist.sort(function(a,b){ var x = a.slno < b.slno? -1:1; return x; }); // ascending order
        let sortkey={text:"",slno:"▲",username:"♢",phoneno:"♢",password:"♢",status:"♢",update:"♢"};
        sortkey.text="slno"+" ASC";
        setloginval(loginval+1);
      }
      
      function sortbycolumn(sortColumn)
      {
        
        if(sortkey.text.includes("ASC") && sortkey.text.includes(sortColumn))
        {
          datalist.sort(function(a,b){ var x = a[sortColumn] > b[sortColumn]? -1:1; return x; }); // descending order
          sortkey={text:"",slno:"♢",username:"♢",phoneno:"♢",password:"♢",status:"♢",update:"♢"};
          sortkey.text=sortColumn+" DESC";
          sortkey[sortColumn]="▼";
        }
        else
        {
          datalist.sort(function(a,b){ var x = a[sortColumn] < b[sortColumn]? -1:1; return x; }); // ascending order
          sortkey={text:"",slno:"♢",username:"♢",phoneno:"♢",password:"♢",status:"♢",update:"♢"};
          sortkey.text=sortColumn+" ASC";
          sortkey[sortColumn]="▲";
        }
        //console.log(sortkey);
        setloginval(loginval+1);
      }

  if (loading) {
    return (<div>
        <div class="text-center row">
              <h1 >User Management Module</h1>
              <br></br>
              <div class="col col-12 col-md-12">
                
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Username:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input type="text" onChange={function(){oninputchange()}} value ={tempusername || ""} ref={usernameInput} className="filterinput "  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Password:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input value ={temppassword || ""}  onChange={function(){oninputchange()}} ref={passwordInput} type="text" className="filterinput " placeholder=""  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Phone no:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input value ={tempphoneno || ""}  onChange={function(){oninputchange()}} ref={phonenoInput} type="text" className="filterinput " placeholder=""  />
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Set Status:</label>
                  </div>
                  <div class="col col-12 col-md-1">
                    <select ref={statusinput} name="statusoptions" id="statusoptions">
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  <div class="col col-12 col-md-1">
                    <button class="font-size: 2rem" onClick={function(){updateuserdetailsbuttonclick()}}> Update </button>
                  </div>
                </div>
        </div>
        <br></br>
        <h2 class="text-center row">Loading. Please Wait</h2>
    </div>);
  }

  if (error) {
    return (<div>
        <div class="text-center row">
              <h1 >User Management Module</h1>
              <br></br>
              <div class="col col-12 col-md-12">
                
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Username:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input type="text"  onChange={function(){oninputchange()}} ref={usernameInput} value ={tempusername || ""} className="filterinput " placeholder="" />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Password:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input  onChange={function(){oninputchange()}} value ={temppassword || ""} ref={passwordInput} type="text" className="filterinput " placeholder=""  />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Phone no:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input  onChange={function(){oninputchange()}} value ={tempphoneno || ""} ref={phonenoInput} type="text" className="filterinput " placeholder=""  />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Set Status:</label>
                </div>
                <div class="col col-12 col-md-1">
                    <select ref={statusinput} name="statusoptions" id="statusoptions">
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                    </select>
                </div>
                <div class="col col-12 col-md-1">
                  <button class="font-size: 2rem" onClick={function(){updateuserdetailsbuttonclick()}}> Update </button>
                </div>
              </div>
        </div>
        <br></br>
        <h2 class="text-center row">Network Error. Login and try Again or Contact Administrator</h2>
    </div>);
  }

  return (<div id="capture">
    <div class="text-center row " >
          <h1 >User Management Module</h1>
          <br></br>
          <div class="col col-12 col-md-12">
                
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Username:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input  onChange={function(){oninputchange()}} type="text" ref={usernameInput} className="filterinput " value ={tempusername || ""} placeholder=""  />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Password:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input  onChange={function(){oninputchange()}} value ={temppassword || ""} ref={passwordInput} type="text" className="filterinput " placeholder=""  />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Phone no:</label>
                </div>
                <div class="col col-12 col-md-2">
                  <input  onChange={function(){oninputchange()}} value ={tempphoneno || ""} ref={phonenoInput} type="text" className="filterinput " placeholder=""  />
                </div>
                <div class="col col-12 col-md-1">
                  <label class="font-size: 1rem" >Set Status:</label>
                </div>
                <div class="col col-12 col-md-1">
                  <select ref={statusinput} name="statusoptions" id="statusoptions">
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                    </select>
                </div>
                <div class="col col-12 col-md-1">
                  <button class="font-size: 2rem" onClick={function(){updateuserdetailsbuttonclick()}}> Update </button>
                </div>
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
                <th className="thdailydata" onClick={function(){sortbycolumn("slno")}}>Sl.no {sortkey.slno}</th>
                <th className="thdailydata" onClick={function(){sortbycolumn("username")}}>Username {sortkey.username}</th>
                <th className="thdailydata" onClick={function(){sortbycolumn("phoneno")}}>Phone-no {sortkey.phoneno}</th>
                <th className="thdailydata" onClick={function(){sortbycolumn("password")}}>Password {sortkey.password}</th>
                <th className="thdailydata" onClick={function(){sortbycolumn("status")}}>Status {sortkey.status}</th>
                <th className="thdailydata" >Update </th>
            </tr>
            <tr>
                <th className="thdailydata"> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbyusernameinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Username"  /></th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbyphonenoinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Phone-no" /></th>
                <th className="thdailydata"> </th>
                <th className="thdailydata"> </th>
                <th className="thdailydata"> </th>
            </tr>
            {datalist.map((val, key) => {
                return (
                    <tr key={key}>
                        <td className="tddailydata">{val.slno}</td>
                        <td className="tddailydata">{val.username}</td>
                        <td className="tddailydata">{val.phoneno}</td>
                        <td className="tddailydata">{val.password}</td>
                        <td className="tddailydata">{val.status}</td>
                        <td className="tddailydata"><button class="font-size: 2rem" onClick={function(){updateuserbuttonclick(val.slno)}}> Update </button></td>
                    </tr>
                )
            })}
        </table>
    </div>
</div>);
}

export default Contentdaily;