import React, { Component } from "react";
import "../styles/home.css";
import BooksComp from "./BooksComp";
import Search from "../components/Search";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      readingItem: "",
      likeItem: "",
      dislikeItem: "",
      isrender: "", //to decide which component should render(home or search)
    };
  }

  getBooks() {
    //geting the details of books from api
    fetch("https://reactnd-books-api.udacity.com/books", {
        headers: {
            Authorization: "whatever-you-want",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })
      .then((res) => res.json())
      .then((data) => {
        // putting 3 books in each section
        var readings = data.books.slice(0, 3);
        var likes = data.books.slice(3, 6);
        var dislikes = data.books.slice(6, 7);

        //after getting response from api, set the response as a state
        this.setState({
          readingItem: readings,
          likeItem: likes,
          dislikeItem: dislikes,
          isrender: "home",
        });
      });
  }
  componentDidMount() {
    // calling getBooks function as soon as page refresh
    this.getBooks();
  }

  nextPage = () => {
    //once the search button is clicked we have to render the search component
    this.setState({ isrender: "search" });
  };

  searchForBook = (e, item) => {
    //when user select the options from search result
    //console.log(this.state.readingItem)
    var read = this.state.readingItem;
    var like = this.state.likeItem;
    var dislike = this.state.dislikeItem;
    if (e.target.value === "reading") {
      read.push(item);
      this.setState({ readingItem: read, isrender: "home" });
    } else if (e.target.value === "likes") {
      like.push(item);
      this.setState({ likeItem: like, isrender: "home" });
    } else if (e.target.value === "dislikes") {
      dislike.push(item);
      this.setState({ dislikeItem: dislike, isrender: "home" });
    }
  };

  onChangeHandler = (e, type, pos) => {
    //this function is used when user select options from any one of the section
    //select book based on reading, likes, dislikes and put into new selected section
    var read = this.state.readingItem;
    var like = this.state.likeItem;
    var dislike = this.state.dislikeItem;
    var selectedBook; //whenever the option of the books is changing this x holds that book.
    if (type === "reading") {
      if (e.target.value === "likes") {
        selectedBook = read.splice(pos, 1);
        selectedBook.forEach((item) => like.push(item));
      } else if (e.target.itemue === "dislikes") {
        selectedBook = read.splice(pos, 1);
        selectedBook.forEach((item) => dislike.push(item));
      } else if (e.target.value === "delete") {
        read.splice(pos, 1);
      }
    } else if (type === "likes") {
      if (e.target.value === "reading") {
        selectedBook = like.splice(pos, 1);
        selectedBook.forEach((item) => read.push(item));
      } else if (e.target.value === "dislikes") {
        selectedBook = like.splice(pos, 1);
        selectedBook.forEach((item) => dislike.push(item));
      } else if (e.target.value === "delete") {
        like.splice(pos, 1);
      }
    } else if (type === "dislikes") {
      if (e.target.value === "reading") {
        selectedBook = dislike.splice(pos, 1);
        selectedBook.forEach((item) => read.push(item));
      } else if (e.target.value === "likes") {
        selectedBook = dislike.splice(pos, 1);
        selectedBook.forEach((item) => like.push(item));
      } else if (e.target.value === "delete") {
        dislike.splice(pos, 1);
      }
    }
    this.setState({ readingItem: read, likeItem: like, dislikeItem: dislike });
  };

  render() {
    return (
      <div>
        {this.state.isrender === "home" && (
          <>
            <div className="lists">
              <h1>Reading</h1>
              <BooksComp
                items={this.state.readingItem}
                value="reading"
                change={this.onChangeHandler}
              />
            </div>

            <div className="lists">
              <h1>Likes</h1>
              <BooksComp
                items={this.state.likeItem}
                value="likes"
                change={this.onChangeHandler}
              />
            </div>

            <div className="lists">
              <h1>Dislikes</h1>
              <BooksComp
                items={this.state.dislikeItem}
                value="dislikes"
                change={this.onChangeHandler}
              />
            </div>
            <button id="addBtn" onClick={this.nextPage}>
              +
            </button>
          </>
        )}

        {this.state.isrender === "search" && (
          <Search lists={this.state} change={this.searchForBook} />
        )}
      </div>
    );
  }
}
