// middleware/upload.js
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const { Readable } = require('stream');

// Use existing Mongoose connection (don't connect here)
const conn = mongoose.connection;

let gfsBucket;
conn.once('open', () => {
  console.log('MongoDB GridFS ready');
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads', // GridFS collection
  });
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload multiple files to GridFS
const uploadMultipleToGridFS = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      await new Promise((resolve, reject) => {
        const stream = Readable.from(file.buffer);
        const uploadStream = gfsBucket.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });

        stream.pipe(uploadStream)
          .on('error', reject)
          .on('finish', () => {
            file.id = uploadStream.id; // store GridFS file ID
            uploadedFiles.push(file);
            resolve();
          });
      });
    }

    req.files = uploadedFiles; // attach GridFS IDs
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { upload, uploadMultipleToGridFS };
