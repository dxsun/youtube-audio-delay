// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

// var context;
// var filter;

// const init = () => {
//   if (context === undefined) {
//     context = new AudioContext();
//   }

//   if (filter === undefined) {
//     filter = new DelayNode(context, { maxDelayTime: 5 })
//     filter.connect(context.destination);
//   }
// };

// const attach = () => {
//   init();

//   const audioElem = document.getElementsByTagName("audio");
//   const videoElem = document.getElementsByTagName("video");

//   for (const element of [...audioElem, ...videoElem]) {
//     try {
//       var mediaSource = context.createMediaElementSource(element)
//       context.resume();
//       mediaSource.connect(filter);
//       console.log("delay attached.");
//     } catch (e) {
//       console.log(e)
//     }
//   }
// };

// const setDelay = (delay) => {
//   delay = delay/1000
//   if (filter.delayTime.value !== delay)
//     filter.delayTime.value = delay;
// }

// window.onload = () => {
//   attach();
//   // chrome.storage.sync.get("delay", (value) =>
//   //   setDelay(value.delay)
//   // )
// };

// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     if (request.delay) {
//       setDelay(request.delay);
//       sendResponse({ack: true});
//     }
//   }
// );

// audioDelay = 3
// const player = document.querySelector('.html5-main-video');
// const context = new AudioContext();
// const source = context.createMediaElementSource(player);
// const delayNode = context.createDelay(audioDelay);
// delayNode.delayTime.value = 3
// source.connect(delayNode);
// delayNode.connect(context.destination);



// const attach = () => {
//   init();

//   const audioElem = document.getElementsByTagName("audio");
//   const videoElem = document.getElementsByTagName("video");

//   for (const element of [...audioElem, ...videoElem]) {
//     try {
//       var mediaSource = context.createMediaElementSource(element)
//       context.resume();
//       mediaSource.connect(filter);
//       console.log("delay attached.");
//     } catch (e) {
//       console.log(e)
//     }
//   }
// };

console.log("CHECKPOINT1")

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

chrome.storage.onChanged.addListener((changes, area) => {
	console.log("CHECKPOINT2:  STORAGE CALLBACK ENTERED")
	console.log(changes)
	console.log(area)
	let newDelay = changes.delay?.newValue
  if (area === 'sync' && changes.delay?.newValue) {
    // const debugMode = Boolean(changes.options.newValue.debug);
    // console.log('enable debug mode?', debugMode);
    // setDebugMode(debugMode);
    console.log("CHECKPOINT2: LISTENED TO SYNC")
    setDelay(newDelay)
  }
});

// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//   	console.log("LISTENED")
//     if (request.delay) {
//       setDelay(request.delay);
//       sendResponse({ack: true});
//     }
//     return true;
//   }
// );
