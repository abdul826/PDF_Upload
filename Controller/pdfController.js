const PDFModel = require('../Model/pdfModel.js');
const pdfParse = require('pdf-parse');
const fs = require('fs');

/* exports.uploadPDF = async (req, res) => {
  try {
    const userId = req.userId;

    const fileCount = await PDFModel.countDocuments({ user: userId, isDeleted: false });
    if (fileCount >= 5) {
      fs.unlinkSync(req.file.path); // remove uploaded file
      return res.status(400).json({ error: 'Upload limit reached. Delete a file to upload a new one.' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const newFile = await PDFModel.create({
      user: userId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      extractedText: pdfData.text
    });

    fs.unlinkSync(req.file.path); // optional: remove file from disk after processing

    res.status(201).json({ message: 'File uploaded', file: newFile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
}; */

exports.uploadPDF = async (req, res) => {
  try {
    const userId = req.userId;
    const existingCount = await PDFModel.countDocuments({ user: userId, isDeleted: false });
    const filesToUpload = req.files;

    if (!filesToUpload || filesToUpload.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const allowedUploadCount = 5 - existingCount;
    if (filesToUpload.length > allowedUploadCount) {
      // Delete uploaded temp files
      filesToUpload.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({
        error: `Upload limit exceeded. You can only upload ${allowedUploadCount} more file(s).`
      });
    }

    const uploadedFiles = [];

    for (const file of filesToUpload) {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);

      const newFile = await PDFModel.create({
        user: userId,
        fileName: file.originalname,
        fileSize: file.size,
        extractedText: pdfData.text
      });

      fs.unlinkSync(file.path); // Remove temp file
      uploadedFiles.push(newFile);
    }

    res.status(201).json({ message: 'Files uploaded', files: uploadedFiles });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload PDF files' });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const files = await PDFModel.find({ user: req.userId, isDeleted: false });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await PDFModel.findOne({ _id: req.params.id, user: req.userId });
    if (!file) return res.status(404).json({ error: 'File not found' });

    file.isDeleted = true;
    await file.save();

    res.status(200).json({ message: 'File deleted (soft delete)' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
