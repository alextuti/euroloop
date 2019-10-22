import React,{Component} from 'react';
import PassengerChange from './PassengerChange/PassengerChange';
import Input from '../Inputs/Input/Input';

import classes from './PassengerCount.module.scss';

class PassengerCount extends Component{

    state={
        clicked: false,
        passengersCount: 1
    }

    inputClickedHandler = ()=>{
        this.setState({clicked: true});
    }

    confirmedHandler = (passengers) =>{
        this.setState({clicked: false, passengersCount: passengers});
    }

    passengerChangeCancelHandler = () =>{
        this.setState({clicked: false});
    }

    render(){

        return(
            <div 
                className={classes.PassengerCount}>
                <Input 
                    elementType="text"
                    id="passengerCount"
                    name="passengerCount"
                    ariaLabel={"Passenger count"}
                    clicked={this.inputClickedHandler}
                    value={this.state.passengersCount === 1 ? '1 Passenger' : this.state.passengersCount + ' Passengers'}
                    position="Right"
                    textPosition="CenterAlignedText"
                    show/>
                <PassengerChange 
                    buttonClicked={this.state.clicked}
                    confirmed={this.confirmedHandler}
                    passengerChangeCancel={this.passengerChangeCancelHandler} />
            </div>
        )
    }
}

export default PassengerCount;