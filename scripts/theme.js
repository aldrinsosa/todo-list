// gets the button and the css variables
let root = document.documentElement;
let themeButton = document.getElementById("themeButton");
//declare the colors
let blueLight = "#14213d";
let greyLight = "#e5e5e5";
let redLight = "#BF3838"
let blueDark = "#101A2E";
let greyDark = "#4C6088";
let redDark = "#9B2D2D"

//in case that the key doesnt exist  
if(!localStorage.getItem("theme")) {
  localStorage.setItem("theme","lightTheme");
}
else if(localStorage.getItem("theme") == "lightTheme"){
  setLight();
}
else{
  setDark();
};

// listen to clicks
themeButton.addEventListener("click", () => {
  //checks the actual theme in the class of the button
  if (localStorage.getItem("theme") == "lightTheme") {
    setDark();
  } else {
    setLight();
  }
});

function setDark(){
  //changes css variables
  root.style.setProperty("--blue", blueDark);
  root.style.setProperty("--grey", greyDark);
  root.style.setProperty("--red", redDark);
  //change tha class
  localStorage.setItem("theme","darkTheme");
}

function setLight(){
  root.style.setProperty("--blue", blueLight);
  root.style.setProperty("--grey", greyLight);
  root.style.setProperty("--red", redLight);
  localStorage.setItem("theme","lightTheme");
}