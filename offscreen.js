// Once the message has been posted from the service worker, checks are made to
// confirm the message type and target before proceeding. This is so that the
// module can easily be adapted into existing workflows where secondary uses for
// the document (or alternate offscreen documents) might be implemented.

// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.
chrome.runtime.onMessage.addListener(messageHandler);

// This function performs basic filtering and error checking on messages before
// dispatching the message to a more specific message handler.
async function messageHandler(request) {
  if (request.action === "copyToClipboard") {
    // Create a temporary el for the HTML content
    const el = document.createElement("div");

    // Set the innerHTML to the desired content
    el.innerHTML = `<a href="${request.url}">${request.title}</a>`;

    // Append the el to the body of the offscreen document
    document.body.appendChild(el);

    // Create a range and select the content
    const range = document.createRange();
    range.selectNodeContents(el);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      // Copy the selected content to the clipboard
      document.execCommand("copy");
      console.log("Link copied to clipboard successfully!");
    } catch (err) {
      console.error("Failed to copy link to clipboard:", err);
    }

    // Clean up by removing the temporary el
    document.body.removeChild(el);
  }
}
