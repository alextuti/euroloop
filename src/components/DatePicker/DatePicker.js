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
        this.props.getSelectedDate(date.toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}));
    }


    render(){
        let currentMonth = this.state.currentDate.toLocaleString('default', {month: 'long'});
        let currentYear = this.state.currentDate.toLocaleString('default', {year: 'numeric'});
        let nextMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
        let previousMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
        let firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1).getDay() === 0 ? 7: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1).getDay();
        let lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth()+1, -1).getDate()

        // This array holds objects that represent the dates in the calendar for the current month/year
        let calendarDaysArray=[];
        for(let i=1; i<43; i++){
            if(i<firstDay || i>lastDay + firstDay){
                calendarDaysArray.push({
                    // The empty sloths' key is composed of the current month/year + a unique number (the iterator)
                    key: currentMonth + currentYear + i,
                    dayNumber: null,
                    disabled: true
                })
            }else{
                calendarDaysArray.push({
                    // The key is the date itself as there are no two identical dates possible
                    key: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), i-firstDay+1),
                    dayNumber: i - firstDay + 1,
                    disabled: false
                })
            }
        }
        
        let calendarDays = calendarDaysArray.map(element => {
                return <Button 
                btnType="Customizable"
                clicked={(event) => this.dateClickedHandler(event, element.key)}
                key={element.key}
                disabled={element.disabled}
                focus={this.props.confirmedDate === element.key.toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'})}
                show>{element.dayNumber}</Button>
        });   

        return(
            <div className={classes.DatePicker}>
                <section className={classes.Header}>
                    <Button 
                        btnType="Customizable"
                        clicked={this.monthBackHandler}
                        type="button"
                        ariaLabel={"Previous month, " + previousMonth.toLocaleString('default', {month: 'long'}) + ' ' + previousMonth.toLocaleString('default', {year: 'numeric'})}
                        show><img src={arrow} style={{transform: 'rotate(180deg)'}} alt="arrow left"></img></Button>
                    <header 
                        className={classes.Title}
                        aria-label={"Current month, " + currentMonth + ' ' + currentYear}>{currentMonth} {currentYear}</header>
                    <Button 
                        btnType="Customizable"
                        clicked={this.monthForwardHandler}
                        type="button"
                        ariaLabel={"Next month, " + nextMonth.toLocaleString('default', {month: 'long'}) + ' ' + nextMonth.toLocaleString('default', {year: 'numeric'}) }
                        show><img src={arrow} alt="arrow right"></img></Button>
                </section>
                <ul className={classes.WeekDaysList}>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                        <li>Sun</li>
                </ul>
                <div className={classes.DaysContainer}>
                    {calendarDays}
                </div>
            </div>
        )
    }
}

export default DatePicker;