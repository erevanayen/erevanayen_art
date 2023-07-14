const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+`-=[]{}|;':,./<>?";

const changeTarget = document.getElementById("p-name");
const textZed = "-------ZED";
const textEre = "EREVANAYEN";
const trigger = document.getElementById("name-tag");
let scrambleTimeoutId = -1;
let scrambleToggle = true;

// Trigger the scrambleText function when the mouse hovers over the trigger element
if (trigger && changeTarget) {
  trigger.addEventListener("mouseover", () => {
    scrambleText(changeTarget);
  });
}

// trigger the scramble text function when user taps on the trigger element
if (trigger && changeTarget) {
  trigger.addEventListener("touchend", () => {
    scrambleText(changeTarget);
  });
}

// Scramble the text when the page loads
document.addEventListener("DOMContentLoaded", () => {
  if (changeTarget === null) return;
  scrambleText(changeTarget);
  // add a random timeout to scramble the text again
  randomScramble();
});

document.addEventListener("unload", () => {
  // Clear the timeout if the user leaves the page
  if (scrambleTimeoutId > -1) clearTimeout(scrambleTimeoutId);
  scrambleTimeoutId = -1;
});

// Takes a text element and scrambles the text
// by replacing each letter with a random letter
// and then slowly replacing it with the correct letter
function scrambleText(textElement) {
  let iterations = 0;
  const originalText = scrambleToggle ? textZed : textEre;

  const interval = setInterval(() => {
    textElement.innerText = textElement.innerText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          if (originalText) return originalText[index];
        }
        return letters[Math.floor(Math.random() * 66)];
      })
      .join("");

    if (originalText && iterations > originalText.length)
      clearInterval(interval);

    iterations += 1 / 3;
  }, 30);

  scrambleToggle = !scrambleToggle;
}

function randomScramble() {
  if (changeTarget === null) return;

  scrambleText(changeTarget);
  const minInterval = 6000;
  const maxInterval = 15000;
  let randomInterval =
    Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

  scrambleTimeoutId = setTimeout(randomScramble, randomInterval);
}
