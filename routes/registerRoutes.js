import {Switch, Route} from 'react-router-dom';
import Home from '../src/components/Home/Home'
import GetStarted from '../src/components/register/GetStarted'
import Email from '../src/components/register/Email'
import Password from '../src/components/register/Password'
import Name from '../src/components/register/Name'
import Confirm from '../src/components/register/Confirm'

export default(
    <Switch>
        
        <Route exact path="/" component={Home} />
        <Route path="/getting-started" component={GetStarted} />
        <Route path="/email" component={Email} />
        <Route path="/password" component={Password} />
        <Route path="/name" component={Name} />
        <Route path="confirm" component={Confirm} />

    </Switch>
)