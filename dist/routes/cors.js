"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsWithOptionsMiddleware = exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const whitelist = ['http://localhost:3000', 'https://localhost:3157', 'http://localhost:4200', 'http://JusticeChinedu:3001'];
const corsOptionsDelegate = (req, callback) => {
    const corsOptions = {
        origin: whitelist.includes(req.header('Origin')) ? true : false,
    };
    callback(null, corsOptions);
};
exports.corsMiddleware = (0, cors_1.default)();
exports.corsWithOptionsMiddleware = (0, cors_1.default)(corsOptionsDelegate);
//# sourceMappingURL=cors.js.map