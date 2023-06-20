totalBlocks = 7000000;
let stop = false;

async function getData() {
  while (stop === false) {
    const randomNumber = Math.floor(Math.random() * totalBlocks) + 1;
    const res = await fetch(`https://api.are.na/v2/blocks/${randomNumber}`);

    if (!res.ok) {
      stop = true
    }

      blockInfo = await res.json();

    if (blockInfo.class === "Image") {

      const imageUrl = blockInfo.image.original.url
      const imageDiv = document.querySelector(
        ".extennndo-extension-background-image"
      );

      imageDiv.style.backgroundImage = `url(${imageUrl})`;
      console.log(blockInfo); // Display the block information
      stop = true
    }
  }

}

getData();

const toggleBtn = document.querySelector("#extennndo-extension-toggle-btn");
const body = document.querySelector("body");
let isLight = false;

toggleBtn.addEventListener("click", () => {
  isLight = !isLight;
  isLight ? (toggleBtn.innerText = "💡") : (toggleBtn.innerText = "🌙");
  body.classList.toggle("light");
});
