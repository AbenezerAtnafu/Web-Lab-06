/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/

// Define UI Variables
let [
  hrefVar,
  protocolVar,
  hostVar,
  portVar,
  hostNameVar,
  appNameVar,
  appVersionVar,
  platformVar,
  languageVar,
  cookieEnabledVar,
  heightVar,
  widthVar,
  pixelDepVar,
  lengthVar,
  stateVar,
] = document.getElementsByClassName("badge");

hrefVar.innerText = location.href;
protocolVar.innerText = location.protocol;
hostVar.innerText = location.host;
portVar.innerText = location.port;
hostNameVar.innerText = location.hostname;

appNameVar.innerText = navigator.appName;
appVersionVar.innerText = navigator.appVersion;
platformVar.innerText = navigator.platform;
languageVar.innerText = navigator.language;
cookieEnabledVar.innerText = navigator.cookieEnabled;

heightVar.innerText = screen.height;
widthVar.innerText = screen.width;
pixelDepVar.innerText = screen.pixelDepth;

lengthVar.innerText = history.length;
stateVar.innerText = history.state;

// Display the BOM Information on the innerHTML of the elements
const reloadIcon = document.querySelector(".fa");

// Event Listener for reload
reloadIcon.addEventListener("click", reloadPage);
// Reload Page Function
function reloadPage() {
  //using the reload fun on location object
  location.reload();
}