let todos = [];
let initButton = document.querySelector("#addTaskBtn");
let addTaskContainer = document.querySelector("#addTaskContainer");
let addTask = document.querySelector("#addTask");

let taskInput = document.querySelector("#taskInput");
let dueDateInput = document.querySelector("#dueDateInput");
let todosContainer = document.querySelector("#todosContainer");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

initButton.addEventListener("click", () => {
  addTaskContainer.classList.remove("hidden");
});

function renderTodos() {
  let statusClass = "";
  let resetStatus = "";

  todos.forEach((todo, index) => {
    if (todo.status === "done") {
      statusClass = "bg-green-50 border-green-200";
    } else {
      statusClass = "bg-white";
    }

    if (todo.status === "not done") {
      resetStatus = "bg-white";
    }

    let date = new Date(todo.dueDate);
    let Fdate = date.toLocaleDateString("en", options);
    let div = document.createElement("div");
    div.innerHTML = `<div id="taskStatus" class="border border-violet-200 bg-blue-50 hover:shadow-md rounded-xl p-3 mt-1 mb-1  ${statusClass} ${resetStatus}" >
                <div class="flex gap-3 items-center">
          <h1 class="text-[18px] font-medium text-neutral-700">
           ${todo.task}
          </h1>
        </div>
        <p class="text-neutral-500 text-sm">
        ${Fdate}
        </p>
        <div class="flex gap-8">
          <button id="taskCompleted" data-id="${index}"
            class="text-neutral-500 hover:text-green-700 flex gap-1 mt-3 text-sm items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-check2-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"
              />
              <path
                d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
              />
            </svg>
            Mark as Done
          </button>
          <button id="deleteTaskBtn" data-id="${index}"
            class="text-neutral-500 hover:text-red-500 flex gap-1 mt-3 text-sm items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
              />
              <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
              />
            </svg>
            Delete
          </button>
          <button id="resetTask" data-id="${index}"
            class="text-neutral-500 hover:text-violet-500 flex gap-1 mt-3 text-sm items-center"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg>
            Reset
          </button>
        </div>
      </div>`;

    todosContainer.appendChild(div);
  });

  let taskCompletedBtn = document.querySelectorAll("#taskCompleted");
  let deleteTaskBtn = document.querySelectorAll("#deleteTaskBtn");
  let resetTask = document.querySelectorAll("#resetTask");

  taskCompletedBtn.forEach((taskCompleted) => {
    taskCompleted.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");
      console.log(index);
      let todo = todos[index];
      todo.status = "done";
      todosContainer.innerHTML = "";
      renderTodos();
    });
  });

  deleteTaskBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");
      todos.splice(index, 1);

      todosContainer.innerHTML = "";
      renderTodos();
    });
  });

  resetTask.forEach((resetBtn) => {
    resetBtn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");
      console.log(index);
      let todo = todos[index];
      todo.status = "not done";
      todosContainer.innerHTML = "";
      renderTodos();
    });
  });
}

addTask.addEventListener("click", () => {
  let task = {
    task: taskInput.value,
    dueDate: dueDateInput.value,
  };
  addTaskContainer.classList.add("hidden");

  todos.push(task);
  console.log(todos);
  todosContainer.innerHTML = "";

  renderTodos();
});

var el = document.getElementById("todosContainer");
new Sortable(el, {
  animation: 150,
  ghostClass: "blue-background-class",
});
