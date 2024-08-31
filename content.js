chrome.runtime.onMessage.addListener(handler);

async function handler(request) {
  switch (request.action) {
    case "showAlert":
      const font = addGoogleFont();
      const div = document.createElement("div");
      div.style.all = "unset";
      div.textContent = "Copied";
      div.style.backgroundColor = "#ffffff";
      div.style.borderRadius = "4px";
      div.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
      div.style.color;
      div.style.fontFamily = "Roboto";
      div.style.fontSize = "14px";
      div.style.left = "50%";
      div.style.padding = "8px 12px";
      div.style.position = "fixed";
      div.style.top = "12px";
      div.style.transform = "translateX(-50%)";
      div.style.zIndex = "9999";
      document.body.appendChild(div);
      await delay(2000);
      div.remove();
      font.remove();
      break;
    default:
      break;
  }
}

function addGoogleFont() {
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
  return fontLink;
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
