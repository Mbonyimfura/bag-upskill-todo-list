window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");
  //get username from localStorage
  const username = localStorage.getItem("username") || "";

  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });
  // event for handling form submission
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const contentValue = e.target.elements.content.value.trim();
    if (!contentValue) {
      showError("Please enter a non-empty task.");
      return;
    }
    // todo object
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      isImportant: false,
      createdAt: new Date().getTime(),
    };
    todos.unshift(todo);
    //Save data to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form
    e.target.reset();
    // call displayTodos function
    DisplayTodos();
  });

  const contentInput = newTodoForm.elements.content;
  contentInput.addEventListener("input", () => {
    clearError();
  });
  // call displayTodos function
  DisplayTodos();
});
// DisplayTodos function
function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  //  sort or move important tasks to the top
  todos.sort((a, b) => {
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    return 0;
  });

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");
    const markImportantButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");
    markImportantButton.classList.add("mark-important");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    markImportantButton.innerHTML = todo.isImportant
      ? "Unmark Important"
      : "Mark Important";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    actions.appendChild(markImportantButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });

    markImportantButton.addEventListener("click", () => {
      todo.isImportant = !todo.isImportant;
      markImportantButton.innerHTML = todo.isImportant
        ? "Unmark Important"
        : "Mark Important";
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });

    if (todo.isImportant) {
      todoItem.classList.add("important");
    }
  });
}

function showError(message) {
  const errorMessageDiv = document.querySelector(".error-message");
  errorMessageDiv.textContent = message;
}

function clearError() {
  const errorMessageDiv = document.querySelector(".error-message");
  errorMessageDiv.textContent = "";
}
