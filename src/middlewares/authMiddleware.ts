import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Import your user model
import dotenv from 'dotenv';
dotenv.config(); 
import passportJwtConfig from './passportJwtConfig';
passportJwtConfig(passport);

// Configure passport with the local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Function to generate a JWT token
export const generateAuthToken = (user) => {
  // Create a payload with only the necessary user data
  const payload = {
    _id: user._id, // Assuming _id is the user's unique identifier
    username: user.username, // Add other relevant user properties
    // ... add other user-related data here
  };
  // Sign the JWT token with the payload
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
}

// Middleware function to verify an ordinary user with a JWT
export const verifyUser = passport.authenticate('jwt', { session: false });



// Middleware function to verify an admin user with a JWT
export const verifyAdmin = (req:Request, res:Response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user,"user")
    if (err) {
      return next(err);
    }
    if (user.role !== "admin") {
      const error = new Error('You are not authorized to perform this operation!');
      return next(error);
    }  
    req.user = user;
    next();
  })(req, res, next);
};


// Middleware to verify if a user is a vendor
export const verifyVendor = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
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
