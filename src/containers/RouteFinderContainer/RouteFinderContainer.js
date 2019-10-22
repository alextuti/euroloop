import React, {Component} from 'react';
import OneWayReturn from '../../components/OneWayReturn/OneWayReturn';
import PassengerCount from '../../components/PassengerCount/PassengerCount';
import DateInput from '../../components/DateInput/DateInput';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import Input from '../../components/Inputs/Input/Input';

import classes from './RouteFinderContainer.module.scss';


class RouteFinderContainer extends Component{

    state = {
        departureInputValue: null,
        arrivalInputValue: null,
        showReturnDateInput: false
    }

    getDepartureInputValue = (inputValue) =>{
        this.setState({departureInputValue: inputValue});
    }

    getArrivalInputValue = (inputValue) =>{
        this.setState({arrivalInputValue: inputValue});
    }

    showReturnDateInput = () =>{
        this.setState({showReturnDateInput: true});
    }

    hideReturnDateInput = () =>{
        this.setState({showReturnDateInput: false});
    }

    render(){
        console.log(this.state);
        return (
                <form 
                    className={classes.RouteFinderContainer}
                    autoComplete="off">
                    <SearchInput 
                        type="text" 
                        id="departure"
                        name="departureCity" 
                        labelName="Departure"
                        sendDepartureInputValue={this.getDepartureInputValue}
                        oppositeValue={this.state.arrivalInputValue} 
                        gridArea="DepartureInput"/>
                    <SearchInput 
                        type="text" 
                        id="arrival"
                        name="arrivalCity" 
                        labelName="Arrival"
                        sendArrivalInputValue={this.getArrivalInputValue}
                        oppositeValue={this.state.departureInputValue} 
                        gridArea="ArrivalInput"/>
                    <OneWayReturn 
                        showReturnDateInput={this.showReturnDateInput} 
                        hideReturnDateInput={this.hideReturnDateInput}/>
                    <PassengerCount/>
                    <DateInput 
                        for="departure" 
                        key="departureDateInput" 
                        show/>
                    <DateInput 
                        for="return" 
                        key="returnDateInput"
                        position="Right" 
                        show={this.state.showReturnDateInput}/>
                    <Input 
                        elementType="submit"
                        name="searchButton"
                        id="search-button"
                        value="Search"
                        gridArea="SearchButton"/>
                </form>
        )
    }
}

export default RouteFinderContainer;