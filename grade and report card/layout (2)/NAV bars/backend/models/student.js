const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollnumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    date_of_birth: { 
        type: Date, // Store date as Date type
        required: true
    },
    fathers_name: { 
        type: String, 
        required: true 
    },
    mothers_name: { 
        type: String, 
        required: true 
    },
    class: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
