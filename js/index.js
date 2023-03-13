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
  div.innerHTML = `<input type="text" readonly id="paragraph${id}" value ="${todo}" class="todo-text">
  <div class="buttons-div">
  <button type="submit" class="button editButton" id="edit${id}" ><i class="fas fa-edit"></i></button>
  <button type="submit" class="button deleteButton" id="delete${id}" ><i class="fas fa-times"></i></button>
  </div>`;

  //Gets the buttons
  const childs = div.childNodes[2].childNodes;
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
    e.target.className == "fas fa-times" ||
    e.target.className == "fas fa-edit" || e.target.className == "fa-solid fa-check"
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
  const input = document.getElementById(`div${index}`).childNodes[0];
  const icon = document.getElementById(`div${index}`).childNodes[2].childNodes[1].childNodes[0];
  if (icon.className == "fas fa-edit"){
    icon.className = "fa-solid fa-check";
    input.removeAttribute("readonly");
    input.focus();
  } else{
    icon.className = "fas fa-edit";
    input.setAttribute("readonly", true);
    localStorage.setItem(index, input.value);
  }
  //<i class="fa-solid fa-check"></i>
  //fas fa-edit
}

//removes the todo
function deleteTodo(index) {
  //gets the div
  const div = document.querySelector(`#div${index}`);

  //removes the div
  element.removeChild(div);

  //removes the todo in the localstorage
  localStorage.removeItem(index);
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
      if(localstorageSorted[i][0] == "theme"){
        return false;
      }
      else{
        createTodo(localstorageSorted[i][1], localstorageSorted[i][0]);
      }
    }
  }
}
