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

// Validate Schema.

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    err.httpStatus = 400;
    throw err;
  }
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (img, width) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      // Si el método access lanza un error significa que la directorio no existe.
      // Lo creamos.
      await fs.mkdir(uploadsPath);
    }

    // Creamos un objeto de tipo Sharp con la imagen dada.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen. Width representa un tamaño en píxeles.
    sharpImg.resize(width);

    // Generamos un nombre único para la imagen dado que no podemos guardar dos imágenes
    // con el mismo nombre en la carpeta uploads.
    const imgName = `${uuid()}.jpg`;

    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsPath, imgName);

    // Guardamos la imagen.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre de la imagen.
    return imgName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar la imagen en el servidor', 500);
  }
};

/**
 * ##################
 * ## Delete Photo ##
 * ##################
 */

const deletePhoto = async (imgName) => {
  try {
    // Ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

    try {
      await fs.access(imgPath);
    } catch {
      // Si no existe el archivo finalizamos la función.
      return;
    }

    // Eliminamos el archivo de la carpeta de uploads.
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    generateError('Error al eliminar la imagen del servidor', 500);
  }
};

const saveFile = async (file) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      // Si el método access lanza un error significa que la directorio no existe.
      // Lo creamos.
      await fs.mkdir(uploadsPath);
    }

    //Obtenemos la extensión del archivo

    const fileExt = file.name.split('.').pop();

    // Generamos un nombre único para el archivo dado que no podemos guardar dos archivos
    // con el mismo nombre en la carpeta uploads.
    const fileName = `${uuid()}.${fileExt}`;

    // Ruta absoluta al archivo.
    const filePath = path.join(uploadsPath, fileName);

    // Guardamos el archivo.
    await file.mv(filePath);

    // Retornamos el nombre del archivo.
    return fileName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar el archivo en el servidor', 500);
  }
};

module.exports = {
  generateError,
  validateSchema,
  savePhoto,
  deletePhoto,
  saveFile,
};
