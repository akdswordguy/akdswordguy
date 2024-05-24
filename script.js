

const createBox = (taskName, dueDate, members) => {
  var box = document.createElement("div");
  box.classList.add("box");

  const taskNamePara = document.createElement("p");
  taskNamePara.textContent = "Task Name: " + taskName;
  taskNamePara.classList.add("writings");
  box.appendChild(taskNamePara);

  const dueDatePara = document.createElement("p");
  dueDatePara.textContent = "Due Date: " + dueDate;
  dueDatePara.classList.add("writings");
  box.appendChild(dueDatePara);

  const membersPara = document.createElement("p");
  membersPara.textContent = "Active Members: " + members;
  membersPara.classList.add("writings");
  box.appendChild(membersPara);

  // Set background color
  box.style.background = getRandomColor();

  return box;
};

const getRandomColor = () => {
  var colors = ['#a1ffce', '#87ceeb', '#ffa1a1', '#f0e68c', '#90ee90'];
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Function to retrieve tasks from local storage
function getTasksFromStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    // Parse JSON back into JavaScript objects
    return JSON.parse(storedTasks);
  } else {
    return []; // Return empty array if no tasks are stored
  }
}

// Function to fetch tasks from the backend
async function fetchTasks() {
  try {
    const response = await fetch('http://localhost:3000/api/tasks'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // You might want to display an error message to the user
    alert('An error occurred while fetching tasks. Please try again later.');
    return []; // Return an empty array in case of error
  }
}

// Function to display tasks on the page
function displayTasks(tasks) {
  const boxContainer = document.querySelector('.box-container');
  // Clear existing content for a clean refresh
  boxContainer.innerHTML = '';

  tasks.forEach(task => {
    const { taskName, dueDate, members } = task;
    const newBox = createBox(taskName, dueDate, members);
    boxContainer.appendChild(newBox);
  });
}

const createTaskBtn = document.getElementById('createTaskBtn');

createTaskBtn.addEventListener('click', async () => {
  console.log('Button clicked!');

  const taskName = prompt("Enter Task Name:");
  if (taskName === null) { // Check if user canceled
    return;
  }

  const dueDate = prompt("Enter Due Date (YYYY-MM-DD):");
  if (dueDate === null) {
    return;
  }

  let members = prompt("Enter a comma-separated list of active members (limit 3):");
  if (members === null) {
    return;
  }

  // Trim whitespace and remove empty elements from the members array
  members = members.split(',').map(member => member.trim()).filter(member => member !== '');

  // Limit the number of members to 3
  const limitedMembers = members.slice(0, 3).join(', ');

  // Check if at least one member is provided
  if (members.length === 0) {
    alert('At least one active member is required.');
    return;
  }

  // Create a new task object
  const newTask = {
    taskName: taskName,
    dueDate: dueDate,
    members: limitedMembers
  };

  try {
    // Simulate asynchronous task creation or data storage 
    // You might need to interact with your backend (Node.js server) here
    const creationSuccessful = await simulateTaskCreation(newTask);

    if (creationSuccessful) {
      const newBox = createBox(taskName, dueDate, limitedMembers);
      const boxContainer = document.querySelector('.box-container');
      boxContainer.appendChild(newBox);
    } else {
      console.error('Error creating task!'); // Handle unsuccessful creation
      // You might want to display an error message to the user
      alert('Error creating task! Please try again.');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    alert('An unexpected error occurred. Please try again later.');
  }

});
async function simulateTaskCreation(Task) {
  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Task)
    });
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    console.log('Task created:', Task); // Log simulated task creation
    return true;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}


// Fetch and display tasks on page load
window.onload = async () => {
  const tasks = await fetchTasks();
  displayTasks(tasks);
};

