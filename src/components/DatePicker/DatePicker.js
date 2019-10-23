import React, {Component} from 'react';
import Button from '../Buttons/Button/Button';

import classes from './DatePicker.module.scss';
import arrow from '../../assets/RouteFinder/arrow.svg'

class DatePicker extends Component{

    state = {
        currentDate: new Date(),
        clickedDate: null
    }

      
    monthBackHandler = () =>{
        this.setState((prevState)=>({
            currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth()-1, 1)
        }));
    }

    monthForwardHandler = () =>{
        this.setState((prevState)=>({
            currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth()+1, 1)
        }));
    }

    dateClickedHandler = (e, date) =>{
        e.preventDefault();
        this.setState({clickedDate: date });

        //Selected date is sent to the DateInput component
        this.props.getSelectedDate(date.toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}));
    }


    render(){
        // Getting the needed date variables that help auto-generate new calendar days/months/years
        let currentMonth = this.state.currentDate.toLocaleString('default', {month: 'long'});
        let currentYear = this.state.currentDate.toLocaleString('default', {year: 'numeric'});
        let nextMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
        let previousMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
        let firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1).getDay() === 0 ? 7: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1).getDay();
        let lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth()+1, -1).getDate()

        // Get the date format for a given day of the month
        const getCurrentDate = (day) =>{
            return new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), day);
        }

        // Get the day of the week for a given date
        const getWeekDay = (day) =>{
            let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            let weekDayNumber = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), day - 1).getDay();
            return weekdays[weekDayNumber];
        }

        // This array holds objects that represent the dates in the calendar for the current month/year
        let calendarDaysArray=[];
        for(let i=1; i<43; i++){
            let currentDay = i - firstDay + 1;
            if(i<firstDay || i>lastDay + firstDay){
                calendarDaysArray.push({
                    // The empty sloths' key is composed of the current month/year + a unique number (the iterator)
                    key: currentMonth + currentYear + i,
                    dayNumber: null,
                    disabled: true,
                    ariaHidden: !this.props.inputClicked
                })
            }else{
                calendarDaysArray.push({
                    // The key is the date itself as there are no two identical dates possible
                    key: getCurrentDate(currentDay),
                    dayNumber: currentDay,
                    // The dates before TODAY are disabled
                    disabled: 
                        getCurrentDate(currentDay).getMonth() === new Date().getMonth() &&
                        getCurrentDate(currentDay).getFullYear() === new Date().getFullYear() &&
                        getCurrentDate(currentDay).getDate() < new Date().getDate(),
                    ariaHidden: false,
                    ariaLabel: `${currentDay}, ${getWeekDay(currentDay)} ${currentMonth + ' ' + currentYear}`
                })
            }
        }
        
        // The calendar elements that hold the days of the month
        let calendarDays = calendarDaysArray.map(element => {
                return <Button 
                btnType="Customizable"
                clicked={(event) => this.dateClickedHandler(event, element.key)}
                key={element.key}
                disabled={element.disabled}
                ariaHidden={element.ariaHidden}
                ariaLabel={element.ariaLabel}
                show>{element.dayNumber}</Button>
        });   

        return(
            <div 
                className={classes.DatePicker}
                role="application"
                aria-label={`${this.props.for} Calendar, current month: ${currentMonth + ' ' + currentYear}`}
                aria-hidden={this.props.ariaHidden}>
                <section className={classes.Header}>
                    <Button 
                        btnType="Customizable"
                        clicked={this.monthBackHandler}
                        type="button"
                        // The month layouts for the months before the current one cannot be accessed
                        disabled={
                            currentMonth + currentYear ===
                            new Date().toLocaleString('default', {month: 'long'}) + new Date().toLocaleString('default', {year: 'numeric'})
                        }
                        ariaLabel={"Previous month, " + previousMonth.toLocaleString('default', {month: 'long'}) + ' ' + previousMonth.toLocaleString('default', {year: 'numeric'})}
                        show><img src={arrow} style={{transform: 'rotate(180deg)'}} alt="arrow left"></img></Button>
                    <header 
                        className={classes.Title}
                        aria-hidden="true">{currentMonth} {currentYear}</header>
                    <Button 
                        btnType="Customizable"
                        clicked={this.monthForwardHandler}
                        type="button"
                        ariaLabel={"Next month, " + nextMonth.toLocaleString('default', {month: 'long'}) + ' ' + nextMonth.toLocaleString('default', {year: 'numeric'}) }
                        show><img src={arrow} alt="arrow right"></img></Button>
                </section>
                <ul 
                    className={classes.WeekDaysList}
                    aria-hidden="true">
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                        <li>Sun</li>
                </ul>
                <div 
                    className={classes.DaysContainer}>
                    {calendarDays}
                </div>
            </div>
        )
    }
}

export default DatePicker;