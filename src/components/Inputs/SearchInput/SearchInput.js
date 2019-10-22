import React, {Component} from 'react';

import classes from './SearchInput.module.scss';
import hyperloopRoutes from '../../../data/hyperloopRoutes.json';

class SearchInput extends Component{


    state = {
        suggestions: [],
        onChange: false,
        inputValue: ''
    }

    inputChangeHandler = (e) =>{

        let suggestions = [];
        let searchText = null;

        searchText = e.target.value;
        const stations = hyperloopRoutes.map(element => element["City"]);
        if(searchText.length > 0){
            suggestions = stations.filter(station => {
                const regex = new RegExp(`^${searchText}`, 'gi');
                return this.props.oppositeValue !== station && station.match(regex);
            })
        }
            
        
        this.setState({suggestions: suggestions, onChange: suggestions.length > 0, inputValue: searchText});
        if(this.state.inputValue){
            this.props.id === 'departure' ? 
            this.props.sendDepartureInputValue(searchText) : this.props.sendArrivalInputValue(searchText);
        }
    }

    suggestionClickedHandler = (suggestion) =>{
        this.setState({inputValue: suggestion, onChange: false, suggestions: []});
        if(this.state.inputValue){
            this.props.id === 'departure' ? 
            this.props.sendDepartureInputValue(suggestion) : this.props.sendArrivalInputValue(suggestion);
        }
    }

    renderSuggestions = () =>{
        const suggestions = this.state.suggestions;
        if(suggestions.length > 0 && this.state.onChange){
            return (
                <ul 
                    className={classes.RecommendationList}
                    ref={this.suggestionListRef}
                    id={"recommendationList"+this.props.id}
                    role="listbox"
                    style={{
                        width: this.state.onChange && window.visualViewport.width < 1024 ? '100%' : `${document.getElementById('departure').offsetWidth}px`,
                        height: this.state.onChange && window.visualViewport.width < 1024 ? '100%' : '240px',
                        overflowY: this.state.onChange && window.visualViewport.width < 1024 ? 'unset': 'scroll',
                        paddingTop: this.state.onChange && window.visualViewport.width < 1024 ? '5%' : '5px',
                        left: this.state.onChange && window.visualViewport.width < 1024  ? '0' : 'unset'
                    }}>
                    {suggestions.map((suggestion, index) => 
                        <li
                            className={classes.RecommendationListItem}
                            id={'suggestionsOption' + index}
                            role="option"
                            aria-selected={index === 0}
                            onClick={() => this.suggestionClickedHandler(suggestion)}
                            key={suggestion}>
                            <span>{suggestion}</span>
                        </li>)}
                </ul>
            ) 
        } else{
            return null;
        }
    }


    render(){

        return (
            <div 
                className={classes[this.props.gridArea]}
                role="combobox"
                aria-owns={"recommendationList" + this.props.id}
                aria-controls={"recommendationList" + this.props.id}
                aria-expanded={this.state.onChange}
                style={{
                    position: this.state.onChange && window.visualViewport.width < 1024 ? 'fixed' : 'relative',
                    top: this.state.onChange && window.visualViewport.width < 1024 ? '0' : 'initial',
                    zIndex: this.state.onChange && window.visualViewport.width < 1024 ? '2500' : 'initial'
                }}>
                <label 
                    htmlFor={this.props.id} 
                    className={classes.Label}
                    style={{
                        transform: this.state.onChange && window.visualViewport.width < 1024 ? 'translateY(-180vh)': 'translateY(0)'
                    }}>{this.props.labelName}</label>
                <input 
                    className={classes.SearchInput} 
                    id={this.props.id}
                    name={this.props.name}
                    value={this.state.inputValue}
                    onChange={this.inputChangeHandler}
                    aria-controls={"recommendationList" + this.props.id}
                    aria-autocomplete="list"
                    aria-activedescendant="suggestionsOption0"
                    style={{
                        borderRadius: this.state.onChange && window.visualViewport.width < 1024 ? '0' : '6px',
                        borderBottomLeftRadius: this.state.onChange ? '0px': '6px',
                        borderBottomRightRadius:this.state.onChange ? '0px': '6px',
                        position: this.state.onChange && window.visualViewport.width < 1024  ? 'fixed': 'relative',
                        zIndex: this.state.onChange && window.visualViewport.width < 1024  ? '2500': 'unset',
                        top: this.state.onChange && window.visualViewport.width < 1024  ? '0' : 'none',
                        left: this.state.onChange && window.visualViewport.width < 1024  ? '0' : 'unset'
                    }}/>
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default SearchInput;