function Task(name, date) {
  this.name = name;
  this.date = date.getTime();
}

let tasks = [];

//
const taskInput = document.querySelector("#task"); //the task input text field
const form = document.querySelector("#task-form"); //The form at the top
const filter = document.querySelector("#filter"); //the task filter text field
const taskList = document.querySelector(".collection"); //The ul
const clearBtn = document.querySelector(".clear-tasks"); //the all task clear button
const message = document.querySelector("#message");
const sortbtn = document.querySelector(".sort");

const addNewTask = function (e) {
  e.preventDefault();
  let taskName = taskInput.value;
  if (taskName === "") {
    message.innerHTML = "Please Provide a task";
    message.classList.remove("hide");
    message.classList.add("red");
    setTimeout(function () {
      message.classList.add("hide");
    }, 3000);
    return;
  }
  const newTask = new Task(taskName, new Date());
  tasks.push(newTask);
  addToDatabase(newTask);
  console.log(newTask.date);
  displayText(newTask);
  message.innerHTML = "Task added Successfully";
  message.classList.remove("hide");
  message.classList.add("green");

  setTimeout(function () {
    message.classList.add("hide");
  }, 3000);
};

const displayText = function (task) {
  const li = document.createElement("li");
  li.className = "collection-item";
  const txt = document.createTextNode(task.name);
  const link = document.createElement("a");
  link.innerHTML = '<i class="fa fa-remove"></i>';
  link.className = "delete-item secondary-content";
  li.appendChild(link);
  li.appendChild(txt);
  taskList.appendChild(li);
};

const displayFilter = function (tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    const txt = document.createTextNode(task.name);
    const link = document.createElement("a");
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.className = "delete-item secondary-content";
    li.appendChild(link);
    li.appendChild(txt);
    taskList.appendChild(li);
  });
};

// Clear Task Function definition
function clearAllTasks() {
  alert("Clear tasks ....");
  tasks = [];
  displayFilter(tasks);
}

// Filter tasks function definition
function filterTasks() {
  let keyword = filter.value.toLowerCase();

  let filterTaskList = tasks.filter(
    (task) => task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
  );
  displayFilter(filterTaskList);
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure about that ?")) {
      removefromDB(e.target.parentElement.parentElement);
    }
  }
}

function sorting(e) {
  let sortedTask;
  if (e.target.innerText.toString().toLowerCase() === "newer first") {
    sortedTask = tasks.sort(function (task1, task2) {
      return task2.date - task1.date;
    });
    e.target.innerText = "Older First";
  } else {
    sortedTask = tasks.sort(function (task1, task2) {
      return task1.date - task2.date;
    });
    e.target.innerText = "Newer First";
  }
  displayFilter(sortedTask);
}

// form submit
form.addEventListener("submit", addNewTask);
// Clear All Tasks
clearBtn.addEventListener("click", clearAllTasks);

//   Filter Task
filter.addEventListener("keyup", filterTasks);

taskList.addEventListener("click", removeTask);

sortbtn.addEventListener("click", sorting);

const reloadIcon = document.querySelector(".fa");

// Event Listener for reload
reloadIcon.addEventListener("click", reloadPage);
// Reload Page Function
function reloadPage() {
  //using the reload fun on location object
  location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
  tasks = loadfromDB();
  displayFilter(tasks)
});
