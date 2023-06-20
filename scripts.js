const blockContentDiv = document.querySelector(".extension-block-content");
const toggleBtn = document.querySelector("#extension-toggle-btn");
const body = document.querySelector("body");
let totalBlocks = 7000000;
let stop = false;
let isLight = false;

// Dark mode
toggleBtn.addEventListener("click", () => {
  isLight = !isLight;
  isLight ? (toggleBtn.innerText = "💡") : (toggleBtn.innerText = "🌙");
  body.classList.toggle("light");
});

// Content fetching
async function setExtensionImage() {
  while (stop === false) {
    const randomNumber = Math.floor(Math.random() * totalBlocks) + 1;
    const res = await fetch(`https://api.are.na/v2/blocks/${randomNumber}`);

    if (!res.ok) {
      stop === true
    }

    blockInfo = await res.json();
    console.log(blockInfo); // Display the block information

    if (blockInfo.class === "Image") {
      const imageUrl = blockInfo.image.display.url;
      blockContentDiv.style.backgroundImage = `url(${imageUrl})`;
      break;
    }

    if (blockInfo.class === "Text") {
      const h2 = document.createElement("h2");
      const p = document.createElement("p");

      h2.innerHTML = blockInfo.generated_title;
      p.innerHTML = blockInfo.content;

      blockContentDiv.appendChild(h2);
      blockContentDiv.appendChild(p);
      break;
    }

    if (
      blockInfo.class === "Link" ||
      blockInfo.class === "Media" ||
      blockInfo.class === "Attachment"
    ) {
      const h2 = document.createElement("h2");
      const a = document.createElement("a");
      const p = document.createElement("p");
      const image = document.createElement("img");
      const imageUrl = blockInfo.image.display.url;
      const div = document.createElement("div");

      a.innerHTML = blockInfo.generated_title + " ↗";
      if (blockInfo.class === "Attachment") {
        a.href = blockInfo.attachment.url;
      } else {
        a.href = blockInfo.source.url;
      }
      h2.appendChild(a);
      p.innerHTML = blockInfo.description_html;
      image.setAttribute("src", imageUrl);
      div.classList.add("block-media-container");
      div.appendChild(image);

      blockContentDiv.appendChild(h2);
      blockContentDiv.appendChild(div);
      blockContentDiv.appendChild(p);
      break;
    }
  }
}

setExtensionImage();
