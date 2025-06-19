const inputBoxTitle = document.getElementById('inputTask');
const inputBoxDes = document.getElementById('inputTask-des');
const inputBoxPrio = document.getElementById('tasks');
const addbtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let isEditing = false;
let taskBeingEdited = null;

const getTasksFromStorage = () => JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasksToStorage = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

const toggleTaskCompletion = (taskToToggle, isCompleted) => {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.map(t =>
        (t.title === taskToToggle.title &&
            t.description === taskToToggle.description &&
            t.priority === taskToToggle.priority) ?
        {
            ...t,
            completed: isCompleted
        } :
        t
    );
    saveTasksToStorage(updatedTasks);
};

const deleteTaskFromStorage = (taskToDelete) => {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task =>
        !(task.title === taskToDelete.title &&
            task.description === taskToDelete.description &&
            task.priority === taskToDelete.priority)
    );
    saveTasksToStorage(tasks);
};

const renderTask = (task) => {
    const row = document.createElement("tr");
    if (task.completed) row.classList.add("completed");

    const checkCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        toggleTaskCompletion(task, task.completed);
        row.classList.toggle("completed", task.completed);
    });
    checkCell.appendChild(checkbox);

    const titleCell = document.createElement("td");
    const titleP = document.createElement("p");
    titleP.textContent = task.title;
    titleCell.appendChild(titleP);

    const descCell = document.createElement("td");
    const descP = document.createElement("p");
    descP.textContent = task.description;
    descCell.appendChild(descP);

    const prioCell = document.createElement("td");
    const prioP = document.createElement("p");
    prioP.textContent = task.priority;
    prioCell.appendChild(prioP);

    const actionCell = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-btn");
    editIcon.style.cursor = "pointer";

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-btn");
    deleteIcon.style.cursor = "pointer";

    deleteIcon.addEventListener("click", () => {
        row.remove();
        deleteTaskFromStorage(task);
    });

    editIcon.addEventListener("click", () => {
        inputBoxTitle.value = task.title;
        inputBoxDes.value = task.description;
        inputBoxPrio.value = task.priority;

        isEditing = true;
        taskBeingEdited = task;
        addbtn.value = "Update Task";
        addbtn.style.backgroundColor = "#f57c00";
    });

    actionCell.appendChild(editIcon);
    actionCell.appendChild(deleteIcon);

    row.appendChild(checkCell);
    row.appendChild(titleCell);
    row.appendChild(descCell);
    row.appendChild(prioCell);
    row.appendChild(actionCell);

    todoList.appendChild(row);
};

const loadTasks = () => {
    todoList.innerHTML = "";
    const tasks = getTasksFromStorage();
    tasks.forEach(renderTask);
};

window.addEventListener("DOMContentLoaded", loadTasks);

const addTask = () => {
    const title = inputBoxTitle.value.trim();
    const desc = inputBoxDes.value.trim();
    const priority = inputBoxPrio.value.trim();

    if (!title || !desc || !priority) {
        alert("Please fill in all the fields.");
        return;
    }

    if (isEditing && taskBeingEdited) {
        const tasks = getTasksFromStorage();
        const updatedTasks = tasks.map(t =>
            (t.title === taskBeingEdited.title &&
                t.description === taskBeingEdited.description &&
                t.priority === taskBeingEdited.priority) ?
            {
                ...t,
                title,
                description: desc,
                priority
            } :
            t
        );
        saveTasksToStorage(updatedTasks);
        loadTasks();

        isEditing = false;
        taskBeingEdited = null;
        addbtn.value = "Add Task";
        addbtn.style.backgroundColor = "#4e6688";
    } else {
        const task = {
            title,
            description: desc,
            priority,
            completed: false
        };
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);
        renderTask(task);
    }

    inputBoxTitle.value = "";
    inputBoxDes.value = "";
    inputBoxPrio.selectedIndex = 0;
};

addbtn.addEventListener('click', addTask);