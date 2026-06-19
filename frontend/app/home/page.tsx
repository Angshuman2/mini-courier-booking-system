"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    packageType: "",
    packageWeight: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const [activeSection, setActiveSection] = useState("home");
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {

    const fetchBookings = async () => {
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

    fetchBookings();

    const socket = io(
      "https://mini-courier-booking-system.onrender.com"
    );

    socket.on(
      "new-booking",
      () => {
        fetchBookings();
      }
    );

    socket.on(
      "booking-updated",
      () => {
        fetchBookings();
      }
    );

    return () => {
      socket.disconnect();
    };

  }, []);

  const handleBooking = async () => {
    try {

      const response = await fetch(
        "https://mini-courier-booking-system.onrender.com/api/courier/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const refreshResponse = await fetch(
        "https://mini-courier-booking-system.onrender.com/api/courier",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedBookings =
        await refreshResponse.json();

      setBookings(updatedBookings);

      setFormData({
        senderName: "",
        senderPhone: "",
        receiverName: "",
        receiverPhone: "",
        packageType: "",
        packageWeight: "",
      });

      setShowBookingForm(false);

      alert("Booking Created Successfully");

    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleTrackShipment = async () => {
    try {
      const response = await fetch(
        `https://mini-courier-booking-system.onrender.com/api/courier/track/${trackingId}`
      );

      const data = await response.json();

      setTrackingResult(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">🚚 CourierFlow</div>

          <ul className="nav-links">
            <li><a
              href="#home"
              className={activeSection === "home" ? "active" : ""}
            >
              Home
            </a></li>
            <li><a
              href="#booking"
              className={activeSection === "booking" ? "active" : ""}
            >
              Book Courier
            </a></li>
            <li><a
              href="#tracking"
              className={activeSection === "tracking" ? "active" : ""}
            >
              Track Shipment
            </a></li>
            <li>
              <a
                href="#dashboard"
                className={
                  activeSection === "dashboard"
                    ? "active"
                    : ""
                }
              >
                Dashboard
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  const confirmLogout = window.confirm(
                    "Are you sure you want to logout?"
                  );

                  if (confirmLogout) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    window.location.href = "/";
                  }
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <div id="home" className="hero">
          <div className="hero-content">
            <h1>Fast, Secure & Reliable Courier Service</h1>

            <p>
              Create bookings, track shipments in real-time,
              and manage deliveries effortlessly.
            </p>

            <div className="hero-buttons">
              <a href="#booking" className="btn primary-btn">
                Book Courier
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="booking" className="features">
        <h2>Book Your Courier</h2>

        <div className="feature-card">
          <div className="icon">📦</div>

          <h3>Create Booking</h3>

          <p>
            Enter sender and receiver details to create
            a courier booking.
          </p>

          <button
            className="done-btn"
            onClick={() => setShowBookingForm(true)}
          >
            Create Booking
          </button>
        </div>
      </section>

      <section id="tracking" className="tracking">

        <h2>Track Your Shipment</h2>

        <div className="tracking-box">
          <input
            type="text"
            placeholder="Enter Tracking Number"
            value={trackingId}
            onChange={(e) =>
              setTrackingId(e.target.value)
            }
          />

          <button
            onClick={handleTrackShipment}
          >
            Track Shipment
          </button>
        </div>

        {trackingResult && (
          <div className="tracking-result">

            <h3>Shipment Details</h3>

            <p>
              <strong>Tracking ID:</strong>{" "}
              {trackingResult.trackingId}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {trackingResult.status}
            </p>

            <p>
              <strong>Created Date:</strong>{" "}
              {new Date(
                trackingResult.createdAt
              ).toLocaleString()}
            </p>

          </div>
        )}

        <p
          style={{
            marginTop: "20px",
            color: "#cbd5e1"
          }}
        >
          Enter your tracking number to check the latest
          shipment status.
        </p>

      </section>

      <section id="dashboard" className="dashboard">

        <h2>Customer Dashboard</h2>

        <div className="table-wrapper">

          <table className="dashboard-table">

            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Tracking ID</th>
                <th>Receiver Name</th>
                <th>Package Weight</th>
                <th>Booking Status</th>
              </tr>
            </thead>

            <tbody>

              {bookings.length > 0 ? (
                bookings.map((booking: any) => (
                  <tr key={booking._id || booking.bookingId}>
                    <td>{booking.bookingId}</td>

                    <td>
                      {booking.trackingId || "Not Generated"}
                    </td>

                    <td>{booking.receiverName}</td>

                    <td>
                      {booking.packageWeight} g
                    </td>

                    <td>
                      <span
                        className={`status ${(
                          booking.status ?? "Pending"
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {booking.status ?? "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    No Booking Data Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {showBookingForm && (
        <div className="modal-overlay">

          <div className="booking-modal">

            <h2>Create Booking</h2>

            <input
              type="text"
              placeholder="Sender Name"
              value={formData.senderName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Sender Phone"
              value={formData.senderPhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderPhone: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Receiver Name"
              value={formData.receiverName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  receiverName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Receiver Phone"
              value={formData.receiverPhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  receiverPhone: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Package Type"
              value={formData.packageType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  packageType: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Package Weight (g)"
              value={formData.packageWeight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  packageWeight: e.target.value,
                })
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowBookingForm(false)}
              >
                Cancel
              </button>

              <button
                className="done-btn"
                onClick={handleBooking}
              >
                Done
              </button>

            </div>

          </div>

        </div>
      )}

      <footer>
        <p>© 2026 CourierFlow. All Rights Reserved.</p>
      </footer>
    </>
  );
}