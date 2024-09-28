// models/ReportCard.js
const mongoose = require('mongoose');

const reportCardSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: true
    },
    exam: { 
        type: String, 
        required: true 
    },
    subjects: [{
        subjectName: { type: String, required: true },
        grade: { type: String, required: true }
    }]
}, { timestamps: true });

const ReportCard = mongoose.model('ReportCard', reportCardSchema);
module.exports = ReportCard;
