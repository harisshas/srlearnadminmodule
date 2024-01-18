import React, { useState, useEffect } from 'react';
import axios, * as others from 'axios';

let datalist=[];
let employeelist=[];
let masterdatalist=[];
let shiftslist=[];
let htmlcomment="";
let fetchcomment="";
function Contentshiftallot(props) 
{
  let fromdateInput = React.createRef();
  let todateInput = React.createRef();
  let shiftinput = React.createRef();

  let filterbyidinput = React.createRef();
  let filterbynameinput = React.createRef();
  let filterbyfromdateinput = React.createRef();
  let filterbytodateinput = React.createRef();
  let filterbyshiftinput = React.createRef();

  let employeenameinput = React.createRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginval,setloginval]=useState(0);

  useEffect(() => 
  {
    htmlcomment="";
    fetchcomment="";
    fetchEmployeelist(props.passondata);
    fetchShiftslist(props.passondata);
  }, []);

  function filterbyidorname()
  {
    shiftslist=masterdatalist;
    //console.log(filterbyidinput.current.value);
    shiftslist=shiftslist.filter((word) => word.employeeid.includes(filterbyidinput.current.value) && word.employeename.toLowerCase().includes(filterbynameinput.current.value.toLowerCase()) && word.shiftallotted.toLowerCase().includes(filterbyshiftinput.current.value.toLowerCase()) && word.fromdate.toLowerCase().includes(filterbyfromdateinput.current.value) && word.todate.toLowerCase().includes(filterbytodateinput.current.value));
    shiftslist.sort(function(a,b){ var x = a.employeeid < b.employeeid? -1:1; return x; }); // ascending order
    setloginval(loginval+1);
  }


  async function fetchData(shopreq,employeeidreq,fromdatereq,todatereq,shiftreq) 
  {
    //http://localhost:3001/shiftallocation/MS/1234/2023-10-17/2023-10-19/GS
    try 
    {
      let data = await axios.get('http://localhost:3001/shiftallocation/'+shopreq+'/'+employeeidreq+'/'+fromdatereq+'/'+todatereq+'/'+shiftreq);
      datalist= await data.data;

      //console.log(datalist);
      if(datalist=="success")
      {
        fetchcomment="Shift details registered successfully"
      }
      fetchShiftslist(props.passondata);
    } 
    catch (error) 
    {
      setError(error);
      setLoading(false);
    }
  }

  async function fetchEmployeelist(shopreq) 
  {
    try 
    {
      let data = await axios.get('http://localhost:3001/employeelist/'+shopreq);
      employeelist= await data.data;
      //console.log(employeelist);
      setData(data);
      setLoading(false);
      setloginval(loginval+1);
    } 
    catch (error) 
    {
        setError(error);
        setLoading(false);
    }
  }
  //let shiftslist=[];
  async function fetchShiftslist(shopreq) 
  {
    try 
    {
      ///shiftdetails/:shopentered/:fromdateentered
      const data = await axios.get('http://localhost:3001/shiftdetails/'+shopreq+'/2023-09-01');
      shiftslist= await data.data;
      masterdatalist=shiftslist;
      //console.log(employeelist);
      setloginval(loginval+1);
      setData(data);
      setLoading(false);
      
    } 
    catch (error) 
    {
        setError(error);
        setLoading(false);
    }
  }
  function getperioddatabuttonclick()
  {
    let fromdatenew = new Date(fromdateInput.current.value);
    let todatenew = new Date(todateInput.current.value);
    let shiftselected =shiftinput.current.value;
    let employeenameselected =employeenameinput.current.value;
    // console.log(getdateinformat(fromdatenew));
    // console.log(getdateinformat(todatenew));
    // console.log(shiftselected);
    // console.log(employeenameselected);
    if(fromdateInput.current.value=="" || todateInput.current.value=="")
    {
      htmlcomment="Date fields cannot be empty";
      
      setloginval(loginval+1);
      setLoading(false);
    }
    else if(fromdateInput.current.value>todateInput.current.value)
    {
      htmlcomment="From-Date cannot be greater than To-Date";
   
      setloginval(loginval+1);
      setLoading(false);
    }
    else
    {
      //console.log(fromdateInput.current.value-todateInput.current.value);
      htmlcomment="";
      fetchData(props.passondata,employeenameselected,getdateinformat(fromdatenew),getdateinformat(todatenew),shiftselected);   
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
      senddate=yyyy+'-'+mm+'-'+dd;
      let displaydate=dd+'-'+mm+'-'+yyyy;
      return senddate;
  }

  if (loading) {
    return (<div>
        <div class="text-center row">
              <h1 >Shift Allotment Page</h1>
              <br></br>

                <div class="col col-12 col-md-12">
                
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Employee:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <select ref={employeenameinput} name="employeenameoptions" id="employeenameoptions">
                        {employeelist.map((val, key) => { return (<option value={val.employeeid}>{val.employeename} : {val.employeeid}</option> ) })}
                    </select>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >From Date:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >To Date:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Select Shift:</label>
                  </div>
                  <div class="col col-12 col-md-1">
                    <select ref={shiftinput} name="shiftoptions" id="shiftoptions">
                            <option value="GS">GS</option>
                            <option value="FS">FS</option>
                            <option value="SS">SS</option>
                            <option value="NS">NS</option>
                            <option value="GS-OT">GS-OT</option>
                            <option value="FS-OT">FS-OT</option>
                            <option value="SS-OT">SS-OT</option>
                            <option value="NS-OT">NS-OT</option>
                    </select>
                  </div>
                  <div class="col col-12 col-md-1">
                    <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> Register </button>
                  </div>
                </div>

                <div class="col col-12 col-md-4"></div>
                <div class="col col-12 col-md-4">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
                </div>
                <div class="col col-12 col-md-4"></div>

        </div>
        <br></br>
        <h3 class="text-center row">Loading. Please Wait</h3>
    </div>);
  }


  if (error) 
  {
   return (<div>
        <div class="text-center row">
              <h1 >Shift Allotment Page</h1>
              <br></br>

                <div class="col col-12 col-md-12">
                
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Employee:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <select ref={employeenameinput} name="employeenameoptions" id="employeenameoptions">
                        {employeelist.map((val, key) => { return (<option value={val.employeeid}>{val.employeename} : {val.employeeid}</option> ) })}
                    </select>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >From Date:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >To Date:</label>
                  </div>
                  <div class="col col-12 col-md-2">
                    <input ref={todateInput} class="" type="date" id="todaytime" ></input>
                  </div>
                  <div class="col col-12 col-md-1">
                    <label class="font-size: 1rem" >Select Shift:</label>
                  </div>
                  <div class="col col-12 col-md-1">
                    <select ref={shiftinput} name="shiftoptions" id="shiftoptions">
                            <option value="GS">GS</option>
                            <option value="FS">FS</option>
                            <option value="SS">SS</option>
                            <option value="NS">NS</option>
                            <option value="GS-OT">GS-OT</option>
                            <option value="FS-OT">FS-OT</option>
                            <option value="SS-OT">SS-OT</option>
                            <option value="NS-OT">NS-OT</option>
                    </select>
                  </div>
                  <div class="col col-12 col-md-1">
                    <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> Register </button>
                  </div>

                  <div class="col col-12 col-md-4"></div>
                  <div class="col col-12 col-md-4">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
                  </div>
                  <div class="col col-12 col-md-4"></div>

                </div>

        </div>
        <br></br>
        <h3 class="text-center row">Network Error. Contact Administrator</h3>
    </div>);
  }

  return (<div>
    <div class="text-center row">
          <h1 >Shift Allotment Page</h1>
          <br></br>

            <div class="col col-12 col-md-12">
            
              <div class="col col-12 col-md-1">
                <label class="font-size: 1rem" >Employee:</label>
              </div>
              <div class="col col-12 col-md-2">
                <select ref={employeenameinput} name="employeenameoptions" id="employeenameoptions">
                    {employeelist.map((val, key) => { return (<option value={val.employeeid}>{val.employeename} : {val.employeeid}</option> ) })}
                </select>
              </div>
              <div class="col col-12 col-md-1">
                <label class="font-size: 1rem" >From Date:</label>
              </div>
              <div class="col col-12 col-md-2">
                <input ref={fromdateInput} class="" type="date" id="fromdaytime" ></input>
              </div>
              <div class="col col-12 col-md-1">
                <label class="font-size: 1rem" >To Date:</label>
              </div>
              <div class="col col-12 col-md-2">
                <input ref={todateInput} class="" type="date" id="todaytime" ></input>
              </div>
              <div class="col col-12 col-md-1">
                <label class="font-size: 1rem" >Select Shift:</label>
              </div>
              <div class="col col-12 col-md-1">
                <select ref={shiftinput} name="shiftoptions" id="shiftoptions">
                        <option value="GS">GS</option>
                        <option value="FS">FS</option>
                        <option value="SS">SS</option>
                        <option value="NS">NS</option>
                        <option value="GS-OT">GS-OT</option>
                        <option value="FS-OT">FS-OT</option>
                        <option value="SS-OT">SS-OT</option>
                        <option value="NS-OT">NS-OT</option>
                </select>
              </div>
              <div class="col col-12 col-md-1">
                <button class="font-size: 2rem" onClick={function(){getperioddatabuttonclick()}}> Register </button>
              </div>

              <div class="col col-12 col-md-4"></div>
              <div class="col col-12 col-md-4">
                          <h5 class="text-center row " className="commentpar">{htmlcomment}</h5>
               </div>
              <div class="col col-12 col-md-4"></div>

            </div>

    </div>
    <br></br>
    <h3 class="text-center row">{fetchcomment}</h3>
    <br/>
    <h4 class="text-center row"> Details of shifts booked in the last three months</h4>
    <div className="Table">
        
        <table>
            
            <tr>
                <th className="thdailydata" >Sl.no </th>
                <th className="thdailydata" >Employee ID </th>
                <th className="thdailydata" >Employee Name </th>
                <th className="thdailydata" >From Date </th>
                <th className="thdailydata" >To Date </th>
                <th className="thdailydata" >Shift Allotted </th>
            </tr>
            <tr>
                <th className="thdailydata"> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbyidinput} onChange={function(){filterbyidorname()}} placeholder="Filter by ID"  style={{width: "10rem"}}/></th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbynameinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Name" style={{width: "12rem"}}/></th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbyfromdateinput} onChange={function(){filterbyidorname()}} placeholder="Filter by From-Date" style={{width: "16rem"}}/> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbytodateinput} onChange={function(){filterbyidorname()}} placeholder="Filter by To-Date" style={{width: "16rem"}}/> </th>
                <th className="thdailydata"><input type="text" className="filterinput " ref={filterbyshiftinput} onChange={function(){filterbyidorname()}} placeholder="Filter by Shift" style={{width: "12rem"}}/> </th>
            </tr>
            {shiftslist.map((val, key) => {
                return (
                    <tr key={key}>
                        <td className="tddailydata">{key+1}</td>
                        <td className="tddailydata">{val.employeeid}</td>
                        <td className="tddailydata">{val.employeename}</td>
                        <td className="tddailydata">{val.fromdate}</td>
                        <td className="tddailydata">{val.todate}</td>
                        <td className="tddailydata">{val.shiftallotted}</td>
                    </tr>
                )
            })}
        </table>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
</div>);


}

export default Contentshiftallot;