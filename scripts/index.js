//obtains the elements from the html
const todoInput = document.querySelector("#todo-input");
const submitButton = document.querySelector("#button-input");
const element = document.querySelector("#todo-section");
const form = document.querySelector("#form");

//icons clases
const deleteIconClasses = "fa-solid fa-trash";
const editIconClasses = "fa-solid fa-pen";
const confirmIconClasses = "fa-solid fa-circle-check";
const cancelIconClasses = "fa-solid fa-circle-xmark";

//charges the todos and listen for submits
document.onload = chargeTodos();
submitButton.addEventListener("click", getData);
form.addEventListener("submit", getData);

function getData(e) {
  e.preventDefault();

  //gets the input from the textbox
  const todo = todoInput.value;

  //checks if the textbox is empty
  if (todo.length == 0) {
    todoInput.focus();
  } else {
      //gets an unique index
      const index = Date.now();

      //puts the todo in the localstorage
      localStorage.setItem(index, todo);

      //creates the todo
      createTodo(index,todo);

      //empties the input and focuses it
      todoInput.value = "";
      todoInput.focus();
  }
}

function createTodo(index,todo) {

  //creates element and assign it
  const div = document.createElement("div");
  div.className = "todo-div";
  div.id = `div${index}`;
  element.appendChild(div);
  
  //html of the div
  div.innerHTML = `
  <textarea readonly class="todo-text" id="text${index}" cols="30" rows="1">${todo}</textarea>
  <div class="buttons-div">
    <button type="submit" class="button editButton" id="edit${index}" ><i class="fa-solid fa-pen"></i></button>
    <button type="submit" class="button deleteButton" id="delete${index}" ><i class="fa-solid fa-trash"></i></button>
  </div>`;

  //Gets the buttons and the input
  const input = document.querySelector(`#text${index}`);
  const editButton = document.querySelector(`#edit${index}`);
  const deleteButton = document.querySelector(`#delete${index}`);

  //assigns the rows for the textarea 
  changeLines(input);

  editButton.addEventListener("click", (e) => {
    clickEvent(e, "edit");
  });

  deleteButton.addEventListener("click", (e) => {
    clickEvent(e, "delete");
  });
}

//handle the clicks
function clickEvent(e, event) {
  //initialize the variable
  let idButton;

  //checks if the the icon or the button was clicked
  if (
    e.target.className == deleteIconClasses ||
    e.target.className == editIconClasses || e.target.className == confirmIconClasses || e.target.className == cancelIconClasses
  ) {

    //gets the id of the button
    idButton = e.target.parentNode.id;
  } else {

    //gets the id of the button
    idButton = e.target.id;
  }

  if (event === "edit") {
    //cleans the id to get the index of the todo
    const index = idButton.replace("edit", "");

    editTodo(index);
  } else {
    //cleans the id to get the index of the todo
    const index = idButton.replace("delete", "");

    deleteTodo(index);
  }
}

function editTodo(index){
  //gets the input and the icons
  const input = document.querySelector(`#text${index}`);
  const editIcon = document.querySelector(`#edit${index}`).childNodes[0];
  const deleteIcon = document.querySelector(`#delete${index}`).childNodes[0];

  //saves the input in cache in case the user cancel the edit
  localStorage.setItem("cacheText", input.value);
  localStorage.setItem("cacheRows", input.rows);

  //checks if is editing or confirming the edit
  if (editIcon.className == editIconClasses){

    //changes the icons
    editIcon.className = confirmIconClasses;
    deleteIcon.className = cancelIconClasses;

    //makes the input editable
    input.removeAttribute("readonly");

    //set the cursor at the end
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();

    input.addEventListener("keydown", (e)=>{
      //if shift enter is pressed continues
      if(e.shiftKey){
      } 
      //if just enter is pressed save the changes
      else if(e.key == "Enter"){
        saveChanges(editIcon,deleteIcon,input,index)
      }
      //checks if the text area needs to be bigger
      changeLines(input);
    })

    input.addEventListener("keyup", ()=>{
      //checks if the text area needs to be bigger
      changeLines(input);
    })
  } 
  else{
    saveChanges(editIcon,deleteIcon,input,index)
  };
}

function saveChanges(editIcon,deleteIcon,input,index){
  //change the icons
  editIcon.className = editIconClasses;
  deleteIcon.className = deleteIconClasses;

  //makes the input not editable
  input.setAttribute("readonly", true);
  changeLines(input);

  //saves the changes in the local storage
  localStorage.setItem(index, input.value);
}

function deleteTodo(index) {

  //gets the div, the input and the icons
  const div = document.querySelector(`#div${index}`);
  const input = document.querySelector(`#text${index}`);
  const editIcon = document.querySelector(`#edit${index}`).childNodes[0];
  const deleteIcon = document.querySelector(`#delete${index}`).childNodes[0];

  //check if is deleting or canceling the edit
  if(deleteIcon.className == deleteIconClasses){
    //removes the div
    element.removeChild(div);
    //removes the todo in the localstorage
    localStorage.removeItem(index);
  }else{
    //sets the value and the size of the text area as the ones in the cache
    input.value = localStorage.getItem("cacheText");
    input.rows = localStorage.getItem("cacheRows");
    //changes the icons
    editIcon.className = editIconClasses;
    deleteIcon.className = deleteIconClasses;
  };
}

//creates the todos in the localstorage
function chargeTodos() {
  //checks if theres anything in the localstorage
  if (localStorage.length !== 0) {
    //transforms the localstorage into an object
    localstorage = JSON.parse(JSON.stringify(localStorage));

    //Sorts the data with the date of creation
    let localstorageSorted = Object.entries(localStorage).sort();

    //creates an todo for each one 
    for (let i in localstorageSorted) {
      //if it is the theme or the cache keys do nothing
      if(localstorageSorted[i][0] == "theme" || localstorageSorted[i][0] == "cacheText"|| localstorageSorted[i][0] == "cacheRows"){
      }
      else{
        createTodo(localstorageSorted[i][0], localstorageSorted[i][1]);
      }
    }
  }
}

//checks the height of the text area and assigns the neccesary rows
function changeLines(input){
  input.rows = Math.round(input.scrollHeight/18);
}