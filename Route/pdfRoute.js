const express = require('express');
const userAuthentication = require('../middleware/auth.js');
const upload = require('../middleware/uploadPDF.js');
const { uploadPDF, listFiles, deleteFile } = require('../Controller/pdfController.js');
const router = express.Router();

router.post('/upload', userAuthentication, upload.array('pdf', 5), uploadPDF);
router.get('/show', userAuthentication, listFiles);
router.delete('/delete/:id', userAuthentication, deleteFile);

module.exports = router;
