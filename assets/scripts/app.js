//Input fields, buttons and lists
const taskInput = document.querySelector("#task-input-form");
const addTaskButton = document.querySelector("#add-task-button");
const errorMessageContainer = document.querySelector(
	"#error-message-container"
);
const searchBox = document.querySelector("#search-box");
const taskListContainer = document.querySelector("#task-list-container");
const taskList = document.querySelector("#task-list");
const completedTaskList = document.querySelector("#completed-task-list");
const deleteCompletedTasksButton = document.querySelector(
	"#delete-completed-tasks-button"
);
const deleteAllTasksButton = document.querySelector("#delete-all-tasks-button");
const changeThemeButton = document.querySelector("#change-theme-button");
const mainStyling = document.querySelector("#main-styling");
const mobileStyling = document.querySelector("#mobile-styling");

//Event Listeners
//Loads tasks from local storage
function LoadContent() {
	let storedTasks;
	if (localStorage.getItem("storedTasks") === null) {
		storedTasks = [];
	} else {
		storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
	}

	storedTasks.forEach(function (task) {
		const newTask = document.createElement("li");
		newTask.classList.add("task-item");
		newTask.innerText = task;
		taskList.appendChild(newTask);
	});

	let storedCompletedTasks;
	if (localStorage.getItem("storedCompletedTasks") === null) {
		storedCompletedTasks = [];
	} else {
		storedCompletedTasks = JSON.parse(
			localStorage.getItem("storedCompletedTasks")
		);
	}

	storedCompletedTasks.forEach(function (task) {
		const newTask = document.createElement("li");
		newTask.classList.add("task-item");
		newTask.classList.add("completed");
		newTask.innerText = task;
		completedTaskList.appendChild(newTask);
	});
}
document.addEventListener("DOMContentLoaded", function () {
	LoadContent();
});

searchBox.addEventListener("keyup", function (event) {
	const searchBoxValue = event.target.value.toLowerCase();
	const taskItems = document.querySelectorAll(".task-item");

	taskItems.forEach(function (taskItem) {
		const taskItemText = taskItem.innerText.toLowerCase();

		if (taskItemText.indexOf(searchBoxValue) != -1) {
			taskItem.setAttribute("style", "display: flex");
		} else {
			taskItem.setAttribute("style", "display: none");
		}
	});
});

//Adds a task to the task list and stores it in local storage
function AddTask() {
	event.preventDefault();

	if (taskInput.value === "") {
		errorMessageContainer.setAttribute("style", "display: flex");

		setTimeout(function () {
			errorMessageContainer.setAttribute("style", "display: none");
		}, 3000);
	} else {
		const newTask = document.createElement("li");
		newTask.classList.add("task-item");
		newTask.innerText = taskInput.value;
		taskList.appendChild(newTask);

		let storedTasks;
		if (localStorage.getItem("storedTasks") === null) {
			storedTasks = [];
		} else {
			storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
		}

		storedTasks.push(taskInput.value);
		localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
		taskInput.value = "";
	}
}
addTaskButton.addEventListener("click", function (event) {
	AddTask();
});

//Marks a task as completed and moves it to the completed task list
function CompleteTask() {
	if (event.target.classList.contains("task-item")) {
		event.target.classList.toggle("completed");
		completedTaskList.appendChild(event.target);

		let storedTasks;
		if (localStorage.getItem("storedTasks") === null) {
			storedTasks = [];
		} else {
			storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
		}

		let storedCompletedTasks;
		if (localStorage.getItem("storedCompletedTasks") === null) {
			storedCompletedTasks = [];
		} else {
			storedCompletedTasks = JSON.parse(
				localStorage.getItem("storedCompletedTasks")
			);
		}

		storedCompletedTasks.push(event.target.innerText);
		localStorage.setItem(
			"storedCompletedTasks",
			JSON.stringify(storedCompletedTasks)
		);
		storedTasks.splice(storedTasks.indexOf(event.target.innerText), 1);
		localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
	}
}
taskList.addEventListener("click", function (event) {
	CompleteTask();
});

