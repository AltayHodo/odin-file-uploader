const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport')

const initializePassport = require('./passportConfig');
initializePassport(passport);

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const signupRouter = require('./routes/signupRouter');

app.use('/signup', signupRouter)

app.get('/', (req, res) => {
  res.render('index', {title: 'File uploader'})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});