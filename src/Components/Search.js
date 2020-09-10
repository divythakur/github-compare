import React from 'react'
import {useState,useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


import axios from 'axios';
function Search(){

const [searchkeyword,inputchange] = useState("");
const [biodata,setbiodata] =useState([]);
const [sortedBioData,setsortedbiodata] =useState([]);

   const load=(e)=>{
       axios.get(`https://api.github.com/users/${searchkeyword}`).
       then((response)=>setbiodata((biodata)=>[...biodata,response.data])).catch((err)=>console.log(err.message))
       e.preventDefault();
       inputchange("");
    }
   function compare( a, b ) {
    if ( a.followers > b.followers ){
      return -1;
    }
    if ( a.followers < b.followers ){
      return 1;
    }
    return 0;
  }
   useEffect(()=>{
       
       document.getElementById("myform").reset()
       const sortedBioData = biodata.sort(compare);
      setbiodata(sortedBioData)
      setsortedbiodata(sortedBioData)   
      console.log(sortedBioData)
    
   },[biodata])

    return(
        <div id="s" >
            <h1 style={{textAlign:"center"}}>Github Profile Compare</h1>
         <form id="myform" style={{textAlign:"center"}} >
         <TextField id="outlined-basic" label="User Name" variant="outlined" id="a" onChange={(e)=>{inputchange(e.target.value)}} style={{marginRight:"15px"}}/>

        <Button variant="contained" color="secondary" type="submit" onClick={load}>
        Compare
      </Button>
        </form>
        {
            biodata.length==0 &&
            <h1 style={{marginTop:"130px",textAlign:"center",color:"brown"}}>No Profile Yet To Be Compared  </h1>
        }
        { biodata.length>0  &&
           
            <GridList cellHeight={160} cols={3}>
            {sortedBioData.map((tile) => (
              <GridListTile key={tile.id} cols={tile.cols || 1} style={{background: "antiquewhite",border:"solid 3px",margin:"15px",marginRight:"94px",marginLeft:"116px"}}>
                <p><span style={{fontWeight:"bold"}}>User Name:-</span> {tile.login} </p>
                <p><span  style={{fontWeight:"bold"}}>Name:-</span> {tile.name}</p>
                <p><span  style={{fontWeight:"bold"}}>No of followers:-</span> {tile.followers}</p>
                <p><span  style={{fontWeight:"bold"}}>No of following:-</span> {tile.following}</p>
                <p>sa</p>
              </GridListTile>
            ))}
          </GridList>
        }
        </div>
    );
}


export default Search;