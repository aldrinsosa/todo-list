const todoInput = document.getElementById('todo-input');
const button = document.getElementById('button-input');
const element = document.getElementById('todo-section');

var todoContent = [];
todoContent = JSON.parse(localStorage.getItem('todos')) || [];

document.onload = chargeTodos();
button.addEventListener('click', getData);

function getData(){
  const todo = todoInput.value;
  if(todo.length == 0){
    return(false);
  }
  else{
    todoContent.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoContent));
    createDiv(todo);
    todoInput.value = '';
    return(false);
  }
};

function createDiv(todo){
  const div = document.createElement('div');
  div.className = 'todo-div';
  element.appendChild(div);
  div.id = `div${element.children.length}`;
  createP(div.id, todo);
  createButton(div.id);
}

function createP(divId, todo){
  const div = document.getElementById(divId);
  const p = document.createElement('p');
  const text = document.createTextNode(todo);
  p.className = 'todo-text';
  p.appendChild(text);
  div.appendChild(p);
}

function createButton(divId){
  const div = document.getElementById(divId);
  const button = document.createElement('input')
  button.type = 'button';
  button.value = 'x';
  button.className = 'button';
  button.id = divId.replace('div', 'button');
  div.appendChild(button);
  button.addEventListener('click', clickButton);
}


function clickButton(e){
  const idButton = e.target.id;
  const idDiv = idButton.replace('button', 'div');
  const index = idDiv.replace('div', '');
  rmvDiv(idDiv, index);
  actIndexButton(index);
}

function rmvDiv(idDiv, index){
  const div = document.querySelector(`#${idDiv}`);
  element.removeChild(div)
  todoContent.splice(index - 1, 1);
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(todoContent));
  actIndexDiv(index);
}

function chargeTodos(){
  todoContent.forEach(existingTodo => {
    createDiv(existingTodo);
  });
}

function actIndexDiv(index){
  divs = document.querySelectorAll('.todo-div');
  divs.forEach(div => {
    indexDiv = div.id.replace('div', '');
    if (indexDiv > index){
      div.id = `div${indexDiv - 1}`;
    }
    else{
      return;
    }
  });
}

function actIndexButton(index){
  buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    indexButton = button.id.replace('button', '');
    if(indexButton > index){
      button.id = `button${indexButton - 1}`;
    }
    else{
      return;
    }
  });
}

