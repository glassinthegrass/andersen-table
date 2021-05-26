import {Switch, Route} from 'react-router-dom';
import Home from '../components/home/Home'
import GetStarted from '../components/register/GetStarted'
import Email from '../components/register/Email'
import Password from '../components/register/Password'
import Name from '../components/register/Name'
import Login from '../components/register/Login'
import Confirm from '../components/register/Confirm'

export default(
    <Switch>
        
        <Route exact path="/" component={Home} />
        <Route path="/getting-started" component={GetStarted} />
        <Route path="/login" component={Login}/>
        <Route path="/email" component={Email} />
        <Route path="/password" component={Password} />
        <Route path="/name" component={Name} />
        <Route path="/confirm" component={Confirm} />


    </Switch>
)