import React, { Component } from 'react';
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: ""
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.text === '') {
      this.props.setAlert('Please enter a name', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({text: ""});
    }
  }
  onChange = e => {
    const {name,value} = e.target;
    this.setState({[name]: value})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input 
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Search Users..."
          />
          <button className="btn btn-dark btn-block">Search</button>
        </form>
          {
            this.props.showClear && <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>
          }
          
      </div>
    )
  }
}

export default Search;