import axios from "axios";
import { urls } from "../static/constants";
export const bookService = {
  getBooks,
  addBook,
  addBookImage,
  deleteBookById,
  getBookById,
  updateBook,
};

function getBooks() {
  return axios({
    method: "GET",
    url: urls.booksUrl + "/list",
  });
}

function getBookById(id) {
  return axios({
    method: "GET",
    url: urls.booksUrl + "/" + id,
  });
}

function deleteBookById(id) {
  return axios({
    method: "DELETE",
    url: urls.booksUrl + "/" + id,
  });
}

function addBook({ name, author, price }) {
  console.log(name, author, price);
  const body = { name, author, price };
  return axios({
    method: "POST",
    url: urls.booksUrl + "/add",
    data: body,
  });
}

function updateBook({ id, name, author, price }) {
  console.log(name, author, price);
  const body = { id, name, author, price };
  return axios({
    method: "PUT",
    url: urls.booksUrl + "/update",
    data: body,
  });
}
function addBookImage(image) {
  const formData = new FormData();
  formData.append("file", image);

  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const headers2 = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  // return axios.post(urls.booksUrl + "/upload", formData, config);
  return axios({
    method: "POST",
    url: urls.booksUrl + "/upload",
    headers: headers,
    // config,
    // formData: formData,
    data: formData,
  });
}
