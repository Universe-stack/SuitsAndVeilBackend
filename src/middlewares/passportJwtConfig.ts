import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express'; // Import express Request type
import User from '../models/User'; // Import your user model
//import config from '../config/database'; // Import your config file
import { PassportStatic } from 'passport'; // Import PassportStatic type
import dotenv from "dotenv";

dotenv.config();


const passportJwtConfig = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({
          id: jwt_payload.id,
        }).exec();

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default passportJwtConfig;
