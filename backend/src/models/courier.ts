import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    senderName: { type: String, required: true },
    senderPhone: { type: String, required: true },

    receiverName: { type: String, required: true },
    receiverPhone: { type: String, required: true },

    packageType: { type: String, required: true },
    packageWeight: { type: Number, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

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

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Courier",
  courierSchema
);