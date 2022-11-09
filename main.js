let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let delAll = document.querySelector(".delete-all button");
//Empty Array To Store The Tasks
let tasksArray = [];

if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromSrotage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = "";
  }
};

//click on task delete
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //add task to array
  tasksArray.push(task);
  //add task to page
  addElementsToPage(tasksArray);
  //add task to local storage
  addToStorage(tasksArray);
}

function addElementsToPage(array) {
  //empty the task div
  tasks.innerHTML = "";
  //looping on the array
  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));
    div.appendChild(p);
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
  });
}

function addToStorage(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromSrotage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deleteTask(taskid) {
  tasksArray = tasksArray.filter((task) => {
    return task.id != taskid;
  });
  addToStorage(tasksArray);
}

function toggleTask(taskid) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskid) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addToStorage(tasksArray);
}

//delete all button
delAll.addEventListener("click", () => {
  tasks.innerHTML = "";
  window.localStorage.removeItem("tasks");
});
