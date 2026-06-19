"use client";

import "../auth.css";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://mini-courier-booking-system.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {
      console.error(error);
    } finally {

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    }

    // API call will come later
  };
  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="left-panel">
          <h1>🚚 CourierFlow</h1>

          <p>
            Join our courier platform and manage
            deliveries from anywhere with
            real-time tracking.
          </p>
        </div>

        <div className="auth-card">

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                required
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit">
              Register
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?

            <Link href="/">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}