/* page for loading events on bootstrap cards */

import React from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import Book from "./Book";

class Events extends React.Component {
  state = {
    books: []
  };

  

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  componentDidMount() {
    const url = 'https://anapioficeandfire.com/api/books/';

    fetch(url)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        this.setState({
          books: result
        });
      });
  }

  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    const thisZip = this.props.zip;
    const { books } = this.state;
    return (
      <div>
        <Book bookData={books} />
        <div className="eventsPage">Zip entered was: {thisZip}</div>
        
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Events;
