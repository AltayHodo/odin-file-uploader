const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const initializePassport = require('./passportConfig');
initializePassport(passport);

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: 'supersecret', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');

app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'File uploader', user: req.user });
});

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
