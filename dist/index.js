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
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//call dependencies
const app = (0, express_1.default)();
dotenv_1.default.config();
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
// app.use("/auth",authRoute);
// app.use("/notes",notesRoute);
// app.use("/users",userRoute);
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
//# sourceMappingURL=index.js.map