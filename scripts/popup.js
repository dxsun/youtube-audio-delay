console.log("CHECKPOINT0")

// alert('hello')

const slider = document.getElementById("delay-slider");
const text = document.getElementById("delay-text");

// set storage on display update
text.onchange = setStorage
slider.onchange = setStorage

// chrome.storage.sync.get("delay", (value) => {
//   text.value = value?.delay
// })


// // update display
slider.oninput = function() {
  console.log("CHECKPOINTA")
  text.value = this.value;
}
text.oninput = function() {
  console.log("CHECKPOINTB")
  slider.value = this.value;
}

function setStorage() {
  let x = this.value
  chrome.storage.sync.set({ delay: x})
  console.log("VALUE1:")
  console.log(this.value)

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   console.log(tabs[0].id)
  //   chrome.tabs.sendMessage(tabs[0].id, { x }, function(response) {
  //     console.log("ACKKNOWLEDGE")
  //     // console.log(response.ack);
  //   });
  // });
}

// chrome.storage.sync.get("delay", (value) => {
//   text.value = value.delay
//   slider.value = value.delay
// })