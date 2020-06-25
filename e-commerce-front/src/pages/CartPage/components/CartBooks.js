import React, { useState, useEffect, useMemo } from "react";
import { bookService } from "../../../services/bookService";

export const CartBooks = (props) => {
  const [books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    getBooks();
    initCart();
  }, []);

  function getBooks() {
    bookService.getBooks().then((res) => {
      // console.log(res.data);
      let books = [];
      res.data.map((book) => {
        if (book.picByte != null) {
          book.picByte = "data:image/jpeg;base64," + book.picByte;
        }
        books.push(book);
      });
      setBooks(books);
    });
    // setAddVisible(false);
    // setViewVisible(false);
  }

  function initCart() {
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    setCartBooks(cart);
  }

  function deleteFromCart(bookId) {
    let cart = [];

    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let book = books.find((book) => {
      return book.id == bookId;
    });
    console.log(cart, "before");
    cart.splice(book, 1);

    console.log(cart, "after");
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartBooks(cart);
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setCartBooks([]);
  }

  function totalPayment() {
    let total = 0;
    for (let i = 0; i < cartBooks.length; i++) {
      total += cartBooks[i].price;
    }
    return total;
  }
  const total = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cartBooks.length; i++) {
      total += cartBooks[i].price;
    }
    return total;
  });

  return (
    <div>
      <div class="container row">
        <div class="col-md-2">
          <h1>Cart</h1>
        </div>
        <div class="col-md-10 custom-products-cart-container">
          <div class="offset-md-8">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <br />
                <a
                  href="#"
                  className="btn btn-lg btn-success"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <span class="fa fa-shopping-cart">Proceed to payment:</span>
                  <span class="caret">{total}$</span>
                </a>
                <ul class="dropdown-menu dropdown-cart" role="menu">
                  {cartBooks.map((item) => {
                    return (
                      <li>
                        <div class="item product-cart-item row">
                          <div class="col-md-8">{item.name}</div>
                          <div class="col-md-4">
                            <strong>${item.price}</strong>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <hr />
                  <li>
                    <a class="btn btn-small btn-success" role="button">
                      View Cart
                    </a>
                  </li>
                  <br />
                  {cartBooks.length > 0 && (
                    <li>
                      <a
                        class="btn btn-small btn-warning"
                        role="button"
                        onClick={emptyCart}
                      >
                        Empty Cart
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr />
      <hr />

      <ul style={{ display: "block" }}>
        {cartBooks.map((book) => {
          return (
            <li>
              <div className="container row">
                <div className="col-md-6">
                  <div className="container row">
                    <div className="col-md-6">
                      <img
                        className="custom-image-style"
                        height="200"
                        width="200"
                        src={book.picByte}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <div
                      className="col-md-6"
                      // style={{ marginLeft: "60px", marginTop: "10px" }}
                    >
                      <p style={{ marginLeft: "60px" }}>
                        <strong>
                          {book.name}: ${book.price}
                        </strong>
                      </p>
                      <div
                        className=""
                        style={{
                          marginLeft: "60px",
                          bottom: "0",
                          position: "absolute",
                        }}
                      >
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteFromCart(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
