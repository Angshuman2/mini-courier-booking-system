"use client";

import { useState } from "react";
import "../auth.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://mini-courier-booking-system.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (data.token) {

                if (data.user.role !== "admin") {
                    alert("Admin account required");
                    return;
                }

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                window.location.href = "/admin";

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
        } finally {

            setEmail("");
            setPassword("");

        }
    };
    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="left-panel">
                    <h1>🚚 CourierFlow</h1>

                    <p>
                        Fast, secure and reliable courier management.
                        Track shipments, manage bookings and deliver with confidence.
                    </p>
                </div>

                <div className="auth-card">
                    <h2>Admin Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <p className="bottom-text">
                        Customer?

                        <a href="/">
                            Customer Login
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}