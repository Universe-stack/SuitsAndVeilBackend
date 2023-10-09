"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVendor = exports.verifyAdmin = exports.verifyUser = exports.jwtPassport = exports.generateAuthToken = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Import your user model
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// JWT options
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
};
// Configure passport with the local strategy
passport_1.default.use(new passport_local_1.Strategy(User_1.default.authenticate()));
passport_1.default.serializeUser(User_1.default.serializeUser());
passport_1.default.deserializeUser(User_1.default.deserializeUser());
// Function to generate a JWT token
const generateAuthToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_KEY, { expiresIn: 3600 });
};
exports.generateAuthToken = generateAuthToken;
// Configure passport with the JWT strategy
exports.jwtPassport = passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
    User_1.default.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
// Middleware function to verify an ordinary user with a JWT
exports.verifyUser = passport_1.default.authenticate('jwt', { session: false });
// Middleware function to verify an admin user with a JWT
const verifyAdmin = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user.admin) {
            const error = new Error('You are not authorized to perform this operation!');
            return next(error);
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.verifyAdmin = verifyAdmin;
// Middleware to verify if a user is a vendor
const verifyVendor = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user.role !== 'vendor') {
            // User is not a vendor or not authenticated, return an error response
            const error = new Error('You are not authorized as a vendor');
            return next(error);
        }
        // User is a vendor, so proceed to the next middleware or route handler
        req.user = user;
        next();
    })(req, res, next);
};
exports.verifyVendor = verifyVendor;
// Middleware function to confirm user ownership of a resource
// export const confirmUser = (req, res, next) => {
//   const userId = req.user._id;
//   const commentId = req.params.commentId;
//   Dishes.findById(commentId)
//     .then((dish) => {
//       if (dish.author._id.equals(userId)) {
//         next(); // User is the same as comment author, allow the operation to continue
//       } else {
//         const err = new Error('You are not authorized to change this comment!');
//         return next(err);
//       }
//     })
//     .catch((err) => next(err));
// };
// Additional code for Facebook authentication (commented out)
// You can uncomment and customize this code if you want to implement Facebook authentication.
// exports.facebookPassport = passport.use(new FacebookStrategy({
//     clientID: config.facebook.clientId,
//     clientSecret: config.facebook.clientSecret,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ facebookId: profile.id }, (err, user) => {
//         if (err) {
//             console.log(err);
//             return done(err, false);
//         }
//         if (!err && user !== null) {
//             return done(null, user);
//         } else {
//             user = new User({ username: profile.displayName });
//             user.facebookId = profile.id;
//             user.firstname = profile.name.givenName;
//             user.lastname = profile.name.familyName;
//             user.save((err, user) => {
//                 if (err) {
//                     return done(err, false);
//                 } else {
//                     return done(null, user);
//                 }
//             });
//         }
//     });
// }));
//# sourceMappingURL=authMiddleware.js.map