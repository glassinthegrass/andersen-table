import React from "react";
import {useHistory,useLocation} from 'react-router-dom'
const Home = (props) => {
    console.log(props)
    let history = useHistory();
    let location = useLocation()
console.log(location)
const handleClick =()=>{
history.push('/getting-started')
}
    return (
  <div>
      {!location.state?.member.isLoggedIn ? <></>:<div>{`Welcome ${location?.state?.member.name}`}</div>}
      {console.log(props)}
<div onClick={handleClick}>Home</div>
  </div>
  );
};
export default Home;
