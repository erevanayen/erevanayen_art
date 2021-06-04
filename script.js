console.log("I am running");

var themeToggle = true;

const logoEl = document.getElementById("logo");
const cardEl = document.getElementById("card");
var buttonsEl = document.getElementsByClassName("linkButton");
logoEl.addEventListener("click", changeTheme);

function changeTheme() {
  if (themeToggle) {
    logoEl.style.backgroundImage = `url("files/erevanayen_logo_BW2.png")`;
    cardEl.style.backgroundColor = `white`;
    cardEl.style.color = `black`;
    for (let i = 0; i < buttonsEl.length; i++) {
      buttonsEl[i].style.color = `black`;
    }
  } else {
    logoEl.style.backgroundImage = `url("files/erevanayen_logo_base_trans.png")`;
    cardEl.style.backgroundColor = `black`;
    cardEl.style.color = `#FF105C`;
    for (let i = 0; i < buttonsEl.length; i++) {
      buttonsEl[i].style.color = `#FF105C`;
    }
  }
  themeToggle = !themeToggle;
}

changeTheme();
