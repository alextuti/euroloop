import React, {Component} from 'react';
import DatePicker from '../DatePicker/DatePicker';
import Button from '../Buttons/Button/Button';
import Input from '../Inputs/Input/Input';


import classes from './DateInput.module.scss';

class DateInput extends Component{

    state = {
        inputClicked: false,
        currentDate: null,
        confirmedDate: new Date().toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'}),
        confirmedDateRaw: new Date()
    }

    inputClickedHandler = () =>{
        this.setState((prevState) => ({inputClicked: !prevState.inputClicked}));
    }

    cancelButtonHandler = (e) =>{
        e.preventDefault();
        this.setState((prevState) => ({inputClicked: !prevState.inputClicked}));
        this.setState({currentDate: null});
    }

    getSelectedDate = (selectedDate) =>{
        this.setState({currentDate: selectedDate});
    }

    confirmDateHandler = (e) =>{
        e.preventDefault();
        if(this.state.currentDate){
            this.setState({confirmedDate: this.state.currentDate.toString(), confirmedDateRaw: this.state.currentDate})
        }
        this.cancelButtonHandler(e);
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    render(){
        console.log();
        
        return(
            <div 
                className={[classes.DateInput, this.props.for === 'departure' ? classes.Departure : classes.Return].join(' ')}
                aria-hidden={!this.props.show}
                tabIndex="-1"
                style={{
                    opacity: this.props.show ? '1' : '0'
                }}>
                <Input 
                    elementType="text"
                    name={this.props.for + 'Date'}
                    id={this.props.for + '-date'}
                    value={this.state.confirmedDate}
                    clicked={this.inputClickedHandler}
                    show={this.props.show}
                    textPosition="RightAlignedText"
                    position={this.props.position}
                    ariaHidden={!this.props.show}
                    tabIndex={this.props.show ? '0' : '-1'}
                    ariaLabel={`Current ${this.props.for} date: ${this.state.confirmedDateRaw.toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}, open to change`}
                    icon="Calendar" />
                <section 
                    className={classes.DatePickerContainer}
                    role="presentation"
                    aria-hidden={!this.props.show}
                    style={{
                        // transform: this.state.inputClicked ? 'translateY(0)' : 'translateY(-180vh)',
                        // opacity: this.state.inputClicked ? '1':'0'
                        display: this.state.inputClicked ? 'block' : 'none'
                    }}>
                    <section className={classes.DatePickerHead}>
                        <span
                            className={classes.DatePickerCancel} 
                            onClick={this.cancelButtonHandler}>{"<"}</span>
                        <span>{this.props.for === 'departure' ? 'Departure date': 'Return date'}</span>
                    </section>
                    <DatePicker 
                        getSelectedDate={this.getSelectedDate} 
                        for={this.props.for}
                        ariaHidden={!this.props.show}
                        inputClicked={this.state.inputClicked} 
                        confirmedDate={this.state.confirmedDate}/>
                    <Button 
                        btnType="Confirm" 
                        clicked={this.confirmDateHandler}
                        disabled={!this.state.currentDate}
                        ariaHidden={!this.props.show}
                        show>CONFIRM</Button>
                </section>
            </div>
        )
    }
}

export default DateInput;