// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form[name='reserve']");
const submitButton = form.querySelector(".btn-submit");

const prenomInput = document.getElementById('first');
const prenomWrapper = document.getElementById('prenomWrapper');
const nomInput = document.getElementById('last');
const nomWrapper = document.getElementById('nomWrapper');
const emailInput = document.getElementById('email');
const emailWrapper = document.getElementById('emailWrapper');
const birthdateInput = document.getElementById('birthdate');
const dateWrapper = document.getElementById('dateWrapper');



const confirmationMessage = document.createElement('div');
confirmationMessage.classList.add('confirmation-message');
confirmationMessage.innerHTML = "Merci pour<br>votre inscription";
confirmationMessage.style.display = "none"; // Masquer initialement
form.appendChild(confirmationMessage); // Ajouter le message au formulaire

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// validation du formulaire
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Empêche l'envoi réel du formulaire

  // Cacher les champs du formulaire tout en les laissant dans le DOM
  formData.forEach(data => {
    data.style.visibility = "hidden"; // Cache les éléments mais conserve l'espace
  });

  // Cacher le bouton de soumission
  if (submitButton) submitButton.style.visibility = "hidden";

  // Afficher le message de confirmation
  confirmationMessage.style.display = "block";
  confirmationMessage.style.position = "absolute";
  confirmationMessage.style.top = "50%";
  confirmationMessage.style.left = "50%";
  confirmationMessage.style.transform = "translate(-50%, -50%)"; // Centrer le message
});

// Validation Prénom
function validatePrenom() {
  const prenomValue = prenomInput.value;
  if (prenomValue.length >= 2) {
    prenomWrapper.setAttribute('data-error-visible', 'false');
  } else {
    prenomWrapper.setAttribute('data-error-visible', 'true');
  }
}
prenomInput.addEventListener('blur', validatePrenom);
prenomInput.addEventListener('input', validatePrenom);

// Validation Nom
function validateNom() {
  const nomValue = nomInput.value;
  if (nomValue.length >= 2) {
    nomWrapper.setAttribute('data-error-visible', 'false');
  } else {
    nomWrapper.setAttribute('data-error-visible', 'true');
  }
}
nomInput.addEventListener('blur', validateNom);
nomInput.addEventListener('input', validateNom);

// Validation Email
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateEmail() {
  const emailValue = emailInput.value;
  if (isValidEmail(emailValue)) {
    emailWrapper.setAttribute('data-error-visible', 'false');
  } else {
    emailWrapper.setAttribute('data-error-visible', 'true');
  }
}
emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', validateEmail);


// Validation de la date de naissance
function validateDate() {
  const birthdateValue = birthdateInput.value;
  if (birthdateValue) {
    // Si une date est présente
    dateWrapper.setAttribute('data-error-visible', 'false');
  } else {
    // Si le champ est vide ou incorrect
    dateWrapper.setAttribute('data-error-visible', 'true');
  }
}

// Ajouter les événements 'blur' et 'input' pour valider la date
birthdateInput.addEventListener('blur', validateDate);
birthdateInput.addEventListener('input', validateDate);