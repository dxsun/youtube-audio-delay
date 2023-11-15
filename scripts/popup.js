const slider = document.getElementById("delay-slider");
const text = document.getElementById("delay-text");

// set storage on display update
text.onchange = setStorage
slider.onchange = setStorage

// // update display
slider.oninput = function() {
  text.value = this.value;
}
text.oninput = function() {
  slider.value = this.value;
}

function setStorage() {
  let delayValue = this.value
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0].id
    console.log("active tab", activeTab)
    chrome.tabs.sendMessage(activeTab, { delay: delayValue }, function(response) {
      console.log("got a response")
      console.log(response)
    })
  });

  console.log("VALUE1:")
  console.log(this.value)
}