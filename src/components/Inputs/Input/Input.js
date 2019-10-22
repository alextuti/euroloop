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
                            checked={this.props.checked}/>
                        <label
                            className={classes.RadioInputLabel}
                            for={this.props.id}>{this.props.labelText}</label>    
                    </div>;
                break;
            
            case 'text':
                inputElement = 
                    <div 
                        className={classes.TextInputContainer}
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-180vh)',
                            opacity: this.props.show ? '1' : '0'
                        }}>
                        <input 
                            className={[
                                classes.TextInput,
                                classes[this.props.textPosition],
                                classes[this.props.position],
                                classes[this.props.icon]].join(' ')}
                            role="button"
                            aria-label={this.props.ariaLabel}
                            type={this.props.elementType}
                            name={this.props.name}
                            id={this.props.id}
                            value={this.props.value}
                            onClick={this.props.clicked}
                            onKeyDown={this.props.clicked}
                            readOnly />
                    </div>;
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