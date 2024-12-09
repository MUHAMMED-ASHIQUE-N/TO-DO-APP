document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    taskDisplay();
    displayTaskCount();
  }
});

const taskIput = document.getElementById("input");
const addBtn = document.getElementById("submit");
const taskList = document.getElementById("display-value");
const taskCompleted = document.getElementById("task-completed");
const totalTaskCount = document.getElementById("total-tasks");

let tasks = [];

const savTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

addBtn.addEventListener("click", () => {
  addTaskFromInput();
});

function addTaskFromInput() {
  const tastText = taskIput.value.trim();
  if (tastText) {
    addTask(tastText);
    taskIput.value = "";
  }
}

taskIput.addEventListener("keypress", (taskText) => {
  if (taskText.key === "Enter") {
    addTaskFromInput();
  }
});

function addTask(taskText) {
  const task = { text: taskText, completed: false };
  tasks.push(task);
  taskDisplay();
  displayTaskCount();
  savTasks();
}

function taskDisplay() {
  taskList.innerHTML = "";

  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];

    const li = document.createElement("li");
    li.className = "task-li";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "check-comple";
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", () => taskCompletion(index));

    const taskText = document.createElement("span");
    taskText.className = "text";
    taskText.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = `<img src="./images/edit-button.png" alt="">`;
    editBtn.style.backgroundColor = "transparent";
    editBtn.addEventListener("click", () => editTask(index, li));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<img src="./images/delete-button.png" alt="">`;
    deleteBtn.style.backgroundColor = "transparent";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkBox);
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  }

  displayCompletedCount();
}

function editTask(index, li) {
  const currentTask = tasks[index];
  const currentTaskElement = li.querySelector("span");

  const input = document.createElement("input");
  input.value = currentTask.text;
  input.className = "edit-new-input";

  li.replaceChild(input, currentTaskElement);
  input.focus();

  input.addEventListener("blur", () => saveEdit(input, index, li));

  savTasks();
}

function saveEdit(input, index, li) {
  const newText = input.value.trim();
  if (newText) {
    tasks[index].text = newText;
  }
  taskDisplay();
  savTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  taskDisplay();
  displayTaskCount();
  savTasks();
}
function taskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  displayCompletedCount();
  taskDisplay();
  if (tasks.every((task) => task.completed)) {
    celebration();
  }
}

function displayTaskCount() {
  totalTaskCount.textContent = tasks.length;
}

function displayCompletedCount() {
  const completedCount = tasks.filter((task) => task.completed).length;
  taskCompleted.textContent = `${completedCount}`;
}

function celebration() {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}