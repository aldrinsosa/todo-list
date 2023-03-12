// gets the button and the css variables
let root = document.documentElement;
let themeButton = document.getElementById("themeButton");

//declare the colors
let blueLight = "#14213d";
let greyLight = "#e5e5e5";
let blueDark = "#101A2E";
let greyDark = "#4C6088";

// listen to clicks
themeButton.addEventListener("click", () => {
  //checks the actual theme in the class of the button
  if (themeButton.className === "lightTheme themeButton") {
    //changes css variables
    root.style.setProperty("--blue", blueDark);
    root.style.setProperty("--grey", greyDark);
    //change tha class
    themeButton.className = "darkTheme themeButton";
  } else {
    root.style.setProperty("--blue", blueLight);
    root.style.setProperty("--grey", greyLight);
    themeButton.className = "lightTheme themeButton";
  }
});
