import React, {Component} from 'react';
import Input from '../Inputs/Input/Input';

import classes from './OneWayReturn.module.scss';

class OneWayReturn extends Component{

    state = {
        oneWayClicked: true,
        returnClicked: false
    }

    oneWayClickedHandler = () =>{
        this.setState({oneWayClicked: true, returnClicked: false});
        this.props.hideReturnDateInput();
    }

    returnClickedHandler = () =>{
        this.setState({oneWayClicked: false, returnClicked: true});
        this.props.showReturnDateInput();
    }

    render(){
        console.log(this.state);
            
        return(
            <div 
                className={classes.OneWayReturn}
                role="radiogroup">
                <Input
                    elementType="radio"
                    id="oneWay"
                    name="oneWayReturnChoice"
                    labelText="One way"
                    value="oneWay"
                    clicked={this.oneWayClickedHandler}
                    checked={this.state.oneWayClicked}/>
                <Input
                    elementType="radio"
                    id="return"
                    name="oneWayReturnChoice"
                    labelText="Return"
                    value="return"
                    clicked={this.returnClickedHandler}
                    checked={this.state.returnClicked}/>
            </div>
        )
    }
}

export default OneWayReturn;