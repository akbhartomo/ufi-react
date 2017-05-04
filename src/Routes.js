import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

//Components
import Home from './components/Home'
import Account from './components/account/FormIndex'
import Order from './components/order/OrderList'

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route
                    name="ufi"
                    path="/ufi-form/"
                >
                    <IndexRoute component={Account} />
                    <Route path="/ufi-form/account" component={Account} />
                    <Route path="/ufi-form/order" component={Order} />
                </Route>
                <Route path="/ufi-form/" component={Home} />
            </Router>
        )
    }
}

export default Routes;