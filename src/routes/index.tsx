import { FunctionComponent } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '@pages';

const Routes: FunctionComponent<{}> = () => (
  <Switch>
    <Route exact path='/'>
      <HomePage />
    </Route>
    <Route path='*'>
      <Redirect to='/' />
    </Route>
  </Switch>
)

export default Routes;
