import "./css/styles.css";
import toDoApi from './js/toDoApi.js';

import templateRoot from './hbs/root.hbs';
import templateTodoList from './hbs/toDoList.hbs';

let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot();
window.onload = () => {

	mainEl = document.getElementById("main");
	loadTodo();
};

// load to do refreshes the page / data / list of items
let loadTodo = () => {
	toDoApi.getToDoItems((data) => {
		console.log(data);
		mainEl.innerHTML = templateTodoList({ results: data });

		// add task button event listener
		document.getElementById("addTask").addEventListener("click", () => {
			let taskDescEl = document.getElementById("addTaskDescription"); // task description element (input)
			let taskDesc = taskDescEl.value.trim(); // trimmed task description
			if (taskDesc != "") { // makes sure there is a non-empty value
				toDoApi.addTodoItem(taskDesc, (data) => {
					taskDescEl.value = "";
					loadTodo(); // refreshes page after entering value
				});
			}
		});

		let checkboxes = document.getElementsByClassName("iscomplete"); // declaring variable name for checkbox in front end

		// for loop for all checkboxes
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i].addEventListener("click", function () {
				let id = this.parentElement.dataset.tdid;
				let complete = this.checked;

				toDoApi.setTodoItemCompleteStatus(id, complete, (data) => { });
			});
		}

		let btnsSave = document.getElementsByClassName("save");

		for (let i = 0; i < btnsSave.length; i++) {
			btnsSave[i].addEventListener("click", function () {
				let id = this.parentElement.dataset.tdid;
				let task = this.parentElement.getElementsByClassName("task")[0].value;
				let complete = this.parentElement.getElementsByClassName("iscomplete")[0].checked;

				toDoApi.updateTodoItem(id, task, complete, () => { });
			});
		}

		// 
		let btnsDelete = document.getElementsByClassName("delete");
		// if I want an event listener to target everything with this class name
		// need to use a loop
		// btnsDelete.length is providing the length of the list
		for (let i = 0; i < btnsDelete.length; i++) { // loop listens to all delete btns
			btnsDelete[i].addEventListener("click", function () {
				// to access data (line 13 in toDoList.hbs) we use dataset
				// tdid is a variable defined by a - after data
				// tdid is a data attribute, but the name itself is variable (can be named wtv)
				// but they have to match from document to document
				let id = this.parentElement.dataset.tdid;

				toDoApi.deleteToDoItem(id, (data) => {
					loadTodo(); // reloads page / data
				});
			});
		}
	});
};