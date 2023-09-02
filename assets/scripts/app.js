//Input fields, buttons and lists
const taskInput = document.querySelector("#task-input-form");
const addTaskButton = document.querySelector("#add-task-button");
const errorMessageContainer = document.querySelector(
	"#error-message-container"
);
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
document.addEventListener("DOMContentLoaded", function () {
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
});

//Adds a task to the task list and stores it in local storage
addTaskButton.addEventListener("click", function (event) {
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
});

//Marks a task as completed and moves it to the completed task list
taskList.addEventListener("click", function (event) {
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
});

//Deletes a task from the task list
taskList.addEventListener("contextmenu", function (event) {
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
});

//Marks a task as incomplete and moves it back to the task list
completedTaskList.addEventListener("click", function (event) {
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
});

//Deletes a task from the completed task list
completedTaskList.addEventListener("contextmenu", function (event) {
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
});

//Deletes all completed tasks
deleteCompletedTasksButton.addEventListener("click", function (event) {
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
});

//Deletes all tasks
deleteAllTasksButton.addEventListener("click", function (event) {
	const confirmation = confirm("Are you sure you want to delete all tasks?");

	if (confirmation === true) {
		const taskToDelete = document.querySelectorAll(".task-item");
		for (let i = 0; i < taskToDelete.length; i++) {
			taskToDelete[i].remove();
		}
	}

	localStorage.clear();
});

//Changes the theme of the app
changeThemeButton.addEventListener("click", function (event) {
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
});
