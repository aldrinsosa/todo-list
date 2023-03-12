//obtain the elements from the html
const todoInput = document.getElementById("todo-input");
const button = document.getElementById("button-input");
const element = document.getElementById("todo-section");
const form = document.getElementById("form");

//edit status
var edit = false;

//get the todos from the localstorage
var todoContent = [];
todoContent = JSON.parse(localStorage.getItem("todos")) || [];

//charge the todos and listen for submits
document.onload = chargeTodos();
button.addEventListener("click", getData);
form.addEventListener("submit", getData);

//get todo from the input
function getData(e) {
  e.preventDefault();

  //get the input
  const todo = todoInput.value;

  //check for the edit status
  if (!edit) {
    //check if had a word
    if (todo.length == 0) {
      return false;
    } else {
      //put the todo in the localstorage
      todoContent.push(todo);
      localStorage.setItem("todos", JSON.stringify(todoContent));

      //create a todo
      createDiv(todo);

      //clean the input
      todoInput.value = "";
      return false;
    }
  } else {
    //return if is editing
    return;
  }
}

//create the div
function createDiv(todo) {
  //create element and assign it
  const div = document.createElement("div");
  div.className = "todo-div";
  element.appendChild(div);

  //create and assign the index
  index = element.children.length;
  div.id = `div${index}`;

  //html of a div
  div.innerHTML = `<p class="todo-text" id="p${index}">${todo}</p>
  <div class="buttons-div">
  <button type="submit" class="button deleteButton" id="button${index}" ><i class="fas fa-times"></i></button>
  </div>`;

  //<button type="submit" class="button editButton" id="edit${index}" ><i class="fas fa-edit"></i></button>

  //listen for clicks in the buttons
  addListener(div);
}

//listen for click
function addListener(div) {
  //get the buttons from the div
  const childs = div.childNodes[2].childNodes;
  const button = childs[1];
  //const edit = childs[1];

  //add event listener
  button.addEventListener("click", clickButton);
  //edit.addEventListener('click', clickEdit);
}

//event to delete the div
function clickButton(e) {
  if (edit) {
    edit = false;
    button.value = "Submit";
    todoInput.value = "";
  }

  //check if is the icon
  if (e.target.className == "fas fa-times") {
    //get the id
    var idButton = e.target.parentNode.id;
  } else {
    //get the id
    var idButton = e.target.id;
  }
  const index = idButton.replace("button", "");
  const idDiv = idButton.replace("button", "div");

  //remove the div and update the index of the buttons
  rmvDiv(idDiv, index);
  actIndexButton(index);
  actIndexEdit(index);
}

//event to edit the div
function clickEdit(e) {
  //set the edit status in true
  edit = true;

  //check if is the icon
  if (e.target.className == "fas fa-edit") {
    //get the id
    var idButton = e.target.parentNode.id;
  } else {
    //get the id
    var idButton = e.target.id;
  }
  const index = idButton.replace("edit", "");

  //edit the div
  editTodo(index);
}

//remove the div
function rmvDiv(idDiv, index) {
  //get the div
  const div = document.querySelector(`#${idDiv}`);

  //remove div
  element.removeChild(div);

  //update the array of todos
  todoContent.splice(index - 1, 1);

  //update the localstorage
  localStorage.removeItem("todos");
  localStorage.setItem("todos", JSON.stringify(todoContent));

  //update the index of the div
  actIndexDiv(index);
}

//create the todos of the localstorage
function chargeTodos() {
  todoContent.forEach((existingTodo) => {
    createDiv(existingTodo);
  });
}

//edit the todo
function editTodo(index) {
  //get the p to edit
  var p = document.getElementById(`p${index}`);

  //set the value of the input and edit the button
  todoInput.value = p.innerHTML;
  todoInput.focus();
  button.value = "Edit";

  //listen for submits
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //check the edit status
    if (edit) {
      //update the value of the todo, the edit status and the button
      p.innerHTML = todoInput.value;
      edit = false;
      button.value = "Submit";
      todoInput.value = "";
    }

    //if is alredy editing dont do anything
    else {
      return;
    }
  });

  //listen for clicks
  button.addEventListener("click", (e) => {
    e.preventDefault();

    //check the edit status
    if (edit) {
      //update the value of the todo, the edit status and the button
      p.innerHTML = todoInput.value;
      edit = false;
      button.value = "Submit";
      todoInput.value = "";
    }

    //if is alredy editing dont do anything
    else {
      return;
    }
  });
}

//update the id of the divs
function actIndexDiv(index) {
  //get the actual index
  indexInt = parseInt(index);

  //get all the divs
  divs = document.querySelectorAll(".todo-div");

  //iterate every div
  divs.forEach((div) => {
    //get the index from the id
    indexDiv = parseInt(div.id.replace("div", ""));

    //update the index if is greater than the actual index
    if (indexDiv > indexInt) {
      div.id = `div${indexDiv - 1}`;
    } else {
      return;
    }
  });
}

//update the id for the delete buttons
function actIndexButton(index) {
  //get the actual index
  indexInt = parseInt(index);

  //get all the delete buttons
  buttons = document.querySelectorAll(".deleteButton");

  //iterate every button
  buttons.forEach((button) => {
    //get the index from the id
    indexButton = parseInt(button.id.replace("button", ""));

    //update the index if is greater than the actual index
    if (indexButton > indexInt) {
      button.id = `button${indexButton - 1}`;
    } else {
      return;
    }
  });
}

//uptade the id for the edit buttons
function actIndexEdit(index) {
  //get the actual index
  indexInt = parseInt(index);

  //get all the edit buttons
  edits = document.querySelectorAll(".editButton");

  //iterate every button
  edits.forEach((edit) => {
    //get the index from the id
    indexEdit = parseInt(edit.id.replace("edit", ""));

    //update the index if is greater than the actual index
    if (indexEdit > indexInt) {
      edit.id = `edit${indexEdit - 1}`;
    } else {
      return;
    }
  });
}
