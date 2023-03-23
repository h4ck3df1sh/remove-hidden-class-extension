document.addEventListener("DOMContentLoaded", function(event) {
    const revealBtn = document.getElementById("reveal-btn");
    const triggerBtn = document.getElementById("trigger-btn");
  
    revealBtn.addEventListener("click", function() {
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {action: "reveal_elements"});
      });
    });
  
    triggerBtn.addEventListener("click", function() {
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {action: "trigger_buttons"});
      });
    });
  });