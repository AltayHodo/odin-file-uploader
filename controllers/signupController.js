const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function signUpGet(req, res) {
  res.render('signup-form', {
    title: 'Sign up form',
  });
}

async function signUpPost(req, res) {
  const { name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
      return res.send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signing up');
  }
}

module.exports = {
  signUpGet,
  signUpPost
};
