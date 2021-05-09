import React from "react";
import "../styles/books.css";

//this component actually returns the book list
function BooksComp(props) {
  return (
    <div className="books">
      {props.value === "reading" && (
        <>
          {props.items.map((val, index) => (
            <div className="info">
              <div>
                <img src={val.imageLinks.smallThumbnail} alt="" />
                <select
                  name="type"
                  onChange={(e) => props.change(e, "reading", index)}
                >
                  <option value="select the option" selected disabled>
                    Select options
                  </option>
                  <option value="reading">Reading</option>
                  <option value="likes">Likes</option>
                  <option value="dislikes">Dislikes</option>
                  <option value="delete">Delete</option>
                </select>
              </div>
              <div>{val.title}</div>
              <div>{val.authors}</div>
            </div>
          ))}
        </>
      )}
      {props.value === "likes" && (
        <>
          {props.items.map((val, index) => (
            <div className="info">
              <div>
                <img src={val.imageLinks.smallThumbnail} alt="" />
                <select
                  name="type"
                  onChange={(e) => props.change(e, "likes", index)}
                >
                  <option value="select the option" selected disabled>
                    Select options
                  </option>
                  <option value="reading">Reading</option>
                  <option value="likes">Likes</option>
                  <option value="dislikes">Dislikes</option>
                  <option value="delete">Delete</option>
                </select>
              </div>
              <div>{val.title}</div>
              <div>{val.authors}</div>
            </div>
          ))}
        </>
      )}
      {props.value === "dislikes" && (
        <>
          {props.items.map((val, index) => (
            <div className="info">
              <div>
                <img src={val.imageLinks.smallThumbnail} alt="" />
                <select
                  name="type"
                  onChange={(e) => props.change(e, "dislikes", index)}
                >
                  <option value="select the option" selected disabled>
                    Select options
                  </option>
                  <option value="reading">Reading</option>
                  <option value="likes">Likes</option>
                  <option value="dislikes">Dislikes</option>
                  <option value="delete">Delete</option>
                </select>
              </div>
              <div>{val.title}</div>
              <div>{val.authors}</div>
            </div>
          ))}
        </>
      )}
      {props.value === "all" && (
        <div className="search">
          {props.list.map((val, index) => (
            <div className="info">
              <div>
                <img src={val.imageLinks.smallThumbnail} alt="" />
                <select name="type" onChange={(e) => props.search(e, val)}>
                  <option value="select the option" selected disabled>
                    Select options
                  </option>
                  <option value="reading">Reading</option>
                  <option value="likes">Likes</option>
                  <option value="dislikes">Dislikes</option>
                </select>
              </div>
              <div>{val.title}</div>
              <div>{val.authors}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default BooksComp;
