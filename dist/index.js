"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//first, install dependencies
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const listRouter_1 = __importDefault(require("./routes/listRouter"));
const WeddingRouter_1 = __importDefault(require("./routes/WeddingRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const paymentRouter_1 = __importDefault(require("./routes/paymentRouter"));
const passport_1 = __importDefault(require("passport"));
// const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const options = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '../bin/private.key')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '../bin/certificate.pem'))
};
//call dependencies
dotenv_1.default.config();
const app = (0, express_1.default)();
const secureServer = https_1.default.createServer(options, app);
const secPort = 443;
secureServer.listen(secPort, () => {
    console.log(`Secure server listening on port ${secPort}`);
});
app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    else {
        res.redirect(307, 'https://' + req.hostname + ':' + secPort + req.url);
    }
});
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
//connect db
const connect = () => {
    try {
        mongoose_1.default.connect(process.env.MONGO);
        console.log("connected to mongodb");
    }
    catch (e) {
        console.log(e);
    }
};
mongoose_1.default.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("mongmongoDB connected");
});
//middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use("/lists", listRouter_1.default);
app.use("/wedding", WeddingRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/payments", paymentRouter_1.default);
app.get("/", (req, res) => {
    res.send("Hello from Express!!");
});
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
app.listen(8800, () => {
    connect();
    console.log("connected to backend");
});
exports.default = app;
//# sourceMappingURL=index.js.map