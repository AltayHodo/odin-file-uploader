const { PrismaClient } = require('@prisma/client');
const passport = require('passport');

async function loginGet(req, res) {
  res.render('login-form');
}

function loginPost(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
}

module.exports = {
  loginGet,
  loginPost,
};
