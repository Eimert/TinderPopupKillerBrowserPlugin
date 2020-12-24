let appName = "Tinder Popup Killer";
console.log(appName + " is monitoring for popups.");

// select the last centered foreground button element, and click it to close the modal
// let laterButton = [...document.querySelectorAll(".CenterAlign.button.Ell")].pop();
// let modal = document.querySelector("[role=dialog]");

let mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // console.log(mutation.addedNodes[0]);
    // if mutation == modal (check if modal is an irritating popup to be removed)
    if (mutation.addedNodes[0] !== undefined && mutation.addedNodes[0] === document.querySelector('[role="dialog"]')) {
      console.log(appName + " detected a modal.");
      // kill:
      strike();
    }
  });
});

// Starts listening for changes of the modal element on the page.
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});


function strike() {
  let laterButton = [...document.querySelectorAll(".CenterAlign.button.Ell")].pop();
  if (laterButton !== undefined) {
    laterButton.click();
    console.log(appName + " strike!");
  }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.message === "clicked_browser_action" ) {
    alert("Hello from " + appName + "!");
  }
});