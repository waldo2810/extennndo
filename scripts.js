async function getData() {
  await fetch("https://www.entropyplus.xyz/api/v1/images")
    .then((res) => res.json())
    .then((res) => {
      console.log(res[0].url);
      const imgUrl = res[0].url;
      const imageDiv = document.querySelector(".background-image");

      imageDiv.style.backgroundImage = `url(${imgUrl})`;
    })
    .catch((err) => console.log(err));
}

const toggleBtn = document.querySelector("#toggle-btn");
const body = document.querySelector("body");
let isLight = false;

toggleBtn.addEventListener("click", () => {
  isLight = !isLight;
  isLight ? (toggleBtn.innerText = "💡") : (toggleBtn.innerText = "🌙");
  body.classList.toggle("light");
});

getData();
