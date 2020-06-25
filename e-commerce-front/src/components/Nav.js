import React from "react";

export const Nav = (props) => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="https://www.javainuse.com" className="navbar-brand">
              JavaInUse
            </a>
          </div>

          <ul className="navbar-nav">
            <li>
              <a class="nav-link" href="/shop">
                Shop
              </a>
            </li>
            <li>
              <a class="nav-link" href="/cart">
                Cart
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a href="/admin/users" className="dropdown-item">
                  Users
                </a>
                <a href="/admin/books" className="dropdown-item">
                  Books
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
