const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function uploadGet(req, res) {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id },
  });
  res.render('upload-form', { folders, title: 'Upload Form' });
}

async function uploadPost(req, res) {
  if (!req.file) return res.status(400).send('No file uploaded');
  await prisma.file.create({
    data: {
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      folderId: parseInt(req.body.folderId),
    },
  });
  res.redirect('/upload');
}

module.exports = {
  uploadGet,
  uploadPost,
};
