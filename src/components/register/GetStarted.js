import React from 'react';
import {useHistory} from 'react-router-dom';
const GetStarted = ()=>{
const history =useHistory()
const handleLogin =()=>{
history.push('/login')
}
const handleRegister = () => {
history.push('/email')
}
    return(
        <div>
<button onClick={handleLogin}>Login</button>
<button onClick={handleRegister}>Register</button>
        </div>
    )
}
export default GetStarted;