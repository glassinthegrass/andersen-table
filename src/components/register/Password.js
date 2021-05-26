import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'

const Password =(props)=>{
const [password1,setPassword1] = useState('');
const [password2,setPassword2] = useState('');
const {email}= props.history.location.state;

const history = useHistory()
const location = {
    pathname: '/name',
        state: { email:email,
                 password:password1
         }
    }  

    const handleClick =()=> {
history.push(location)
    }

return(
        <div>
            <input onChange={(e)=>setPassword1(e.target.value)}></input>    {password1}
            <input onChange={(e)=>setPassword2(e.target.value)}></input>    {password2}
<button onClick={()=>handleClick()}>Next</button>
        </div>
    )
}

export default Password