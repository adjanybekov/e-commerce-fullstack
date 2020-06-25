import React from "react";
import { AdminPage } from "./pages/AdminPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { BookPage } from "./pages/BookPage/BookPage";
import { ShopPage } from "./pages/ShopPage/ShopPage";
import { CartPage } from "./pages/CartPage/CartPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin/users" component={AdminPage} />
          <Route exact path="/admin/books" component={BookPage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/cart" component={CartPage} />
          <Redirect from="*" to="/admin/users" co />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
