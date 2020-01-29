import React, { Component } from "react";

import classes from "./Result.module.scss";

class Result extends Component {
  render() {
    return (
      <article
        className={classes.Result}
        aria-label={
          "Loop departs at " +
          this.props.departureTime +
          " from " +
          this.props.departureStation +
          " and arrives at " +
          this.props.arrivalTime +
          " in " +
          this.props.arrivalStation
        }
      >
        <section className={classes.Result__TripTimes}>
          <article className={classes.Result__TripTimes__TimeAndStation}>
            <time>{this.props.departureTime}</time>
            <p>{this.props.departureStation}</p>
          </article>
          <span>
            <img
              src={require("../../assets/Results/hourglass.svg")}
              alt="Hourglass"
              className={classes.Result__Hourglass}
            />
            {this.props.tripDuration}
          </span>
          <article className={classes.Result__TripTimes__TimeAndStation}>
            <time>{this.props.arrivalTime}</time>
            <p>{this.props.arrivalStation}</p>
          </article>
        </section>
        <span className={classes.Result__Price}>€{this.props.price}</span>
      </article>
    );
  }
}

export default Result;
