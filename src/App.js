import React, { Component } from "react";
import RouteFinderContainer from "./containers/RouteFinderContainer/RouteFinderContainer";
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import Results from "./containers/Results/Results";
import classes from "./App.module.scss";

class App extends Component {
  state = {
    departureStationSubmitted: null,
    arrivalStationSubmitted: null,
    departureDateSubmitted: null,
    returnDateSubmitted: null,
    formSubmitted: false
  };

  getDepartureStation = station => {
    this.setState({ departureStationSubmitted: station });
  };

  getArrivalStation = station => {
    this.setState({ arrivalStationSubmitted: station });
  };

  getDepartureDate = date => {
    this.setState({ departureDateSubmitted: date });
  };

  getReturnDate = date => {
    this.setState({ returnDateSubmitted: date });
  };

  submittedHandler = submitted => {
    this.setState({ formSubmitted: submitted });
  };

  render() {
    return (
      <div className={classes.App}>
        <NavigationBar />
        <RouteFinderContainer
          departureStation={this.getDepartureStation}
          arrivalStation={this.getArrivalStation}
          departureDate={this.getDepartureDate}
          returnDate={this.getReturnDate}
          submitted={this.submittedHandler}
        />
        {this.state.formSubmitted &&
        new Date(this.state.departureDateSubmitted).getTime() <=
          new Date(this.state.returnDateSubmitted).getTime() ? (
          <Results
            departureStation={this.state.departureStationSubmitted}
            arrivalStation={this.state.arrivalStationSubmitted}
          />
        ) : (
          alert("The departure date has to be before the return date")
        )}
      </div>
    );
  }
}

export default App;
