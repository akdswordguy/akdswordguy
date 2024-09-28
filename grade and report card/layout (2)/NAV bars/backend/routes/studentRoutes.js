// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const ReportCard = require('../models/ReportCard');

// Fetch roll numbers by class
router.get('/getRollNumbers', async (req, res) => {
    const { class: className } = req.query;
    
    try {
        const students = await Student.find({ class: className }).select('rollnumber -_id');
        if (students.length === 0) {
            return res.status(404).json({ error: 'No students found for this class' });
        }
        res.json(students.map(student => student.rollnumber));
    } catch (err) {
        res.status(500).json({ error: 'Error fetching roll numbers' });
    }
});

// Fetch student details by class and roll number
router.get('/getStudentDetails', async (req, res) => {
    const { class: className, rollnumber } = req.query;

    try {
        const student = await Student.findOne({ class: className, rollnumber });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({
            name: student.name,
            date_of_birth: student.date_of_birth,
            fathers_name: student.fathers_name,
            mothers_name: student.mothers_name
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching student details' });
    }
});

// Submit report card
router.post('/submitReportCard', async (req, res) => {
    const { rollnumber, class: className, exam, subjects } = req.body;

    try {
        // Find student by roll number and class
        const student = await Student.findOne({ class: className, rollnumber });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Create a new report card
        const reportCard = new ReportCard({
            student: student._id,
            exam,
            subjects
        });

        // Save the report card to the database
        await reportCard.save();

        // Send a success response
        res.status(200).json({ message: 'Report card submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit report card' });
    }
});

module.exports = router;
