// gets the button and the css variables
let root = document.documentElement;
let themeButton = document.getElementById("themeButton");

//declares the colors
let blue = "#14213d";
let grey = "#e5e5e5";

// listen to clicks
themeButton.addEventListener("click", () => {
  //checks the actual theme in the class of the button
  if (themeButton.className === "lightTheme themeButton") {
    //changes css variables
    root.style.setProperty("--blue", grey);
    root.style.setProperty("--grey", blue);
    //change tha class
    themeButton.className = "darkTheme themeButton";
  } else {
    root.style.setProperty("--blue", blue);
    root.style.setProperty("--grey", grey);
    themeButton.className = "lightTheme themeButton";
  }
});
