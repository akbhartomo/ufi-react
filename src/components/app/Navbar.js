import React, { Component } from 'react'
import { Link } from 'react-router'

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/order">Order</Link>
                <Link to="/account">Account</Link>
                <Link to="/finance">Finance</Link>
            </div>
        )
    }
}
export default Navbar