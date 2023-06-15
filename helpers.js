const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const { UPLOADS_DIR } = process.env;

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

// Validate schema.

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    err.httpStatus = 400;
    throw err;
  }
};

// Save Photo.

const savePhoto = async (img, width) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }

    const sharpImg = sharp(img.data);

    sharpImg.resize(width);

    const imgName = `${uuid()}.jpg`;

    const imgPath = path.join(uploadsPath, imgName);

    await sharpImg.toFile(imgPath);

    return imgName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar la imagen en el servidor.', 500);
  }
};

// Delete Photo.

const deletePhoto = async (imgName) => {
  try {
    // Ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

    try {
      await fs.access(imgPath);
    } catch {
      return;
    }

    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    generateError('Error al eliminar la imagen del servidor.', 500);
  }
};

const saveFile = async (file) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }

    const fileExt = file.name.split('.').pop();

    const fileName = `${uuid()}.${fileExt}`;

    // Ruta absoluta al archivo.
    const filePath = path.join(uploadsPath, fileName);

    await file.mv(filePath);

    return fileName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar el archivo en el servidor.', 500);
  }
};

module.exports = {
  generateError,
  validateSchema,
  savePhoto,
  deletePhoto,
  saveFile,
};
