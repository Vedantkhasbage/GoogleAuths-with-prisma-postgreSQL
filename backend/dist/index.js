"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pclient = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const user_1 = require("./routers/user");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
}));
app.use("/user", user_1.userRouter);
app.listen(3000, () => {
    console.log("server started!!!");
});
