const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fileName: { 
        type: String, 
        required: true 
    },
    fileSize: { 
        type: Number, 
        required: true 
    },
    extractedText: { 
        type: String, 
        required: true 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    uploadTime: { 
        type: Date, 
        default: Date.now 
    }
});

const pdfModel = mongoose.model('PDFFile', pdfSchema);

module.exports = pdfModel;
