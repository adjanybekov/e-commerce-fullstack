import React, { useState, useEffect } from "react";
import { bookService } from "../../../services/bookService";

export const ViewBook = (props) => {
  const [book, setBook] = useState({});
  useEffect(() => {
    let book = props.book;
    console.log(book);
    book.picByte = "data:image/jpeg;base64," + book.picByte;
    // let reader = new FileReader();
    // reader.readAsDataURL(props.book.picByte);
    // reader.onload = (e) => {
    //   //   console.log(e.target.result);
    //   book.picByte = e.target.result;
    // };
    setBook(book);
  }, []);
  return (
    <div>
      <h1>Book Details</h1>
      <table>
        <tr>
          <td>Book Id</td>
          <td>{book.id}</td>
        </tr>
        <tr>
          <td>Book Name</td>
          <td>{book.name}</td>
        </tr>
        <tr>
          <td>Book Author</td>
          <td>{book.author}</td>
        </tr>
        <tr>
          <td>Book Price</td>
          <td>{book.price}</td>
        </tr>
      </table>
      <br />
      <img src={book.picByte} height="200" width="200" />
      <br />
      <br />
      <a
        class="btn btn-small btn-warning"
        onClick={() => props.handleEdit(book)}
      >
        edit
      </a>
      <a
        class="btn btn-small btn-danger"
        onClick={() => {
          bookService.deleteBookById(book.id).then((res) => {
            props.getBooks();
          });
        }}
      >
        delete
      </a>
    </div>
  );
};
