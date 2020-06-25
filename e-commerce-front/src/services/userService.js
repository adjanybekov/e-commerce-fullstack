import axios from "axios";
import { urls } from "../static/constants";
export const userService = { getUsers, addUser, getUserById, deleteUserById };

function getUsers() {
  return axios({
    method: "GET",
    url: urls.usersUrl + "/list",
  });
}

function getUserById(id) {
  return axios({
    method: "GET",
    url: urls.usersUrl + "/" + id,
  });
}

function deleteUserById(id) {
  return axios({
    method: "DELETE",
    url: urls.usersUrl + "/" + id,
  });
}

function addUser({ name, type, password }) {
  console.log(name, type, password);
  const body = { name, type, password };
  return axios({
    method: "POST",
    url: urls.usersUrl + "/add",
    data: body,
  });
}
