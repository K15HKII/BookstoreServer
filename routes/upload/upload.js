const middleware = require('./upload.middleware');
const authMiddlewares = require('../auth/auth.middleware');
const router = require('express').Router();

router.post('/upload'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
  , middleware.upload.single('image'), async (req, res) => {
    const fileUpload = middleware.folder;

    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }

    const filename = await fileUpload.save(req.file.buffer);

    return res.status(200).json({ name: filename });
});

module.exports = router;
