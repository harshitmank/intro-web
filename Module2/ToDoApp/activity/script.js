let addTodoButton=document.querySelector('.add-todo');
let todoInput=document.querySelector('.todo-input');
let todosList=document.querySelector('.todos-list-container');
//attach click event to addTodoButton

todoInput.addEventListener('keypress',function(e){
    if(e.key=='Enter'){
        addTodo();
    }
});
addTodoButton.addEventListener('click',function(){
    addTodo();
});


function addTodo(e){
    let todoInputValue=todoInput.value;
        if(todoInputValue){
            appendTodo(todoInputValue);
            todoInput.value='';
        }
}

function appendTodo(todo){
    let todoItemDiv=document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    let pTag=document.createElement("p");
    pTag.classList.add("todo");
    pTag.textContent=todo;
    //<p></p>

    let deleteTodobutton=document.createElement("button");
    deleteTodobutton.classList.add("delete-todo");
    deleteTodobutton.textContent="Delete";

    deleteTodobutton.addEventListener('click',deleteTodo);

    todoItemDiv.append(pTag);
    todoItemDiv.append(deleteTodobutton);

    // <div class="todo-item">
    //         <p class="to-doinput">Learn CSS</p>
    //         <button class="delete-todo">Delete</button>
    // </div>

    todosList.append(todoItemDiv);
}

function deleteTodo(e){
    e.target.parentNode.remove();
}