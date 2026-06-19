"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "./admin.css";

export default function Admin() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user") || "{}"
        );

        if (user.role !== "admin") {
            window.location.href = "/";
            return;
        }

        loadBookings();

        const socket = io(
            "https://mini-courier-booking-system.onrender.com"
        );

        socket.on(
            "new-booking",
            () => {
                loadBookings();
            }
        );

        socket.on(
            "booking-updated",
            () => {
                loadBookings();
            }
        );

        return () => {
            socket.disconnect();
        };

    }, []);

    const loadBookings = async () => {

        try {

            const response = await fetch(
                "https://mini-courier-booking-system.onrender.com/api/courier",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            setBookings(data);

        } catch (error) {
            console.error(error);
        }
    };

    const approveBooking = async (id: string) => {

        await fetch(
            `https://mini-courier-booking-system.onrender.com/api/courier/approve/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        loadBookings();
    };

    const rejectBooking = async (id: string) => {

        await fetch(
            `https://mini-courier-booking-system.onrender.com/api/courier/reject/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        loadBookings();
    };

    const updateStatus = async (
        id: string,
        status: string
    ) => {

        await fetch(
            `https://mini-courier-booking-system.onrender.com/api/courier/status/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status }),
            }
        );

        loadBookings();
    };

    const total = bookings.length;

    const pending = bookings.filter(
        (b: any) => b.status === "Pending"
    ).length;

    const approved = bookings.filter(
        (b: any) => b.status === "Approved"
    ).length;

    const delivered = bookings.filter(
        (b: any) => b.status === "Delivered"
    ).length;

    return (
        <div className="admin-container">

            <div className="admin-header">

                <h1>🚚 CourierFlow Admin</h1>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total</h3>
                    <p>{total}</p>
                </div>

                <div className="stat-card pending-card">
                    <h3>Pending</h3>
                    <p>{pending}</p>
                </div>

                <div className="stat-card approved-card">
                    <h3>Approved</h3>
                    <p>{approved}</p>
                </div>

                <div className="stat-card delivered-card">
                    <h3>Delivered</h3>
                    <p>{delivered}</p>
                </div>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Booking ID</th>
                            <th>Tracking ID</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Weight</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bookings.map((booking: any) => (

                            <tr key={booking._id}>

                                <td>{booking.bookingId}</td>

                                <td>
                                    {booking.trackingId || "-"}
                                </td>

                                <td>
                                    {booking.senderName}
                                </td>

                                <td>
                                    {booking.receiverName}
                                </td>

                                <td>
                                    {booking.packageWeight} g
                                </td>

                                <td>
                                    <span
                                        className={`status ${booking.status
                                            ?.toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>

                                <td>

                                    {booking.status ===
                                        "Pending" && (
                                            <>
                                                <button
                                                    className="approve-btn"
                                                    onClick={() =>
                                                        approveBooking(
                                                            booking._id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        rejectBooking(
                                                            booking._id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                    {booking.status ===
                                        "Approved" && (
                                            <button
                                                className="transit-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        booking._id,
                                                        "In Transit"
                                                    )
                                                }
                                            >
                                                In Transit
                                            </button>
                                        )}

                                    {booking.status ===
                                        "In Transit" && (
                                            <button
                                                className="deliver-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        booking._id,
                                                        "Delivered"
                                                    )
                                                }
                                            >
                                                Deliver
                                            </button>
                                        )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}