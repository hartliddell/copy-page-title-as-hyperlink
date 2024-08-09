chrome.action.onClicked.addListener(clickHandler);

async function clickHandler(tab) {
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: "Write text to the clipboard.",
  });

  await chrome.runtime.sendMessage({
    action: "copyToClipboard",
    title: tab.title,
    url: tab.url,
  });

  setTimeout(() => {
    chrome.offscreen.closeDocument();
  }, 1000);
}
