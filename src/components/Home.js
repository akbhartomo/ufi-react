import React, { Component } from 'react'

//Components
import Navbar from './app/Navbar'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Home
                <Navbar/>
            </div>
        )
    }
}
export default Home 