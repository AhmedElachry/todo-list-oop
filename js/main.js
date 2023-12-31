// grap eles
let form = document.querySelector(".form");
let todoInput = document.querySelector(".todo-input");
let submitBtn = document.querySelector(".submit");
let todosContainer = document.querySelector(".todos");

let todosArr = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = new Todo(crypto.randomUUID(), todoInput.value);
  todosArr = [...todosArr, todo];
  console.log(todosArr);
});

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}
