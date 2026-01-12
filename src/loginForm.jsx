import "./loginForm.css";
import { useState } from "react";

export default function LoginForm({ isOpen, setIsOpen, setSign, sign }) {
  return (
    <div
      id="modal-form"
      style={{ display: isOpen ? "flex" : "none" }}
      onSubmit={(e) => {
        e.preventDefault();
        sign.password.length < 6
          ? alert("Password must contain at least 6 characters")
          : setIsOpen(false);
      }}
    >
      <form id="form-box">
        <h3>Sign In Form</h3>

        <div className="input-group" id="name-input">
          <input
            type="text"
            id="username"
            name="username"
            placeholder=" "
            value={sign.username}
            required
            onChange={(e) => setSign({ ...sign, username: e.target.value })}
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="input-group" id="pass-input">
          <input
            type="password"
            id="password"
            placeholder=" "
            required
            name="username"
            value={sign.password}
            onChange={(e) => setSign({ ...sign, password: e.target.value })}
          />
          <label htmlFor="password">Password</label>
        </div>
        <p>**Must conains at least 6 characters**</p>

        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
