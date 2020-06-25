import React, { useState, useEffect } from "react";
import { userService } from "../services";

export const AddUser = (props) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [password, setPassword] = useState(null);

  function submit() {
    userService.addUser({ name, type, password }).then((res) => {
      console.log(res.data);
      props.getUsers();
    });
  }

  return (
    <div>
      <h1>Add User</h1>
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="user name"
          name="name"
          value={name}
          onChange={(e) => {
            console.log(name);
            setName(e.target.value);
          }}
        />

        <label for="type">Type</label>
        <input
          type="text"
          class="form-control"
          id="type"
          placeholder="type role"
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />

        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <br />
        <button type="button" class="btn btn-success" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
};
