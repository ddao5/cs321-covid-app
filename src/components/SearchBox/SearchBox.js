import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classes from "./SearchBox.module.css";
class SearchBox extends Component {
    state = {
        suggestions: [],
        text: ''
    }
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestions = this.props.items.sort().filter((v) => regex.test(v));
        }
        this.setState({suggestions: suggestions, text: value});
    }
    suggestionSelected = (value) => {
        this.setState({suggestions: [], text: value});
    }
    renderSuggestions = () => {
        const {suggestions} = this.state;
        if(suggestions.length === 0) return null;
        return (
            <ul>
                {suggestions.map((item, index) => (
                    <li onClick = {() => this.suggestionSelected(item)} key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
    render() {
        return (
            <div className = {classes.SearchBox}>
                <input value = {this.state.text} onChange = {this.onTextChanged} type = "text" />
                {this.renderSuggestions()}
                <button type="submit"><FontAwesomeIcon icon={faSearch} color="#092c74"/></button>
            </div>
        );
    }
}
export default SearchBox;