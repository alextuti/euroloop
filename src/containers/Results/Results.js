import React, { Component } from "react";
import Result from "../../components/Result/Result";

import classes from "./Results.module.scss";

class Results extends Component {
  state = {
    results: [
      {
        departureTime: "4:30",
        arrivalTime: "7:40",
        tripDuration: "3h 10m",
        price: 32
      },
      {
        departureTime: "8:45",
        arrivalTime: "11:30",
        tripDuration: "2h 45m",
        price: 40
      },
      {
        departureTime: "10:00",
        arrivalTime: "12:45",
        tripDuration: "2h 45m",
        price: 40
      },
      {
        departureTime: "13:30",
        arrivalTime: "16:40",
        tripDuration: "3h 10m",
        price: 32
      },
      {
        departureTime: "16:20",
        arrivalTime: "19:05",
        tripDuration: "2h 45m",
        price: 40
      }
    ]
  };

  render() {
    return (
      <section className={classes.Results}>
        {this.state.results.map(result => {
          return (
            <Result
              departureTime={result.departureTime}
              arrivalTime={result.arrivalTime}
              tripDuration={result.tripDuration}
              price={result.price}
              departureStation={this.props.departureStation}
              arrivalStation={this.props.arrivalStation}
            />
          );
        })}
      </section>
    );
  }
}

export default Results;
