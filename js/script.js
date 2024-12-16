const words = ["World!?", "Visiteur!?", "Recruteur!?"]; // Mots dynamiques
const nameWords = ["Cheikhrouhou", "SOUROUR"]; // Nom et prénom
const jobTitle = "Développeur Web - Fullstack"; // Titre du poste

let index = 0;
let nameIndex = 0;

const changingWord = document.getElementById("changing-word");
const nameElement = document.getElementById("name");
const jobTitleElement = document.getElementById("job-title");
const moreInfoBtn = document.getElementById("more-info-btn"); // Bouton Plus d'informations

// Afficher un mot lettre par lettre
function typeEffect(word, callback) {
  let position = 0;
  changingWord.textContent = '';

  function type() {
    if (position < word.length) {
      changingWord.textContent += word[position];
      position++;
      setTimeout(type, 150);
    } else {
      setTimeout(callback, 1000);
    }
  }
  type();
}

// Supprimer un mot lettre par lettre
function eraseEffect(callback) {
  let currentText = changingWord.textContent;

  function erase() {
    if (currentText.length > 0) {
      currentText = currentText.slice(0, -1);
      changingWord.textContent = currentText;
      setTimeout(erase, 150);
    } else {
      callback();
    }
  }
  erase();
}

// Afficher le nom et prénom
function showName() {
  const currentNameWord = nameWords[nameIndex];
  let position = 0;

  function type() {
    if (position < currentNameWord.length) {
      nameElement.textContent += currentNameWord[position];
      position++;
      setTimeout(type, 150);
    } else {
      setTimeout(() => {
        if (nameIndex === 0) nameElement.textContent += ' ';
        nameIndex = (nameIndex + 1) % nameWords.length;

        if (nameIndex === 1) {
          showName();
        } else {
          launchJobAnimation();
        }
      }, 1000);
    }
  }
  type();
}

// Afficher le titre du job
function showJobTitle() {
  let position = 0;
  jobTitleElement.textContent = '';

  function type() {
    if (position < jobTitle.length) {
      jobTitleElement.textContent += jobTitle[position];
      position++;
      setTimeout(type, 150);
    } else {
      // Afficher le bouton une fois l'animation terminée
      setTimeout(() => {
        moreInfoBtn.style.display = "inline-block";
      }, 500);
    }
  }
  type();
}

// Changer les mots dynamiques
function changeWord() {
  const currentWord = words[index];
  typeEffect(currentWord, () => {
    eraseEffect(() => {
      index = (index + 1) % words.length;
      changeWord();
    });
  });
}

// Lancer l'animation du titre après les noms
function launchJobAnimation() {
  setTimeout(showJobTitle, 1000);
}

// Démarrer les animations
function startAnimations() {
  showName();
  setTimeout(changeWord, 500);
}

// Action au clic du bouton
moreInfoBtn.addEventListener("click", () => {
  alert("Plus d'informations sur le développeur !");
  // Redirection (si nécessaire)
  // window.location.href = "https://example.com";
});

// Lancer l'animation après un petit délai
setTimeout(startAnimations, 1000);
document.addEventListener("DOMContentLoaded", function () {
  const profileLink = document.getElementById("profile-link");
  const aboutMeSection = document.getElementById("about-me");
  const closeAboutBtn = document.getElementById("close-about-btn");
  const otherContent = document.querySelectorAll("body > *:not(header):not(#about-me):not(footer)");

  // Affiche uniquement la navigation et "À propos de moi"
  profileLink.addEventListener("click", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut

      // Masque tout sauf le header (nav), la section "À propos de moi" et le footer
      otherContent.forEach((element) => {
          element.style.display = "none";
      });
      aboutMeSection.style.display = "block"; // Affiche la section
  });

  // Réaffiche tout lorsque le bouton "Fermer" est cliqué
  closeAboutBtn.addEventListener("click", function () {
      otherContent.forEach((element) => {
          element.style.display = ""; // Réinitialise l'affichage
      });
      aboutMeSection.style.display = "none"; // Cache la section
  });
});
