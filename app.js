const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initializePassport = require('./passportConfig');
initializePassport(passport);

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <-- add this

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
const uploadRouter = require('./routes/uploadRouter');
const folderRouter = require('./routes/folderRouter');
const fileRouter = require('./routes/fileRouter');

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/folders', folderRouter);
app.use('/files', fileRouter);

app.get('/', async (req, res) => {
  let files = [];

  if (req.user) {
    files = await prisma.file.findMany({
      where: {
        folder: {
          userId: req.user.id,
        },
      },
      include: {
        folder: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  res.render('index', {
    title: 'File uploader',
    user: req.user,
    files,
  });
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
