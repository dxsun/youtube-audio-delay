const MAX_TIME_DELAY = 10

var delayValue = 0;
var delayNode;
var videoPlayer;
var timeoutCallback;

// Takes delay in milliseconds
const setDelay = (delay) => {
  delayInSeconds = delay/1000
  if (delayNode.delayTime.value !== delayInSeconds) {
  	console.log("CHECKPOINT3: ENTERED")
  	console.log(delayInSeconds)
  	
  	delayNode.delayTime.value = delayInSeconds;
  	videoPlayer.pause()
  	if (timeoutCallback) {
  		clearTimeout(timeoutCallback)
  	}
  	timeoutCallback = setTimeout(() => {}, delayValue)
  	videoPlayer.play()
  }
}

window.onload = () => {
	videoPlayer = document.querySelector('.html5-main-video');
	const context = new AudioContext();
	const source = context.createMediaElementSource(videoPlayer);
	delayNode = context.createDelay(MAX_TIME_DELAY);
	delayNode.delayTime.value = delayValue

	source.connect(delayNode);
	delayNode.connect(context.destination);
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
  	console.log("LISTENED")
    if (request.delay) {
      setDelay(request.delay);
      sendResponse({success: true});
    }
    return true;
  }
);
