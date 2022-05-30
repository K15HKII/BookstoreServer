const multer = require('multer');
const appVariable = require('../../variables/app');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { Attachment } = require('../../models/modelmap');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

class Resize {

  constructor(folder) {
    this.folder = folder;
  }

  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await fs.promises.mkdir(this.folder, { recursive: true })

    await sharp(buffer)
      .toFile(filepath);

    return filename;
  }

  static filename() {
    return `${uuidv4()}.png`;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }

}

const folder = new Resize(path.join(process.cwd(), appVariable.UPLOAD_FOLDER));

module.exports = { upload, folder }
