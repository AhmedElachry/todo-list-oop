// grap eles
let form = document.querySelector(".form");
let todoInput = document.querySelector(".todo-input");
let todosContainer = document.querySelector(".todos");
let deleteAllBtn = document.querySelector(".delete-all-btn");

class Storage {
  static addToStorage() {
    let storage = localStorage.setItem("todos", JSON.stringify(todosArr));
    return storage;
  }
  static getFromStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
}

let todosArr = Storage.getFromStorage() || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const uId = crypto.randomUUID();
  const todo = new Todo(uId, todoInput.value);
  todosArr = [...todosArr, todo];
  Storage.addToStorage();
  UI.showTodos();
  UI.resetInput();
  // Storage.getFromStorage();
});

deleteAllBtn.addEventListener("click", () => {
  UI.deleteAll();
});

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

class UI {
  static showTodos() {
    todosContainer.innerHTML = "";
    todosArr.forEach((todo) => {
      todosContainer.innerHTML += `
      <div class="todo" data-id=${todo.id}>
      <p> ${todo.todo}</p>
      <span class='delete'> 🗑️</span> </div>`;
    });
  }
  static resetInput() {
    todoInput.value = "";
  }

  static deleteTodo() {
    todosContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        let todoId = e.target.parentElement.getAttribute("data-id");
        this.deleteTodoFromArr(todoId);
      }
    });
  }
  static deleteTodoFromArr(id) {
    todosArr = todosArr.filter((todo) => todo.id !== id);
    Storage.addToStorage(todosArr);
    UI.showTodos();
  }

  static deleteAll() {
    todosContainer.innerHTML = "";
    localStorage.removeItem("todos");
    todosArr = [];
  }
}

window.addEventListener("DOMContentLoaded", () => {
  UI.showTodos();
  UI.deleteTodo();
});
