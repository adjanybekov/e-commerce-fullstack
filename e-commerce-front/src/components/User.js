import React, { useState, useEffect } from "react";
import { AddUser } from "./AddUser";
import { userService } from "../services";
import { ViewUser } from "./ViewUser";

export const User = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);

  useEffect(() => {
    // const user1 = { id: 1, name: "admin", type: "admin", password: "admin" };
    // const user2 = { id: 1, name: "user", type: "user", password: "user" };

    // let users = [];
    // users.push(user1);
    // users.push(user2);
    // setUsers(users);

    getUsers();
  }, []);

  function getUsers() {
    userService.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }

  async function getUserById(id) {
    setAddVisible(false);
    setViewVisible(false);
    console.log(id);
    await userService.getUserById(id).then((res) => {
      //   console.log(res.data);
      setUser(res.data);
    });
    setViewVisible(true);
  }

  return (
    <div>
      <h1>Users Admin</h1>
      <a
        className="btn btn-primary mb-3"
        onClick={() => {
          setAddVisible(true);
          setViewVisible(false);
        }}
      >
        add
      </a>
      <div className="container row">
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          getUserById(user.id);
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
        <div className="col-md-6">
          {addVisible && <AddUser getUsers={getUsers} />}
          {viewVisible && <ViewUser user={user} getUsers={getUsers} />}
        </div>
      </div>
    </div>
  );
};
