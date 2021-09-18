console.log("I am running");

var themeToggle = false;

const logoEl = document.getElementById("logo");
const cardEl = document.getElementById("card");
var buttonsEl = document.getElementsByClassName("linkButton");
var announceEl = document.getElementsByClassName("announce");
logoEl.addEventListener("click", changeTheme);

function changeTheme() {
  if (themeToggle) {
    logoEl.style.backgroundImage = `url("media/erevanayen_logo_BW2.png")`;
    cardEl.style.backgroundColor = `white`;
    cardEl.style.color = `black`;
    //set button styles
    for (let i = 0; i < buttonsEl.length; i++) {
      buttonsEl[i].style.color = `black`;
    }
    //set announcement styles
    for (let i = 0; i < announceEl.length; i++) {
      announceEl[i].style.color = `#FF105C`;
    }
  } else {
    logoEl.style.backgroundImage = `url("media/erevanayen_logo_base_trans.png")`;
    cardEl.style.backgroundColor = `black`;
    cardEl.style.color = `#FF105C`;
    for (let i = 0; i < buttonsEl.length; i++) {
      buttonsEl[i].style.color = `#FF105C`;
    }
    //set announcement styles
    for (let i = 0; i < announceEl.length; i++) {
      announceEl[i].style.color = `#f6d100`;
    }
  }
  themeToggle = !themeToggle;
}

changeTheme();
