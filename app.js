const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

// when todoBtn clicked
document.addEventListener("DOMContentLoaded", getTodo)
todoBtn.addEventListener("click", todoApp);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", todosFilter);

// function
function todoApp(){
  event.preventDefault();

  // todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create li
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todoInput.value;
  todoDiv.appendChild(todoLi);

  //save to local storage
  savelocalTodo(todoInput.value);

  // mark checked
  const completeButton = document.createElement("button")
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  // trash checked
  const trashButton = document.createElement("button")
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // add todoDiv to todoList
  todoList.appendChild(todoDiv);

  // clear
  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;

  //delete
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    todo.classList.add("remove");
    removelocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    })
  }
  // check
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("complete");
  }
}

function todosFilter(e){
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch(e.target.value){
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if(todo.classList.contains("complete")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none";
        }
        break;
      case "Uncompleted":
        if(!todo.classList.contains("complete")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none";
        }
        break;
    }
  })
}

function savelocalTodo(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo(){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(todo => {
  // todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todo;
  todoDiv.appendChild(todoLi);

  // mark checked
  const completeButton = document.createElement("button")
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  
  // trash checked
  const trashButton = document.createElement("button")
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // add todoDiv to todoList
  todoList.appendChild(todoDiv);
  })
}

function removelocalTodo(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}