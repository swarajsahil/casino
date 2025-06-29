import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user.js';
import crypto from 'crypto';

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, // Customize fields if needed
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Validate password
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          (err, hashedPassword) => {
            if (err) return done(err);

            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: 'Incorrect email or password.' });
            }

            return done(null, user);
          }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;