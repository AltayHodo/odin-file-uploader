const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function viewFile(req, res) {
  const fileId = parseInt(req.params.id);

  const file = await prisma.file.findUnique({
    where: { id: fileId },
    include: {
      folder: true,
    },
  });

  if (!file || file.folder.userId !== req.user.id) {
    return res.status(404).send('File not found or access denied.');
  }

  res.render('file-details', {
    title: 'File Details',
    file,
  });
}

module.exports = {
  viewFile,
};
