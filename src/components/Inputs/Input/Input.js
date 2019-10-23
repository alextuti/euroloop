import React, {Component} from 'react';

import classes from './Input.module.scss';

class Input extends Component{


    render(){

        let inputElement = null;

        switch(this.props.elementType){
            
            case ('radio'):
                inputElement =
                    <div className={classes.RadioInputContainer}>
                        <input
                            className={classes.RadioInput}
                            type={this.props.elementType}
                            name={this.props.name}
                            id={this.props.id}
                            value={this.props.value}
                            onClick={this.props.clicked}
                            checked={this.props.checked}
                            role="radio"
                            aria-checked={this.props.checked}
                            aria-label={this.props.labelText + 'journey'}/>
                        <label
                            className={classes.RadioInputLabel}
                            htmlFor={this.props.id}
                            aria-hidden="true">{this.props.labelText}</label>    
                    </div>;
                break;
            
            case 'text':
                inputElement = 
                    <input 
                        className={[
                            classes.TextInput,
                            classes[this.props.textPosition],
                            classes[this.props.position],
                            classes[this.props.icon]].join(' ')}
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-180vh)',
                            opacity: this.props.show ? '1' : '0'
                        }}
                        tabIndex={this.props.tabIndex}
                        role="button"
                        aria-label={this.props.ariaLabel}
                        type={this.props.elementType}
                        name={this.props.name}
                        id={this.props.id}
                        value={this.props.value}
                        onClick={this.props.clicked}
                        onKeyDown={this.props.clicked}
                        readOnly />;
                break;
            
            case 'hidden':
                inputElement = 
                        <input
                            className={classes.HiddenInputContainer}
                            type={this.props.elementType}
                            name={this.props.name}
                            value={this.props.value}/>
                    
                break;
            
            case 'submit':
                inputElement = 
                        <input 
                            className={[classes.SubmitInput, classes[this.props.gridArea]].join(' ')}
                            type={this.props.elementType}
                            name={this.props.name}
                            id={this.props.id}
                            value={this.props.value}/>;
                break;

            default:
                inputElement = null;
                    
        }

        return(
                inputElement
        )
    }
}


export default Input;