"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const pclient = new client_1.PrismaClient();
const JWT_KEY = process.env.JWT_KEY;
exports.userRouter.post("/SignUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredDataTypes = zod_1.default.object({
        email: zod_1.default.string().min(5).max(100).email(),
        password: zod_1.default.string().min(5).max(100)
    });
    const CheckDataTypes = requiredDataTypes.safeParse(req.body);
    if (!CheckDataTypes.success) {
        res.json({
            message: "Invalid"
        });
        return;
    }
    try {
        const { email, password } = req.body;
        const CheckAlreadyEmailPresentOrNot = yield pclient.users.findUnique({
            where: {
                email: email
            }
        });
        if (CheckAlreadyEmailPresentOrNot) {
            res.status(401).send({
                message: "Email already users"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const AddUserToDB = yield pclient.users.create({
            data: {
                email: email,
                password: hashedPassword,
                provider: "custom"
            }
        });
        res.json({
            message: "Signed Up success!!"
        });
    }
    catch (e) {
        res.status(500).send({
            message: "something went wrong!!"
        });
    }
}));
exports.userRouter.post("/GoogleSignUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, googleID } = req.body;
    console.log("here reached");
    const CheckAlreadyEmailPresentOrNot = yield pclient.users.findUnique({
        where: {
            email: email
        }
    });
    if (CheckAlreadyEmailPresentOrNot) {
        res.status(401).send({
            message: "Email already users"
        });
        return;
    }
    console.log("here also");
    console.log(req);
    const AddGoolgeUser = yield pclient.users.create({
        data: {
            email: email,
            googleID: googleID,
            provider: "Google"
        }
    });
    if (AddGoolgeUser) {
        res.status(200).send({
            message: "signed up!!!"
        });
    }
}));
exports.userRouter.post("/SignIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredDataTypes = zod_1.default.object({
            email: zod_1.default.string().min(5).max(100).email(),
            password: zod_1.default.string().min(5).max(100)
        });
        const CheckDataTypes = requiredDataTypes.safeParse(req.body);
        if (!CheckDataTypes.success) {
            res.status(401).send({
                message: "Invalid format"
            });
            return;
        }
    }
    catch (e) {
        res.status(401).send({
            message: "something went wrong!!"
        });
    }
    const { email, password } = req.body;
    const CheckUserWithEmail = yield pclient.users.findUnique({
        where: {
            email: email
        }
    });
    console.log(CheckUserWithEmail);
    if (!CheckUserWithEmail) {
        res.status(404).send({
            message: "User Not found!!"
        });
        return;
    }
    if (!CheckUserWithEmail.password) {
        res.status(404).send({
            message: "User signed up with Google, please use Google Sign-In!",
        });
        return;
    }
    const CheckPassword = yield bcrypt_1.default.compare(password, CheckUserWithEmail.password);
    console.log(CheckPassword);
    if (!CheckPassword) {
        res.status(404).send({
            message: "user not found!!"
        });
        return;
    }
    if (CheckPassword) {
        const token = jsonwebtoken_1.default.sign({
            userId: CheckUserWithEmail.id
        }, JWT_KEY);
        res.cookie("uid", token, {
            httpOnly: true, // Prevent JavaScript access
            secure: false,
        });
        console.log(res);
        res.json({
            message: token
        });
    }
}));
exports.userRouter.post("/GoogleSignIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, googleID } = req.body;
    const CheckUserWithEmail = yield pclient.users.findUnique({
        where: {
            email: email
        }
    });
    if (!CheckUserWithEmail) {
        res.status(404).send({
            message: "user not found!!"
        });
        return;
    }
    const CheckUserWithGoogleID = yield pclient.users.findUnique({
        //@ts-ignore
        where: {
            googleID: googleID
        }
    });
    if (!CheckUserWithGoogleID) {
        res.status(404).send({
            message: "user not found!!"
        });
        return;
    }
    res.status(200).send("success!!!");
}));
exports.userRouter.get("/finduser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (!email) {
        res.status(400).send({
            message: "Email is required"
        });
    }
    const finduser = yield pclient.users.findUnique({
        where: {
            email: email
        }
    });
    if (finduser) {
        res.json({
            message: "found"
        });
    }
}));
