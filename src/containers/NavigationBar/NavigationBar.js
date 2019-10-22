import React, {Component} from 'react';

import classes from './NavigationBar.module.scss';

class NavigationBar extends Component{

    state= {
        logoClicked: false
    }

    logoClickedHandler = () =>{
        this.setState({logoClicked: true});
    }

    render(){

        return(
            <nav className={classes.NavigationBar}>
                <span>euroloop</span>
            </nav>
        )
    }
}

export default NavigationBar;