const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
storedTasks.forEach((task) => addTaskToPage(task));

const errorMessage = document.createElement("p");

document.querySelector(".input-section").insertBefore(errorMessage, document.getElementById("taskInput"));
document.getElementById("addTaskButton").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    errorMessage.textContent = "";
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (task === "") {
        errorMessage.textContent = "Task can't be empty!";
        return;
    }

    if (storedTasks.includes(task)) {
        console.log("SAME TASK NO")
        errorMessage.textContent = "Task can't be repeated!";
        return;
    }

    addTaskToPage(task);
    saveTask(task);
    taskInput.value = "";
}

function addTaskToPage(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteTask(task, li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function saveTask(task) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(task);
    console.log(storedTasks)
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function deleteTask(task, li) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    li.remove();
}
