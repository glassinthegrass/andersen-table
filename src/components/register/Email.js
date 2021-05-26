import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
const Email =()=>{

    const [email,setEmail]=useState('')
   const history = useHistory()

const location = {
    pathname: '/password',
        state: { email:email }
    }  

    const handleClick =()=> {
history.push(location)
    }
      
    return(
        <div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button onClick={()=>handleClick()}>Submit</button>
            {email}
        </div>
    )
}

export default Email