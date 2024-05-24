


const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://akdelite:<password>@cluster0.t0tfwj8.mongodb.net/loginn'; 
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection; // Export the connection objectx

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const LogInCollection=new mongoose.model('LogInCollection',logInSchema)




module.exports=LogInCollection
