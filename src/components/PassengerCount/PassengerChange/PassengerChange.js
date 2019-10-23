import React, {Component} from 'react';
import Button from '../../Buttons/Button/Button';
import Input from '../../Inputs/Input/Input';

import classes from './PassengerChange.module.scss';
import minusIcon from '../../../assets/RouteFinder/minus.svg';
import plusIcon from '../../../assets/RouteFinder/plus.svg';
class PassengerChange extends Component{

    state ={
        adultsCount: 1,
        childrenCount: 0,
        infantsCount: 0,
        passengers: 1,
        confirmed: false
    }

    adultsMinusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({adultsCount: prevState.adultsCount - 1, passengers: prevState.passengers -1}));
    };

    childrenMinusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({childrenCount: prevState.childrenCount - 1, passengers: prevState.passengers -1}));
    };

    infantsMinusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({infantsCount: prevState.infantsCount - 1, passengers: prevState.passengers -1}));
    };

    adultsPlusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({adultsCount: prevState.adultsCount + 1, passengers: prevState.passengers +1}));
    }

    childrenPlusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({childrenCount: prevState.childrenCount + 1, passengers: prevState.passengers +1}));
    }

    infantsPlusButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({infantsCount: prevState.infantsCount + 1, passengers: prevState.passengers +1}));
    }

    confirmPassengerChangeHandler = (e) =>{
        e.preventDefault();
        if(this.state.adultsCount > 0 ){
            this.props.confirmed(this.state.passengers);
        }
    }

    passengerChangeCancelHandler = () =>{
        this.props.passengerChangeCancel();
    }

    render(){
        
        console.log(this.state.passengers);
        let minus = <img src={minusIcon} alt="minus" style={{width: '25px', height: '8px', marginBottom: '8px'}}></img>;
        let plus = <img src={plusIcon} alt="plus" style={{width: '25px', height: '25px', }}></img>;
        return(
            <section 
                className={classes.PassengerChange}
                role="dialog"
                aria-label="Passenger change box"
                style={{
                    display: this.props.buttonClicked ? 'block' : 'none'
                }}>

                {/* The upper part used for mobile/tablets */}
                <section className={classes.PassengerChangeHead}>
                        <span
                            className={classes.PassengerChangeCancel} 
                            onClick={this.passengerChangeCancelHandler}>{"<"}</span>
                        <span>Passengers</span>
                </section>

                {/* The container that holds the increase/decrease buttons for different type of passengers */}
                <section
                    className={classes.PassengerChangeBody}>
                    <Button
                        role="button"
                        ariaLabel="Decrease the number of adults"
                        disabled={this.state.adultsCount === 0 ? true : false}
                        clicked={this.adultsMinusButtonHandler} 
                        key="adultsMinusButton"
                        show>{minus}</Button>
                    <span
                        aria-hidden="true">{this.state.adultsCount} {this.state.adultsCount === 1 ? 'Adult':'Adults'}</span>
                    <Button
                        role="button"
                        ariaLabel="Increase the number of adults"
                        clicked={this.adultsPlusButtonHandler} 
                        key="adultsPlusButton"
                        show>{plus}</Button>
                    <Button
                        role="button"
                        ariaLabel="Decrease the number of children"
                        disabled={this.state.childrenCount === 0 ? true : false}
                        clicked={this.childrenMinusButtonHandler} 
                        key="childrenMinusButton"
                        show>{minus}</Button>
                    <span
                        aria-hidden="true">{this.state.childrenCount} {this.state.childrenCount === 1 ? 'Child':'Children'}</span>
                    <Button
                        role="button"
                        ariaLabel="Increase the number of children"
                        clicked={this.childrenPlusButtonHandler} 
                        key="childrenPlusButton"
                        show>{plus}</Button>
                    <Button
                        role="button"
                        ariaLabel="Decrease the number of infants"
                        disabled={this.state.infantsCount === 0} 
                        clicked={this.infantsMinusButtonHandler} 
                        key="infantsMinusButton"
                        show>{minus}</Button>
                    <span
                        aria-hidden="true">{this.state.infantsCount} {this.state.infantsCount === 1 ? 'Infant':'Infants'}</span>
                    <Button
                        role="button"
                        ariaLabel="Increase the number of infants"
                        clicked={this.infantsPlusButtonHandler} 
                        key="infantsPlusButton"
                        show>{plus}</Button>                      
                </section>
                <Button 
                    btnType="Confirm" 
                    clicked={this.confirmPassengerChangeHandler}
                    confirmed={this.state.confirmed}
                    disabled={this.state.adultsCount === 0}
                    show>CONFIRM</Button>

                {/* For accessibility purposes, this status paragraph informs the user of the current number of passengers */}
                <p
                    role="status"
                    style={{
                        transform: 'translateY(-180vh)'
                    }}>
                        {
                            `Current passengers:
                            ${this.state.adultsCount} ${this.state.adultsCount === 1 ? 'Adult':'Adults'}, 
                            ${this.state.childrenCount} ${this.state.childrenCount === 1 ? 'Child':'Children'} and 
                            ${this.state.infantsCount} ${this.state.infantsCount === 1 ? 'Infant' : 'Infants'}`
                        }
                </p>

                {/* Inputs that hold the current values and can be accessed through the form data */}
                <Input 
                    elementType="hidden"
                    name="adultsCount"
                    value={this.state.adultsCount}
                    show/>
                <Input 
                    elementType="hidden"
                    name="childrenCount"
                    value={this.state.childrenCount}
                    show/>
                <Input 
                    elementType="hidden"
                    name="infantsCount"
                    value={this.state.infantsCount}
                    show/>
            </section>
        )
    }
}

export default PassengerChange;