const colorSeed = document.getElementById("color-seed");
const colorMode = document.getElementById("color-mode");
const getColorBtn = document.getElementById("get-color-btn");
const hexCodes = document.getElementById("hex-codes");
const colorScheme = document.getElementById("color-scheme");
// Setting the initial color value to a random hex code
const randomColor = getRandomColor();
colorSeed.value = randomColor;
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Setting the initial screen to include color scheme that corresponds to random hex code
fetch(
  `https://www.thecolorapi.com/scheme/?hex=${randomColor.substring(1)}&mode=${
    colorMode.value
  }`
)
  .then((response) => response.json())
  .then((data) => {
    for (color of data.colors) {
      hexCodes.innerHTML += `
      <p>${color.hex.value}</p>
      `;
      colorScheme.innerHTML += `
      <div style="background-color:${color.hex.value};"></div>
    `;
    }
  });

getColorBtn.addEventListener("click", function () {
  colorScheme.innerHTML = "";
  hexCodes.innerHTML = "";
  fetch(
    `https://www.thecolorapi.com/scheme/?hex=${colorSeed.value.substring(
      1
    )}&mode=${colorMode.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (color of data.colors) {
        hexCodes.innerHTML += `
          <p>${color.hex.value}</p>
          `;
        colorScheme.innerHTML += `
          <div style="background-color:${color.hex.value};"></div>
        `;
      }
    });
});
