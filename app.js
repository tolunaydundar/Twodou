const newTaskInput = document.querySelector("#task-input-form");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const completedTaskList = document.querySelector("#completed-task-list");
const deleteAllTasksButton = document.querySelector("#delete-all-tasks-button");

addTaskButton.addEventListener("click", addTask);

function addTask(event) {
	event.preventDefault();

	if (newTaskInput.value === "") {
		alert("Please enter a task.");
		return;
	}

	const newTask = document.createElement("li");
	newTask.innerText = newTaskInput.value;
	newTask.classList.add("task-item");
	taskList.appendChild(newTask);
	newTaskInput.value = "";
}

taskList.addEventListener("click", completeTask);

function completeTask(event) {
	event.target.classList.toggle("completed");
	completedTaskList.appendChild(event.target);
	taskList.removeChild(event.target);
}

taskList.addEventListener("contextmenu", deleteTask);

function deleteTask(event) {
	event.preventDefault();
	taskList.removeChild(event.target);
}

completedTaskList.addEventListener("click", uncompleteTask);

function uncompleteTask(event) {
	event.target.classList.toggle("completed");
	taskList.appendChild(event.target);
	completedTaskList.removeChild(event.target);
}

completedTaskList.addEventListener("contextmenu", deleteCompletedTask);

function deleteCompletedTask(event) {
	event.preventDefault();
	completedTaskList.removeChild(event.target);
}
