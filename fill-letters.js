const fillChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+`-=[]{}|;':,./<>?";
const fillCharsLength = fillChars.length;

const leftOffset = 0;

// global variables set for measurement calculations later
let documentWidth = 0;
let documentHeight = 0;
let fontSize = 0;
let charWidth = 0;
let lineLength = 0;
let longestLineLength = 0;
let lineLengths = [];
let lineIndents = [];
let codeLinesCount = 0;
let totalLinesCount = 0;
let initialLoop = 0;

// run main function on document load
window.addEventListener("load", () => {
  main();
  const initialInterval = setInterval(() => {
    // remove all pre and post lines
    const pre = document.querySelector("#pre-lines");
    const post = document.querySelector("#post-lines");
    pre.innerHTML = "";
    post.innerHTML = "";

    main();

    initialLoop += 1;
    if (initialLoop > 20) clearInterval(initialInterval);
  }, 30);
});
// re-render on document resize
window.addEventListener("resize", () => {
  // remove all pre and post lines
  const pre = document.querySelector("#pre-lines");
  const post = document.querySelector("#post-lines");
  pre.innerHTML = "";
  post.innerHTML = "";
  main();
});

function main() {
  const lineContainer = document.getElementById("letters");
  lineContainer.classList.remove("unrendered");
  // find necessary measurements
  documentWidth = document.body.clientWidth;
  documentHeight = document.body.clientHeight;
  charWidth = getCharWidth();
  fontSize = parseInt(
    window.getComputedStyle(document.body).getPropertyValue("font-size"),
  );

  // amount of characters that fit on one line
  lineLength = Math.floor((documentWidth / charWidth) * 1.1);

  formatCodeLines();

  // get container element height
  const containerHeight = lineContainer.clientHeight;
  totalLinesCount = Math.floor(containerHeight / fontSize);

  addPreLines();
  addPostLines();
}

// get all elements with id 'code-line'
function formatCodeLines() {
  const lines = document.querySelectorAll(".code-line");

  // find the length of the longest line (indent + length) and store line lengths and indents in an array
  lines.forEach((line) => {
    const lineLength = parseInt(line.getAttribute("data-length"));
    const lineIndent = parseInt(line.getAttribute("data-indent"));
    const totalLineLength = lineLength + lineIndent;
    lineLengths.push(lineLength);
    lineIndents.push(lineIndent);
    if (totalLineLength > longestLineLength) {
      longestLineLength = totalLineLength;
    }
  });

  //save the amount of lines
  codeLinesCount = lines.length;

  // fill the prefix and postfix parts of each line with random characters
  lines.forEach((line, key) => {
    // get line attribute 'data-length' and 'data-indent'
    const contentLength = lineLengths[key];
    const lineIndent = lineIndents[key];

    // get child elements of line that are prefix and postfix parts of the line
    const linePrefix = line.querySelector("#line-prefix");
    const linePostfix = line.querySelector("#line-postfix");

    // calculate the length of prefix and postfix parts of the line
    const linePrefixLength =
      Math.floor((lineLength - longestLineLength) / 2) +
      lineIndent -
      leftOffset;
    const linePostfixLength =
      lineLength - linePrefixLength - contentLength + leftOffset;
    // fill the prefix and postfix parts with random characters
    linePrefix.textContent = getRandomString(linePrefixLength);
    linePostfix.textContent = getRandomString(linePostfixLength);
  });
}

// add pre lines to the code
function addPreLines() {
  // get the pre element
  const pre = document.querySelector("#pre-lines");

  // calculate the amount of pre lines to add
  const preLinesCount = Math.floor((totalLinesCount - codeLinesCount) / 2);

  // add pre lines to the pre element
  for (let i = 0; i < preLinesCount; i++) {
    const preLine = document.createElement("div");
    preLine.classList.add("pre-line");
    preLine.style.whiteSpace = "nowrap";
    preLine.style.overflow = "hidden";

    preLine.textContent = getRandomString(lineLength);
    pre.appendChild(preLine);
  }
}

// add post lines to the code
function addPostLines() {
  // get the post element
  const post = document.querySelector("#post-lines");

  // calculate the amount of post lines to add
  const postLinesCount = Math.ceil((totalLinesCount - codeLinesCount) / 2) + 1;

  // add post lines to the post element
  for (let i = 0; i < postLinesCount; i++) {
    const postLine = document.createElement("div");
    postLine.classList.add("post-line");
    postLine.classList.add("pre-line");
    postLine.textContent = getRandomString(lineLength);
    post.appendChild(postLine);
  }
}

// calculate the width of one character using a temporarily rendered element in the dom
function getCharWidth() {
  const measure = document.getElementById("measurementElement");

  // set the style of the measurement element
  measurementElement.style.width = "1ch";
  measurementElement.style.position = "absolute";
  measurementElement.style.visibility = "hidden";

  // Set the text content to a single character
  measurementElement.textContent = "M";

  // Get the pixel width of 1ch
  const chWidth = measurementElement.offsetWidth;

  // Remove the measurement element content
  measurementElement.textContent = "";

  return chWidth;
}

// create a string of random characters with a given length
function getRandomString(length) {
  let newString = "";

  for (let i = 0; i < length; i++) {
    newString += fillChars[Math.floor(Math.random() * fillCharsLength)];
  }

  return newString;
}
