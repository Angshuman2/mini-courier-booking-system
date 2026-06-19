"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courier_1 = __importDefault(require("../models/courier"));
const auth_1 = require("../middleware/auth");
const server_1 = require("../server");
const admin_1 = require("../middleware/admin");
const router = express_1.default.Router();
const generateBookingId = async () => {
    let bookingId;
    let exists = true;
    while (exists) {
        bookingId =
            "BK" +
                Math.floor(100000 + Math.random() * 900000);
        const existingCourier = await courier_1.default.findOne({
            bookingId,
        });
        exists = !!existingCourier;
    }
    return bookingId;
};
const generateTrackingId = async () => {
    let trackingId;
    let exists = true;
    while (exists) {
        trackingId =
            "TRK" +
                Math.floor(100000 + Math.random() * 900000);
        const existingCourier = await courier_1.default.findOne({
            trackingId,
        });
        exists = !!existingCourier;
    }
    return trackingId;
};
router.post("/book", auth_1.protect, async (req, res) => {
    try {
        const bookingId = await generateBookingId();
        const courier = await courier_1.default.create({
            ...req.body,
            bookingId,
            status: "Pending",
        });
        server_1.io.emit("new-booking", courier);
        res.status(201).json(courier);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/track/:trackingId", async (req, res) => {
    try {
        const courier = await courier_1.default.findOne({
            trackingId: req.params.trackingId,
        });
        if (!courier) {
            return res.status(404).json({
                message: "Tracking ID not found",
            });
        }
        res.json(courier);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.put("/approve/:id", auth_1.protect, admin_1.adminOnly, async (req, res) => {
    try {
        const trackingId = await generateTrackingId();
        const courier = await courier_1.default.findByIdAndUpdate(req.params.id, {
            status: "Approved",
            trackingId,
        }, { new: true });
        server_1.io.emit("booking-updated", courier);
        res.json(courier);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.put("/reject/:id", auth_1.protect, admin_1.adminOnly, async (req, res) => {
    try {
        const courier = await courier_1.default.findByIdAndUpdate(req.params.id, {
            status: "Rejected",
        }, { new: true });
        server_1.io.emit("booking-updated", courier);
        res.json(courier);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.put("/status/:id", auth_1.protect, admin_1.adminOnly, async (req, res) => {
    try {
        const { status } = req.body;
        const courier = await courier_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        server_1.io.emit("booking-updated", courier);
        res.json(courier);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/", auth_1.protect, async (req, res) => {
    const couriers = await courier_1.default.find();
    res.json(couriers);
});
exports.default = router;
//# sourceMappingURL=courierRoutes.js.map