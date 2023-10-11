const checkImageUpload = (req, res, next) => {
 
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: 'Invalid file type. Only images (jpeg, png, gif) are allowed.',
    });
  }

  next();
};

module.exports = checkImageUpload;