//Deletes a task from the task list
function DeleteTask() {
	event.preventDefault();

	if (event.target.classList.contains("task-item")) {
		event.target.remove();
	}

	let storedTasks;

	if (localStorage.getItem("storedTasks") === null) {
		storedTasks = [];
	} else {
		storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
	}

	storedTasks.splice(storedTasks.indexOf(event.target.innerText), 1);
	localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
}
taskList.addEventListener("contextmenu", function (event) {
	DeleteTask();
});

//Marks a task as incomplete and moves it back to the task list
function ActivateTask() {
	if (event.target.classList.contains("task-item")) {
		event.target.classList.toggle("completed");
		taskList.appendChild(event.target);

		let storedTasks;
		if (localStorage.getItem("storedTasks") === null) {
			storedTasks = [];
		} else {
			storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
		}

		let storedCompletedTasks;
		if (localStorage.getItem("storedCompletedTasks") === null) {
			storedCompletedTasks = [];
		} else {
			storedCompletedTasks = JSON.parse(
				localStorage.getItem("storedCompletedTasks")
			);
		}

		storedTasks.push(event.target.innerText);
		localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
		storedCompletedTasks.splice(
			storedCompletedTasks.indexOf(event.target.innerText),
			1
		);
		localStorage.setItem(
			"storedCompletedTasks",
			JSON.stringify(storedCompletedTasks)
		);
	}
}
completedTaskList.addEventListener("click", function (event) {
	ActivateTask();
});

//Deletes a task from the completed task list
function DeleteOneCompletedTask() {
	event.preventDefault();

	if (event.target.classList.contains("task-item")) {
		event.target.remove();

		let storedCompletedTasks;
		if (localStorage.getItem("storedCompletedTasks") === null) {
			storedCompletedTasks = [];
		} else {
			storedCompletedTasks = JSON.parse(
				localStorage.getItem("storedCompletedTasks")
			);
		}

		storedCompletedTasks.splice(
			storedCompletedTasks.indexOf(event.target.innerText),
			1
		);
		localStorage.setItem(
			"storedCompletedTasks",
			JSON.stringify(storedCompletedTasks)
		);
	}
}
completedTaskList.addEventListener("contextmenu", function (event) {
	DeleteOneCompletedTask();
});

//Deletes all completed tasks
function DeleteCompletedTasks() {
	const confirmation = confirm(
		"Are you sure you want to delete all completed tasks?"
	);

	if (confirmation === true) {
		const completedTaskToDelete = document.querySelectorAll(".completed");
		for (let i = 0; i < completedTaskToDelete.length; i++) {
			completedTaskToDelete[i].remove();
		}
	}

	localStorage.removeItem("storedCompletedTasks");
}
deleteCompletedTasksButton.addEventListener("click", function (event) {
	DeleteCompletedTasks();
});

//Deletes all tasks
function DeleteAllTasks() {
	const confirmation = confirm("Are you sure you want to delete all tasks?");

	if (confirmation === true) {
		const taskToDelete = document.querySelectorAll(".task-item");
		for (let i = 0; i < taskToDelete.length; i++) {
			taskToDelete[i].remove();
		}
	}

	localStorage.clear();
}
deleteAllTasksButton.addEventListener("click", function (event) {
	DeleteAllTasks();
});

//Changes the theme of the app
function ChangeTheme() {
	if (mainStyling.getAttribute("href") === "./assets/styles/main.css") {
		mainStyling.setAttribute("href", "./assets/styles/main-dark.css");

		if (mobileStyling.getAttribute("href") === "./assets/styles/mobile.css") {
			mobileStyling.setAttribute("href", "./assets/styles/mobile-dark.css");
		}
	} else if (
		mainStyling.getAttribute("href") === "./assets/styles/main-dark.css"
	) {
		mainStyling.setAttribute("href", "./assets/styles/main.css");

		if (
			mobileStyling.getAttribute("href") === "./assets/styles/mobile-dark.css"
		) {
			mobileStyling.setAttribute("href", "./assets/styles/mobile.css");
		}
	}
}
changeThemeButton.addEventListener("click", function (event) {
	ChangeTheme();
});
