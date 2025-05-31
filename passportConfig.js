const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function initialize(passport) {
  const authenticateUser = async (name, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { name } });

      if (!user) {
        return done(null, false, { message: 'No user with that name' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch
        ? done(null, user)
        : done(null, false, { message: 'Password incorrect' });
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
