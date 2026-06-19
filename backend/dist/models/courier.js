"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courierSchema = new mongoose_1.default.Schema({
    senderName: { type: String, required: true },
    senderPhone: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    packageType: { type: String, required: true },
    packageWeight: { type: Number, required: true },
    bookingId: {
        type: String,
        unique: true,
    },
    trackingId: {
        type: String,
        default: undefined,
    },
    status: {
        type: String,
        default: "Pending",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Courier", courierSchema);
//# sourceMappingURL=courier.js.map