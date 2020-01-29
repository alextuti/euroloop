import React, { Component } from "react";
import OneWayReturn from "../../components/OneWayReturn/OneWayReturn";
import PassengerCount from "../../components/PassengerCount/PassengerCount";
import DateInput from "../../components/DateInput/DateInput";
import SearchInput from "../../components/Inputs/SearchInput/SearchInput";
import Input from "../../components/Inputs/Input/Input";

import classes from "./RouteFinderContainer.module.scss";

class RouteFinderContainer extends Component {
  state = {
    departureStation: null,
    arrivalStation: null,
    passengers: {
      total: 1,
      adults: 1,
      children: 0,
      infants: 0
    },
    departureDate: null,
    returnDate: null,
    showReturnDateInput: false
  };

  getDepartureInputValue = inputValue => {
    this.setState({ departureStation: inputValue });
  };

  getArrivalInputValue = inputValue => {
    this.setState({ arrivalStation: inputValue });
  };

  getTotalPassengers = passengers => {
    this.setState({
      passengers: {
        total: passengers.total,
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants
      }
    });
  };

  getDepartureDate = date => {
    this.setState({ departureDate: date });
  };

  getReturnDate = date => {
    this.setState({ returnDate: date });
  };

  showReturnDateInput = () => {
    this.setState({ showReturnDateInput: true });
  };

  hideReturnDateInput = () => {
    this.setState({ showReturnDateInput: false });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.departureStation(this.state.departureStation);
    this.props.arrivalStation(this.state.arrivalStation);
    this.props.departureDate(this.state.departureDate);
    this.props.returnDate(this.state.returnDate);
    this.props.submitted(true);
  };

  render() {
    console.log(this.state);
    return (
      <form
        className={classes.RouteFinderContainer}
        autoComplete="off"
        onSubmit={this.submitHandler}
      >
        <SearchInput
          type="text"
          id="departure"
          name="departureCity"
          labelName="Departure"
          sendDepartureInputValue={this.getDepartureInputValue}
          oppositeValue={this.state.arrivalStation}
          gridArea="DepartureInput"
          required
        />
        <SearchInput
          type="text"
          id="arrival"
          name="arrivalCity"
          labelName="Arrival"
          sendArrivalInputValue={this.getArrivalInputValue}
          oppositeValue={this.state.departureStation}
          gridArea="ArrivalInput"
          required
        />
        <OneWayReturn
          showReturnDateInput={this.showReturnDateInput}
          hideReturnDateInput={this.hideReturnDateInput}
        />
        <PassengerCount passengersCount={this.getTotalPassengers} />
        <DateInput
          for="departure"
          key="departureDateInput"
          selectedDepartureDate={this.getDepartureDate}
          oppositeValue={this.state.returnDate}
          show
        />
        <DateInput
          for="return"
          key="returnDateInput"
          position="Right"
          selectedReturnDate={this.getReturnDate}
          oppositeValue={this.state.departureDate}
          show={this.state.showReturnDateInput}
        />
        <Input
          elementType="submit"
          name="searchButton"
          id="search-button"
          value="Search"
          gridArea="SearchButton"
        />
      </form>
    );
  }
}

export default RouteFinderContainer;
