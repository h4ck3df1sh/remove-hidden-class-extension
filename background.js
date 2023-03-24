function revealHiddenElements() {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs
      .sendMessage(tabs[0].id, { action: "reveal_elements" })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  const revealBtn = document.getElementById("reveal-btn");

  revealBtn.addEventListener("click", function () {
    revealHiddenElements();
  });
});
