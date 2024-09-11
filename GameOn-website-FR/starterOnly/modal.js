// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form[name='reserve']");
const submitButton = form.querySelector(".btn-submit");

// Ajout du message de confirmation dans le formulaire
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
