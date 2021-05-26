import React from 'react';
// import {MemberProvider} from './context/MemberContext';
import './reset.css';
import './App.css';
import routes from './routes/routes'

const App=()=>{
  
  return (
   
    <div className="App"> 
{routes}
    </div>
  
  );
}

export default App;
