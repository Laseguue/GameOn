// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close"); // Sélectionne le bouton de fermeture
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

const quantityInput = document.getElementById('quantity');
const quantityWrapper = quantityInput.closest(".formData");

const locationWrapper = document.querySelector(".formData input[name='location']").closest(".formData");
const termsCheckbox = document.getElementById('checkbox1');
const termsWrapper = termsCheckbox.closest(".formData");

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

// close modal function
function closeModal() {
  modalbg.style.display = "none";
}

// Add event listener to close button
closeModalBtn.addEventListener("click", closeModal);

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

// Validation du champ "À combien de tournois"
function validateQuantity() {
  const quantityValue = quantityInput.value;
  if (quantityValue !== '') {
    quantityWrapper.setAttribute('data-error-visible', 'false');
  } else {
    quantityWrapper.setAttribute('data-error-visible', 'true');
    quantityWrapper.setAttribute('data-error', 'Ce champ ne peut pas être vide.');
  }
}

// Ajouter les événements 'blur' et 'input' pour valider la quantité
quantityInput.addEventListener('blur', validateQuantity);
quantityInput.addEventListener('input', validateQuantity);

// Validation du choix multiple (location)
function validateLocation() {
  const locationSelected = document.querySelector("input[name='location']:checked");
  if (locationSelected) {
    locationWrapper.setAttribute('data-error-visible', 'false');
  } else {
    locationWrapper.setAttribute('data-error-visible', 'true');
    locationWrapper.setAttribute('data-error', 'Vous devez choisir une option.');
  }
}

// Validation des conditions d'utilisation
function validateTerms() {
  if (termsCheckbox.checked) {
    termsWrapper.setAttribute('data-error-visible', 'false');
  } else {
    termsWrapper.setAttribute('data-error-visible', 'true');
    termsWrapper.setAttribute('data-error', 'Vous devez vérifier que vous acceptez les termes et conditions.');
  }
}

// Modifiez la fonction de soumission pour valider les nouvelles conditions
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Empêche l'envoi réel du formulaire

  // Appel des nouvelles fonctions de validation
  validateLocation();
  validateTerms();
  validateQuantity();
  
  // Validation des autres champs
  validatePrenom();
  validateNom();
  validateEmail();
  validateDate();

  // Vérifier si toutes les validations sont correctes
  const errors = document.querySelectorAll('[data-error-visible="true"]');
  if (errors.length === 0) {
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
  }
});

// Écouteurs pour la validation des champs lors du changement
document.querySelectorAll("input[name='location']").forEach(input => {
  input.addEventListener('change', validateLocation);
});

termsCheckbox.addEventListener('change', validateTerms);
