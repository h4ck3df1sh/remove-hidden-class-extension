function removeHiddenClass() {
  const hiddenElems = document.querySelectorAll(".hidden");
  if (hiddenElems.length === 0){
    return ("No hidden elements were found!");
  }
  for (let elem of hiddenElems) {
    elem.classList.remove("hidden");
  }
  return ("Revealed all hidden elements of document!");
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "reveal_elements":
      sendResponse(removeHiddenClass());
      break;
    default:
      break;
  }
});
