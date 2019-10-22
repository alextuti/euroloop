import React, {Component} from 'react';
import classes from './Button.module.scss';

class Button extends Component{

    render(){

        // Assigning classes to Button based on different conditions 
        let buttonClasses = [classes.Button, classes[this.props.btnType]];

        return(
            <button 
                className={buttonClasses.join(' ')} 
                onClick={this.props.clicked}
                type={this.props.type} 
                disabled={this.props.disabled}
                autoFocus={this.props.focus}
                id={this.props.id}
                role={this.props.role}
                aria-label={this.props.ariaLabel}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1':'0'
                }}>{this.props.children}</button>
        )
    }
}

export default Button;
