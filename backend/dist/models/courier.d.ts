import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageType: string;
    packageWeight: number;
    status: string;
    bookingId?: string | null;
    trackingId?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=courier.d.ts.map