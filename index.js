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
  index = element.children.length;
  div.id = `div${index}`;
  div.innerHTML = `<p class="todo-text">${todo}</p>
  <input type="button" class="button" value="x" id="button${index}" ></input>`;
  addListener(div);
}

function addListener(div){
  const childs = div.childNodes;
  const button = childs[2];
  button.addEventListener('click', clickButton);
}

function clickButton(e){
  const idButton = e.target.id;
  const index = idButton.replace('button', '');
  const idDiv = idButton.replace('button', 'div');
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
  indexInt = parseInt(index);
  divs = document.querySelectorAll('.todo-div');
  divs.forEach(div => {
    indexDiv = parseInt(div.id.replace('div', ''));
    if (indexDiv > indexInt){
      div.id = `div${indexDiv - 1}`;
    }
    else{
      return;
    }
  });
}

function actIndexButton(index){
  indexInt = parseInt(index);
  buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    indexButton = parseInt(button.id.replace('button', ''));
    if(indexButton > indexInt){
      button.id = `button${indexButton - 1}`;
    }
    else{
      return;
    }
  });
}

