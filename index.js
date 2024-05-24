const express = require("express");
const app = express();
const path = require("path");
const hbs = require('hbs');
const mongoose = require('./mongodb'); // Import the MongoDB connection

const templatePath = path.join(__dirname, '../template');

app.use(express.static('template'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', "hbs");
app.set("views", templatePath);

const Task = require('./models'); // Assuming your Task model from the first code
const LogInCollection = require("./mongodb");

// Authentication Routes (from second code)
app.get("/", (req, res) => {
  res.render("loginn"); // Login page
});

app.get("/signup", (req, res) => {
  res.render("signup"); // Signup page
});

app.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if user already exists (modify based on your user schema)
    const existingUser = await LogInCollection.findOne({ name });
    if (existingUser) {
      return res.send("User already exists!");
    }

    const data = { name, password }; // Update based on your user schema
    await LogInCollection.insertMany([data]);
    res.render('loginn');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error creating user');
  }
});

app.post("/loginn", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user exists (modify based on your user schema)
    const user = await LogInCollection.findOne({ name });
    if (!user) {
      return res.send("Invalid username");
    }

    // Validate password (modify based on your password storage strategy)
    if (user.password !== password) {
      return res.send("Incorrect password");
    }

    // Authentication successful (redirect to dashboard or handle differently)
    res.render("dashboard");
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// Task Management Routes and dealing with endpoint
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Error fetching tasks');
  }
});

app.post('/api/tasks', async (req, res) => {
  const { taskName, dueDate, members } = req.body;

  try {
    const newTask = new Task({ taskName, dueDate, members });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(400).send('Error saving task');
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
