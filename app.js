const newTaskInput = document.querySelector("#task-input-form");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const tasks = document.querySelectorAll(".task-item");
const completedTaskList = document.querySelector("#completed-task-list");
const completedTasks = document.querySelectorAll(".completed");
const deleteCompletedTasksButton = document.querySelector(
	"#delete-completed-tasks-button"
);
const deleteAllTasksButton = document.querySelector("#delete-all-tasks-button");
const errorMessage = document.querySelector("#error-message-container");

document.addEventListener("DOMContentLoaded", function (event) {
	let storedToDos;

	if (localStorage.getItem("tasks") === null) {
		storedToDos = [];
	} else {
		storedToDos = JSON.parse(localStorage.getItem("tasks"));
	}

	storedToDos.forEach(function (task) {
		let newTask = document.createElement("li");
		newTask.classList.add("task-item");
		newTask.innerText = task;
		taskList.appendChild(newTask);
	});
});

addTaskButton.addEventListener("click", function (event) {
	if (newTaskInput.value === "") {
		errorMessage.setAttribute("style", "display: flex");

		setTimeout(function () {
			errorMessage.setAttribute("style", "display: none");
		}, 3000);
		return;
	}

	let storedToDos;

	if (localStorage.getItem("tasks") === null) {
		storedToDos = [];
	} else {
		storedToDos = JSON.parse(localStorage.getItem("tasks"));
	}

	storedToDos.push(newTaskInput.value);
	localStorage.setItem("tasks", JSON.stringify(storedToDos));

	let newTask = document.createElement("li");
	newTask.classList.add("task-item");
	newTask.innerText = newTaskInput.value;
	taskList.appendChild(newTask);
	newTaskInput.value = "";
});

taskList.addEventListener("click", function (event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("completed");
		completedTaskList.appendChild(event.target);
		taskList.removeChild(event.target);
	}
});

taskList.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	if (event.target.tagName === "LI") {
		event.target.remove();
	}
});

completedTaskList.addEventListener("click", function (event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("completed");
		taskList.appendChild(event.target);
		completedTaskList.removeChild(event.target);
	}
});

completedTaskList.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	if (event.target.tagName === "LI") {
		event.target.remove();
	}
});

deleteCompletedTasksButton.addEventListener("click", function (event) {
	const completedTaskToDelete = document.querySelectorAll(".completed");
	for (let i = 0; i < completedTaskToDelete.length; i++) {
		completedTaskToDelete[i].remove();
	}
});

deleteAllTasksButton.addEventListener("click", function (event) {
	const taskToDelete = document.querySelectorAll(".task-item");
	for (let i = 0; i < taskToDelete.length; i++) {
		taskToDelete[i].remove();
	}

	localStorage.clear();
});
