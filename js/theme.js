let root = document.documentElement;
let themeButton = document.getElementById("themeButton");
let blue = "#14213d";
let grey = "#e5e5e5";

themeButton.addEventListener("click", () => {
  if (themeButton.className === "lightTheme") {
    root.style.setProperty("--blue", grey);
    root.style.setProperty("--grey", blue);
    themeButton.className = "darkTheme";
  } else {
    root.style.setProperty("--blue", blue);
    root.style.setProperty("--grey", grey);
    themeButton.className = "lightTheme";
  }
});
