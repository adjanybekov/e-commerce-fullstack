import React, { useState, useEffect } from "react";
import { bookService } from "../../../services/bookService";
import { AddBook } from "./AddBook";
import { ViewBook } from "./ViewBook";

export const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    bookService.getBooks().then((res) => {
      console.log(res.data, "reloading page");
      setBooks(res.data);
    });
    setAddVisible(false);
    setViewVisible(false);
  }

  async function getBookById(id) {
    setAddVisible(false);
    setViewVisible(false);
    console.log(id);
    await bookService.getBookById(id).then((res) => {
      //   console.log(res.data);
      setBook(res.data);
    });
    setViewVisible(true);
  }

  function handleEdit(book) {
    setBook(book);
    setAddVisible(true);
    setViewVisible(false);
  }

  return (
    <div>
      <h1>Books Admin</h1>
      <a
        class="btn btn-primary mb-3"
        onClick={() => {
          setBook(null);
          setAddVisible(true);
          setViewVisible(false);
        }}
      >
        Add New Book
      </a>
      <div class="container row">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => {
                          getBookById(book.id);
                        }}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          {addVisible && <AddBook getBooks={getBooks} book={book} />}
          {viewVisible && book && (
            <ViewBook book={book} getBooks={getBooks} handleEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
};
