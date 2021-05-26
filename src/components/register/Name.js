import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
const Name =(props)=>{
    const {email,password}=props.history.location.state
    const history = useHistory()
    const [name,setName]=useState('')
    const location = {
        pathname: '/confirm',
            state: { email:email,
                     password:password,
                     name:name
             }
        }  
    
        const handleClick =()=> {
    history.push(location)
        }
    
    return(
            <div>
                <input value={name} onChange={(e)=>setName(e.target.value)}></input>    {name}
    <button onClick={()=>handleClick()}>Next</button>
            </div>
        )
}

export default Name;