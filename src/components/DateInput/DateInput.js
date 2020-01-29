import React, { Component } from "react";
import DatePicker from "../DatePicker/DatePicker";
import Input from "../Inputs/Input/Input";

import classes from "./DateInput.module.scss";

class DateInput extends Component {
  state = {
    inputClicked: false,
    confirmedDate: new Date().toLocaleString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }),
    confirmedDateRaw: new Date()
  };

  inputClickedHandler = () => {
    this.setState(prevState => ({ inputClicked: !prevState.inputClicked }));
  };

  cancelButtonHandler = () => {
    this.setState(prevState => ({ inputClicked: !prevState.inputClicked }));
    this.setState({ currentDate: null });
  };
  // Get the selected date and display it on the read-only input upon clicking on it
  getSelectedDate = selectedDate => {
    this.setState({
      confirmedDate: selectedDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      confirmedDateRaw: selectedDate
    });

    this.props.for === "departure"
      ? this.props.selectedDepartureDate(selectedDate)
      : this.props.selectedReturnDate(selectedDate);
    this.cancelButtonHandler();
  };

  clickedOutsideHandler = () => {
    if (this.state.inputClicked) {
      this.setState({ inputClicked: false });
    }
  };

  render() {
    console.log();

    return (
      <div
        className={[
          classes.DateInput,
          this.props.for === "departure" ? classes.Departure : classes.Return
        ].join(" ")}
        aria-hidden={!this.props.show}
        tabIndex="-1"
        style={{
          opacity: this.props.show ? "1" : "0"
        }}
      >
        {/* The read-only input that holds the chosen date and gives access to the calendar widget */}
        <Input
          elementType="text"
          name={this.props.for + "Date"}
          id={this.props.for + "-date"}
          value={this.state.confirmedDate}
          clicked={this.inputClickedHandler}
          show={this.props.show}
          textPosition="RightAlignedText"
          position={this.props.position}
          tabIndex={this.props.show ? "0" : "-1"}
          ariaHidden={!this.props.show}
          ariaLabel={`Current ${this.props.for} date: 
                        ${this.state.confirmedDateRaw.toLocaleString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}, open to change`}
          icon="Calendar"
        />

        {/* The container that holds the date picker and the other functionality buttons */}
        <section
          className={classes.DatePickerContainer}
          role="presentation"
          aria-hidden={!this.props.show}
          style={{
            display: this.state.inputClicked ? "block" : "none"
          }}
          id={"date-picker-" + this.props.for}
        >
          {/* Upper part of the calendar used for mobiles/tablets */}
          <section className={classes.DatePickerHead}>
            <span
              className={classes.DatePickerCancel}
              onClick={this.cancelButtonHandler}
            >
              {"<"}
            </span>
            <span>
              {this.props.for === "departure"
                ? "Departure date"
                : "Return date"}
            </span>
          </section>

          <DatePicker
            getSelectedDate={this.getSelectedDate}
            for={this.props.for}
            ariaHidden={!this.props.show}
            inputClicked={this.state.inputClicked}
            confirmedDate={this.state.confirmedDate}
            oppositeCalendarValue={this.props.oppositeValue}
            clickedOutside={this.clickedOutsideHandler}
          />
        </section>
      </div>
    );
  }
}

export default DateInput;
