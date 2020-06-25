import React, { useState, useEffect } from "react";
import { userService } from "../services";
import "./index.css";
export const ViewUser = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(props.user);
  }, []);

  return (
    <div className="userDetails">
      <h2>User details</h2>

      <table>
        <tr>
          <td>User Id</td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>User Name</td>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>User Type</td>
          <td>{user.type}</td>
        </tr>
      </table>
      <br />
      <a
        className="btn btn-small btn-danger"
        onClick={() => {
          userService.deleteUserById(user.id).then((res) => {
            props.getUsers();
          });
        }}
      >
        delete
      </a>
    </div>
  );
};
