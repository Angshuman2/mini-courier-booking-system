"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin only",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=admin.js.map