const middleware = require('./upload.middleware');
const authMiddlewares = require('../auth/auth.middleware');
const router = require('express').Router();

router.post('/upload/image'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
    , middleware.upload.single('image'), async (req, res) => {
        const fileUpload = middleware.imageSaver;

        if (!req.file) {
            res.status(401).json({error: 'Please provide an image'});
        }

        const file = await fileUpload.save(req.file);

        return res.status(200).json(file);
    });

router.post('/upload/video'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
    , middleware.upload.single('video'), async (req, res) => {
        const fileUpload = middleware.videoSaver;

        if (!req.file) {
            res.status(401).json({error: 'Please provide an video'});
        }

        const file = await fileUpload.save(req.file);

        return res.status(200).json(file);
    });

module.exports = router;
