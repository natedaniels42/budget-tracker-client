import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Index from '../components/Index';

export default () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/index' component={Index} />
    </Switch>
)