const multer = require('multer');
const appVariable = require('../../variables/app.variable');
const path = require('path');
const sharp = require('sharp');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const {ImageRepository, VideoRepository} = require("../../repositories/file.repository");
const getVideoDurationInSeconds = require("get-video-duration");
const {Readable} = require("stream");

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
});

class ImageSaver {

    constructor(folder) {
        this.folder = folder;
    }

    /**
     *
     * @param {Multer.File} file
     * @returns {Promise<Image>}
     */
    async save(file) {
        const fileId = uuidv4();
        const filename = ImageSaver.filename(fileId);
        const filepath = this.filepath(filename);

        await fs.promises.mkdir(this.folder, {recursive: true})

        const output = await sharp(file.buffer)
            .toFile(filepath);

        const image = ImageRepository.create({
            id: fileId,
            path: filename,
            name: file.originalname,
            width: output.width,
            height: output.height,
        });
        return await ImageRepository.save(image);
    }

    static filename(uuid) {
        return `${uuid}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }

}

class VideoSaver {

    constructor(folder) {
        this.folder = folder;
    }

    /**
     *
     * @param {Multer.File} file
     * @returns {Promise<Video>}
     */
    async save(file) {
        const fileId = uuidv4();
        const filename = VideoSaver.filename(fileId, (/[.]/.exec(file.originalname)) ? /[^.]+$/.exec(file.originalname) : undefined);
        const filepath = this.filepath(filename);

        await fs.promises.mkdir(this.folder, {recursive: true})

        const stream = Readable.from(file.buffer);
        const output = await getVideoDurationInSeconds(stream);

        const video = VideoRepository.create({
            id: fileId,
            path: filename,
            name: file.originalname,
            duration: output,
        });
        return await VideoRepository.save(video);
    }

    static filename(uuid, extension) {
        return `${uuid}.${extension}`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }

}

const imageSaver = new ImageSaver(path.join(process.cwd(), appVariable.UPLOAD_IMAGE_FOLDER));
const videoSaver = new VideoSaver(path.join(process.cwd(), appVariable.UPLOAD_VIDEO_FOLDER));

module.exports = {upload, imageSaver, videoSaver}
