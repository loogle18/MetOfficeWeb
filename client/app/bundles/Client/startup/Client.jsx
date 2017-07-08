import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../components/App';
import Stations from '../components/Stations';
import Station from '../components/Station';
import NoMatch from '../components/NoMatch';
import configureStore from '../store/clientStore';

injectTapEventPlugin();

const Client = (props, _railsContext) => (
  <Provider store={configureStore(props)}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Stations} data={props} />
        <Route path='/stations/:id' component={Station} data={props} />
        <Route path='*' component={NoMatch} />
      </Route>
    </Router>
  </Provider>
);

export default Client;
