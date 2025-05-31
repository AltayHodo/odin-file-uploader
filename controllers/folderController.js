const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listFolders(req, res) {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id },
    orderBy: { name: 'asc' },
  });

  res.render('folders', { title: 'Your Folders', folders });
}

async function createFolder(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).send('Folder name is required');

  await prisma.folder.create({
    data: {
      name,
      userId: req.user.id,
    },
  });

  res.redirect('/folders');
}

async function updateFolder(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).send('Folder name is required');

  await prisma.folder.update({
    where: { id: parseInt(id), userId: req.user.id },
    data: { name },
  });

  res.redirect('/folders');
}

async function deleteFolder(req, res) {
  const { id } = req.params;

  await prisma.folder.delete({
    where: {
      id: parseInt(req.params.id),
      userId: req.user.id,
    },
  });

  res.redirect('/folders');
}

module.exports = {
  listFolders,
  createFolder,
  updateFolder,
  deleteFolder,
};
