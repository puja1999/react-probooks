import React, { Component } from "react";
import "../styles/search.css";
import BooksComp from "./BooksComp";


export default class Search extends Component {
  constructor() {
    super();
    this.state = { totalItem: 0 };
  }
  changeHandler = (e) => {
    //getting response from api based on our search
    var query = e.target.value;
    fetch("https://reactnd-books-api.udacity.com/search", {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.books,
          totalItem: res.books.length,
          value: "all",
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    //after getting response from api we call book component to display books
    return (
      <>
        <input
          id="searchbar"
          type="text"
          onChange={this.changeHandler}
          placeholder="Search for a book"
        ></input>
        <div id="books-found">{this.state.total} Books found</div>
        {this.state.value && (
          <>
            <BooksComp
              value={this.state.value}
              list={this.state.list}
              search={this.props.change}
            />
          </>
        )}
      </>
    );
  }
}
