// add to db

function addToDatabase(newTask) {
  let listOfTasks;
  if (localStorage.getItem("tasks") === null) {
    listOfTasks = [];
  } else {
    listOfTasks = JSON.parse(localStorage.getItem("tasks"));
  }

  listOfTasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
}

function loadfromDB() {
  let listofTasks;
  if (localStorage.getItem("tasks") == null) {
    listofTasks = [];
  } else {
    listofTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return listofTasks; //return array
}

function removefromDB(task) {
  let listofTasks;

  if (localStorage.getItem("tasks") === null) {
    listofTasks = [];
  } else {
    listofTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(listofTasks);
  listofTasks.forEach(function (task, index) {
    if (task.textContent.trim() === task.name.trim())
      listofTasks.splice(index, 1);
  });
  localStorage.setItem("tasks", JSON.stringify(listofTasks));
}
