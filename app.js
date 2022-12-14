const todoInput = document.querySelector("#todo");
const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup",filterTodos);
  clearButton.addEventListener("click",clearAllTodos);
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please enter a task");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Successfully added");
  }

  e.preventDefault();
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");

  listItem.className = "list-group-item d-flex justify-content-between";

  const link = document.createElement("a");
  link.className = "delete-item";
  link.href = "#";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.appendChild(document.createTextNode(newTodo));

  listItem.appendChild(link);

  todoList.appendChild(listItem);

  todoInput.value = "";
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodosFromStorage(newTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos =JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "successfully deleted");
  }
}

function deleteTodosFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e){
  let filterValue =e.target.value.toLowerCase();
  let listItem=document.querySelectorAll(".list-group-item");

  listItem.forEach(function(listItem){
    const text=listItem.textContent.toLocaleLowerCase();
    if(text.indexOf(filterValue)===- 1){
      listItem.setAttribute("style","display:none  !important");
    }else{
      listItem.setAttribute("style","display: block")
    }
  })
}

function clearAllTodos(e){
  if(confirm("Are you sure you want to delete them all?")){
    while(todoList.firstElementChild != null){
      todoList.removeChild(todoList.firstElementChild);
    
    }
    // todoList.innerHTML="";
    localStorage.removeItem("todos");
 
  }
}