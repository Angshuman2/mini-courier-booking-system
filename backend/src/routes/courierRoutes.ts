import express from "express";
import Courier from "../models/courier";
import { protect } from "../middleware/auth";
import { io } from "../server";
import { adminOnly } from "../middleware/admin";

const router = express.Router();

const generateBookingId = async () => {
    let bookingId;
    let exists = true;

    while (exists) {
        bookingId =
            "BK" +
            Math.floor(
                100000 + Math.random() * 900000
            );

        const existingCourier =
            await Courier.findOne({
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
            Math.floor(
                100000 + Math.random() * 900000
            );

        const existingCourier =
            await Courier.findOne({
                trackingId,
            });

        exists = !!existingCourier;
    }

    return trackingId;
};

router.post("/book", protect, async (req: any, res) => {
    try {
        const bookingId =
            await generateBookingId();

        const courier =
            await Courier.create({
                ...req.body,
                user: req.user.id,
                bookingId,
                status: "Pending",
            });
        io.emit("new-booking", courier);

        res.status(201).json(courier);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get(
    "/track/:trackingId",
    async (req, res) => {
        try {
            const courier =
                await Courier.findOne({
                    trackingId:
                        req.params.trackingId,
                });

            if (!courier) {
                return res.status(404).json({
                    message:
                        "Tracking ID not found",
                });
            }

            res.json(courier);

        } catch (error) {
            res.status(500).json({
                message: "Server Error",
            });
        }
    }
);

router.put("/approve/:id", protect, adminOnly, async (req, res) => {
    try {
        const trackingId = await generateTrackingId();

        const courier = await Courier.findByIdAndUpdate(
            req.params.id,
            {
                status: "Approved",
                trackingId,
            },
            { new: true }
        );

        io.emit("booking-updated", courier);
        res.json(courier);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.put("/reject/:id", protect, adminOnly, async (req, res) => {
    try {
        const courier =
            await Courier.findByIdAndUpdate(
                req.params.id,
                {
                    status: "Rejected",
                },
                { new: true }
            );

        io.emit("booking-updated", courier);
        res.json(courier);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}
);

router.put("/status/:id", protect, adminOnly, async (req, res) => {
    try {
        const { status } = req.body;

        const courier =
            await Courier.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

        io.emit("booking-updated", courier);
        res.json(courier);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}
);

router.get("/", protect, async (req: any, res) => {

    if (req.user.role === "admin") {

        const couriers = await Courier.find().populate("user", "email");

        return res.json(couriers);

    }

    const couriers = await Courier.find({
        user: req.user.id,
    });

    res.json(couriers);
});


export default router;