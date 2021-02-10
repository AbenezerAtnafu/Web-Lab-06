// Define UI Variables
const taskInput = document.querySelector("#task"); //the task input text field
const form = document.querySelector("#task-form"); //The form at the top
const filter = document.querySelector("#filter"); //the task filter text field
const taskList = document.querySelector(".collection"); //The UL
const clearBtn = document.querySelector(".clear-tasks"); //the all task clear button
const sortbtn = document.querySelector(".sort");

const reloadIcon = document.querySelector(".fa"); //the reload button at the top navigation

//DB variable

let DB;
let tasks = [];
// Add Event Listener [on Load]

document.addEventListener("DOMContentLoaded", () => {
  // create the database
  let TasksDB = indexedDB.open("tasks", 1);

  // if there's an error
  TasksDB.onerror = function () {
    console.log("There was an error");
  };
  // if everything is fine, assign the result to the instance
  TasksDB.onsuccess = function () {
    // console.log('Database Ready');

    // save the result
    DB = TasksDB.result;

    // display the Task List
    displayTaskList();
  };

  // This method runs once (great for creating the schema)
  TasksDB.onupgradeneeded = function (e) {
    // the event will be the database
    let db = e.target.result;

    // create an object store,
    // keypath is going to be the Indexes
    let objectStore = db.createObjectStore("tasks", {
      keyPath: "id",
      autoIncrement: true,
    });

    // createindex: 1) field name 2) keypath 3) options
    objectStore.createIndex("taskname", "taskname", { unique: false });

    console.log("Database ready and fields created!");
  };

  form.addEventListener("submit", addNewTask);

  function addNewTask(e) {
    e.preventDefault();

    // Check empty entry
    if (taskInput.value === "") {
      taskInput.style.borderColor = "red";

      return;
    }

    // create a new object with the form info
    let newTask = {
      taskname: taskInput.value,
      date: new Date(),
    };

    // Insert the object into the database
    let transaction = DB.transaction(["tasks"], "readwrite");
    let objectStore = transaction.objectStore("tasks");

    let request = objectStore.add(newTask);

    // on success
    request.onsuccess = () => {
      form.reset();
    };
    transaction.oncomplete = () => {
      console.log("New appointment added");

      displayTaskList();
    };
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
  }

  const displayFilter = function (tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      //add Attribute for delete
      li.setAttribute("data-task-id", task.id);
      // Adding a class
      li.className = "collection-item";
      // Create text node and append it
      li.appendChild(document.createTextNode(task.taskname));
      // Create new element for the link
      const link = document.createElement("a");
      // Add class and the x marker for a
      link.className = "delete-item secondary-content";
      link.innerHTML = `
                <span style = "margin-right:240px; color:#000">${task.date.toLocaleString()}</span>
                 <i class="fa fa-remove"></i>
                &nbsp;
                <a href="/edit.html?id=${
                  task.id
                }"><i class="fa fa-edit"></i> </a>
                `;
      // Append link to li
      li.appendChild(link);
      // Append to UL
      taskList.appendChild(li);
    });
  };

  // Filter tasks function definition
  function filterTasks() {
    let keyword = filter.value.toLowerCase();

    let filterTaskList = tasks.filter(
      (task) =>
        task.taskname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    );
    displayFilter(filterTaskList);
  }

  //   Filter Task
  filter.addEventListener("keyup", filterTasks);

  function sorting(e) {
    let sortedTask;
    if (e.target.innerText.toString().toLowerCase() === "newer first") {
      sortedTask = tasks.sort(function (task1, task2) {
        return task2.date.getTime() - task1.date.getTime();
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

  sortbtn.addEventListener("click", sorting);

  function displayTaskList() {
    // clear the previous task list

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // create the object store
    let objectStore = DB.transaction("tasks").objectStore("tasks");
    tasks = [];
    objectStore.openCursor().onsuccess = function (e) {
      // assign the current cursor
      let cursor = e.target.result;

      if (cursor) {
        let newTask = {
          id: cursor.value.id,
          taskname: cursor.value.taskname,
          date: cursor.value.date,
        };

        tasks.push(newTask);
        // Create an li element when the user adds a task
        const li = document.createElement("li");
        //add Attribute for delete
        li.setAttribute("data-task-id", cursor.value.id);
        // Adding a class
        li.className = "collection-item";
        // Create text node and append it
        li.appendChild(document.createTextNode(cursor.value.taskname));
        // Create new element for the link
        const link = document.createElement("a");
        // Add class and the x marker for a
        link.className = "delete-item secondary-content";
        link.innerHTML = `
              <span style = "margin-right:240px; color:#000">${cursor.value.date.toLocaleString()}</span>
                 <i class="fa fa-remove"></i>
                &nbsp;
                <a href="/edit.html?id=${
                  cursor.value.id
                }"><i class="fa fa-edit"></i> </a>
                `;
        // Append link to li
        li.appendChild(link);
        // Append to UL
        taskList.appendChild(li);
        cursor.continue();
      }
    };
  }

  // Remove task event [event delegation]
  taskList.addEventListener("click", removeTask);

  function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are You Sure about that ?")) {
        // get the task id
        let taskID = Number(
          e.target.parentElement.parentElement.getAttribute("data-task-id")
        );
        // use a transaction
        let transaction = DB.transaction(["tasks"], "readwrite");
        let objectStore = transaction.objectStore("tasks");
        objectStore.delete(taskID);

        transaction.oncomplete = () => {
          e.target.parentElement.parentElement.remove();
        };
      }
    }
  }

  //clear button event listener
  clearBtn.addEventListener("click", clearAllTasks);

  //clear tasks
  function clearAllTasks() {
    let transaction = DB.transaction("tasks", "readwrite");
    let tasks = transaction.objectStore("tasks");
    // clear the table.
    tasks.clear();
    displayTaskList();
    console.log("Tasks Cleared !!!");
  }
});
