import React,{useState,useEffect} from "react";
import {useHistory} from 'react-router-dom';
// import MemberContext from '../../context/MemberContext'
import axios from 'axios';


const Confirm = (props) => {
const {email,password,name}=props.history.location?.state
const history = useHistory()
const [response,setResponse]=useState('');
const [member1,setMember]=useState('');
const handleSubmit =(email,password,name)=>{
    axios.post('/auth/register', {email,password,name})
    .then(res=>{
setResponse(res.data.response)
    })
    .catch(err=>{
        console.log(err)
    })
}

const handleLogin = (email,password)=>{
    axios.post('/auth/login', {email,password})
    .then(res =>{
        setMember(res.data)
    })
    .catch(err=>console.log(err))
}

const location = {
    pathname: '/',
        state: { 
            member:member1
         }
    }  

useEffect(()=>{
    !member1.isLoggedIn ? <></> : history.push(location)
})
  return (
  <div>
      {console.log(props)}
      <div><button onClick={()=>history.go(-3)}> {`<`} </button></div>
     <h1>Name:<span>{name}</span></h1> 
     <h1>Email: <span>{email}</span></h1>
     <h1>Password: <span>{password}</span></h1>
     <button onClick={()=>handleSubmit(email,password,name)}>Submit?</button>
     {!response ? <></>:<div>{response}<button onClick={()=>handleLogin(email,password)}>Login</button></div>}
  </div>
  )
}

export default Confirm;
