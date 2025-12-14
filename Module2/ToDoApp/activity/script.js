let addTodoButton=document.querySelector('.add-todo');
let TodoInput=document.querySelector('.todo-input');
//attach click event to addTodoButton

TodoInput.addEventListener('keypress',addTodo);

function addTodo(e){
    if(e.key=="Enter"){
        let TodoInputValue=TodoInput.value;
        console.log(TodoInputValue);
        TodoInput.value="";
    }
}

// addTodoButton.addEventListener('click',addTodo);

// function addTodo(){
//     let todoInputValue=todoInput.value;
//     if(todoInputValue){
//         console.log(todoInputValue);
//         todoInput.value='';
//     }
// }