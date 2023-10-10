"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User")); // Import your user model
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passportJwtConfig = (passport) => {
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    };
    passport.use(new passport_jwt_1.Strategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User_1.default.findOne({
                id: jwt_payload.id,
            }).exec();
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }
        catch (error) {
            return done(error, false);
        }
    }));
};
exports.default = passportJwtConfig;
//# sourceMappingURL=passportJwtConfig.js.map