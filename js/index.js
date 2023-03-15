//obtains the elements from the html
const todoInput = document.getElementById("todo-input");
const submitButton = document.getElementById("button-input");
const element = document.getElementById("todo-section");
const form = document.getElementById("form");

//charges the todos and listen for submits
document.onload = chargeTodos();
submitButton.addEventListener("click", getData);
form.addEventListener("submit", getData);

//gets the input from the textbox
function getData(e) {
  e.preventDefault();

  //gets the text
  const todo = todoInput.value;
  
  //checks if the texbox is empty
  if (todo.length == 0) {
    return false;
  } else {
      //gets an unique id
      const id = Date.now();
      //puts the todo in the localstorage
      localStorage.setItem(id, todo); //to do
      //creates the todo
      createTodo(todo, id);
      //empties the input
      todoInput.value = "";
      return false;
  }
}

//creates the html for the todo
function createTodo(todo, id) {
  //creates element and assign it
  const div = document.createElement("div");
  div.className = "todo-div";
  element.appendChild(div);

  //assigns the index to the div
  div.id = `div${id}`;

  //html of the div
  div.innerHTML = `
  <textarea readonly class="todo-text" id="paragraph${id}" cols="30" rows="1">${todo}</textarea>
  <div class="buttons-div">
  <button type="submit" class="button editButton" id="edit${id}" ><i class="fa-solid fa-pen"></i></button>
  <button type="submit" class="button deleteButton" id="delete${id}" ><i class="fa-solid fa-trash"></i></button>
  </div>`;

  //<input type="text" readonly id="paragraph${id}" value ="${todo}" class="todo-text">
  //<textarea readonly class="todo-text" id="paragraph${id}" cols="30" rows="1">${todo}</textarea>
  
  //Gets the buttons
  const childs = div.childNodes[3].childNodes;
  const editButton = childs[1];
  const deleteButton = childs[3];

  //Makes each button listen for clicks
  editButton.addEventListener("click", (e) => {
    clickEvent(e, "edit");
  });

  deleteButton.addEventListener("click", (e) => {
    clickEvent(e, "delete");
  });
}

//event to delete the div
function clickEvent(e, event) {
  //checks if the the icon or the button was clicked
  if (
    e.target.className == "fa-solid fa-trash" ||
    e.target.className == "fa-solid fa-pen" || e.target.className == "fa-solid fa-circle-check" || e.target.className == "fa-solid fa-circle-xmark"
  ) {
    //gets the id of the button
    var idButton = e.target.parentNode.id;
  } else {
    //gets the id of the button
    var idButton = e.target.id;
  }

  if (event === "edit") {
    //cleans the id to get the index of the todo
    const index = idButton.replace("edit", "");

    //edits the todo
    editTodo(index);
  } else {
    //cleans the id to get the index of the todo
    const index = idButton.replace("delete", "");

    //removes the todo
    deleteTodo(index);
  }
}

function editTodo(index){
  //gets the div
  const div = document.querySelector(`#div${index}`);
  //gets the input and the icons
  const input = div.childNodes[1];
  const editIcon = div.childNodes[3].childNodes[1].childNodes[0];
  const deleteIcon = div.childNodes[3].childNodes[3].childNodes[0];

  //saves the input in case the user cancel the edit
  localStorage.setItem("cache", input.value);

  //checks if is editing or confirming the edit
  if (editIcon.className == "fa-solid fa-pen"){
    //changes the icons
    editIcon.className = "fa-solid fa-circle-check";
    deleteIcon.className = "fa-solid fa-circle-xmark";
    //makes the input editable
    input.removeAttribute("readonly");
    input.focus();
  } else{
    //changes the icons
    editIcon.className = "fa-solid fa-pen";
    deleteIcon.className = "fa-solid fa-trash";
    //makes the input not editable
    input.setAttribute("readonly", true);
    //saves the change in the local storage
    localStorage.setItem(index, input.value);
  };
}

//removes the todo
function deleteTodo(index) {
  //gets the div
  const div = document.querySelector(`#div${index}`);
  //gets the input and the icons
  const input = div.childNodes[0];
  const editIcon = div.childNodes[2].childNodes[1].childNodes[0];
  const deleteIcon = div.childNodes[2].childNodes[3].childNodes[0];

  //check if is deleting or canceling
  if(deleteIcon.className == "fa-solid fa-trash"){
    //removes the div
    element.removeChild(div);
    //removes the todo in the localstorage
    localStorage.removeItem(index);
  }else{
    //sets the value as the one in the cache
    input.value = localStorage.getItem("cache");
    //changes the icons
    editIcon.className = "fa-solid fa-pen";
    deleteIcon.className = "fa-solid fa-trash";
  };
}

//creates the todos in the localstorage
function chargeTodos() {
  //checks if theres anything in the localstorage
  if (localStorage.length !== 0) {
    //transforms the localstorage into an object
    localstorage = JSON.parse(JSON.stringify(localStorage));
    //Sorts the data with the date
    let localstorageSorted = Object.entries(localStorage).sort();
    //creates an todo for each one and checks if is the theme key
    for (var i in localstorageSorted) {
      if(localstorageSorted[i][0] == "theme" || localstorageSorted[i][0] == "cache"){
        return false;
      }
      else{
        createTodo(localstorageSorted[i][1], localstorageSorted[i][0]);
      }
    }
  }
}
