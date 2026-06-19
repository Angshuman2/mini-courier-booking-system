import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";
import courierRoutes from "./routes/courierRoutes";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

dns.setServers(["8.8.8.8", "8.8.4.4"]);
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/courier",courierRoutes);

app.get("/", (req, res) => {
  res.send("CourierFlow API Running...");
});

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});