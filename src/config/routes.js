import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Index from '../components/Index';

export default ({ transactions }) => (
    <Switch>
        <Route exact path='/' render={() => <Home transactions={transactions} />} />
        <Route path='/index' render={() => <Index transactions={transactions} />} />
    </Switch>
)