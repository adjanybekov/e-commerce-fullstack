import React, { useState, useEffect } from "react";
import { bookService } from "../../../services/bookService";

export const ShopBook = (props) => {
  const [books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getBooks();
    initCart();
  }, []);

  function getBooks() {
    setVisible(false);
    bookService.getBooks().then((res) => {
      console.log(res.data);
      let books = [];
      res.data.map((book) => {
        if (book.picByte != null) {
          book.picByte = "data:image/jpeg;base64," + book.picByte;
        }
        books.push(book);
      });
      setBooks(books);
      setVisible(true);
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

  function addToCart(bookId) {
    let cart = [];

    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(localStorage.getItem("cart"), "cart");

    let book = books.find((book) => {
      return book.id == bookId;
    });

    let exists = cart.find((pook) => {
      return pook.id === book.id;
    });
    console.log(cart, cartBooks);

    if (!exists) {
      cart.push(book);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setCartBooks(cart);
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setCartBooks([]);
  }

  return (
    <div>
      <div class="container row">
        <div class="col-md-2">
          <h1>Books</h1>
        </div>
        <div class="col-md-10 custom-products-cart-container">
          <div class="offset-md-8">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <br />
                <a
                  href="#"
                  class="btn btn-info btn-lg"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <span class="fa fa-shopping-cart">Books Added In Cart:</span>
                  <span class="caret">{cartBooks.length}</span>
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
                    <a
                      className="btn btn-small btn-success"
                      role="button"
                      href="/cart"
                    >
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

      {!visible ? (
        <div>Loading...</div>
      ) : (
        <div className="container row">
          {books.map((book) => {
            return (
              <div className="col-md-4">
                <div className="card card-block">
                  <img
                    className="custom-image-style"
                    height="300"
                    width="200"
                    src={book.picByte}
                    style={{ marginLeft: "60px", marginTop: "10px" }}
                  />
                  <div className="book-desc-container row">
                    <div>
                      <p style={{ marginLeft: "60px" }}>
                        <strong>
                          {book.name}: ${book.price}
                        </strong>
                      </p>
                      <p style={{ marginLeft: "60px" }}>{book.author}</p>
                    </div>
                    <div className="offset-md-4 col-md-4">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(book.id)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
