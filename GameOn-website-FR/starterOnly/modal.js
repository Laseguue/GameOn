// === Sélection des éléments du DOM ===
const modalbg = document.querySelector(".bground"); // Contexte d'arrière-plan de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons pour ouvrir la modale
const closeModalBtn = document.querySelector(".close"); // Bouton pour fermer la modale
const form = document.querySelector("form[name='reserve']"); // Formulaire principal
const formData = document.querySelectorAll(".formData"); // Conteneurs des champs du formulaire
const submitButton = form.querySelector(".btn-submit"); // Bouton de soumission du formulaire

// Champs du formulaire
const prenomInput = document.getElementById('first'); // Champ "Prénom"
const prenomWrapper = document.getElementById('prenomWrapper'); // Conteneur du champ "Prénom"
const nomInput = document.getElementById('last'); // Champ "Nom"
const nomWrapper = document.getElementById('nomWrapper'); // Conteneur du champ "Nom"
const emailInput = document.getElementById('email'); // Champ "Email"
const emailWrapper = document.getElementById('emailWrapper'); // Conteneur du champ "Email"
const birthdateInput = document.getElementById('birthdate'); // Champ "Date de naissance"
const dateWrapper = document.getElementById('dateWrapper'); // Conteneur du champ "Date de naissance"
const quantityInput = document.getElementById('quantity'); // Champ "Quantité de tournois"
const quantityWrapper = quantityInput.closest(".formData"); // Conteneur du champ "Quantité"
const locationWrapper = document.querySelector(".formData input[name='location']").closest(".formData"); // Conteneur du champ "Location"
const termsCheckbox = document.getElementById('checkbox1'); // Checkbox des conditions d'utilisation
const termsWrapper = termsCheckbox.closest(".formData"); // Conteneur de la checkbox

// Création du message de confirmation
const confirmationMessage = document.createElement('div'); // Création d'un élément pour le message de confirmation
confirmationMessage.classList.add('confirmation-message'); // Ajout de la classe pour le style
confirmationMessage.innerHTML = "Merci pour<br>votre inscription"; // Contenu du message de confirmation
confirmationMessage.style.display = "none"; // Masqué par défaut
form.appendChild(confirmationMessage); // Ajout du message de confirmation au formulaire


// === Fonctions de gestion de la modale ===
function launchModal() {
  modalbg.style.display = "block"; // Afficher la modale
}

function closeModal() {
  modalbg.style.display = "none"; // Cacher la modale
}

// === Fonctions de validation ===
// Fonction générique pour masquer les erreurs
function setErrorVisibility(wrapper, isVisible, message = '') {
  wrapper.setAttribute('data-error-visible', isVisible.toString()); // Définir la visibilité de l'erreur
  if (message) wrapper.setAttribute('data-error', message); // Ajouter le message d'erreur s'il y en a un
}

// Validation du champ "Prénom"
function validatePrenom() {
  const isValid = prenomInput.value.length >= 2; // Vérifier si la longueur est suffisante
  setErrorVisibility(prenomWrapper, !isValid); // Afficher ou masquer l'erreur
}

// Validation du champ "Nom"
function validateNom() {
  const isValid = nomInput.value.length >= 2; // Vérifier si la longueur est suffisante
  setErrorVisibility(nomWrapper, !isValid); // Afficher ou masquer l'erreur
}

// Validation du champ "Email"
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour vérifier le format de l'email
  return emailPattern.test(email); // Retourner true si le format est correct
}

function validateEmail() {
  const isValid = isValidEmail(emailInput.value); // Vérifier si l'email est valide
  setErrorVisibility(emailWrapper, !isValid); // Afficher ou masquer l'erreur
}

// Validation du champ "Date de naissance"
function validateDate() {
  const isValid = birthdateInput.value !== ''; // Vérifier si une date est renseignée
  setErrorVisibility(dateWrapper, !isValid); // Afficher ou masquer l'erreur
}

// Validation du champ "Quantité de tournois"
function validateQuantity() {
  const isValid = quantityInput.value !== ''; // Vérifier si le champ n'est pas vide
  setErrorVisibility(quantityWrapper, !isValid, 'Ce champ ne peut pas être vide.'); // Afficher ou masquer l'erreur
}

// Validation des choix multiples (location)
function validateLocation() {
  const isValid = document.querySelector("input[name='location']:checked"); // Vérifier si une option est sélectionnée
  setErrorVisibility(locationWrapper, !isValid, 'Vous devez choisir une option.'); // Afficher ou masquer l'erreur
}

// Validation des conditions d'utilisation
function validateTerms() {
  const isValid = termsCheckbox.checked; // Vérifier si la case est cochée
  setErrorVisibility(termsWrapper, !isValid, 'Vous devez vérifier que vous acceptez les termes et conditions.'); // Afficher ou masquer l'erreur
}

// === Fonction de validation globale du formulaire ===
function validateForm() {
  // Appel de toutes les fonctions de validation
  validatePrenom();
  validateNom();
  validateEmail();
  validateDate();
  validateQuantity();
  validateLocation();
  validateTerms();
}

// === Gestion de la soumission du formulaire ===
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Empêcher l'envoi du formulaire pour effectuer des validations

  validateForm(); // Valider tous les champs

  // Vérifier s'il y a des erreurs dans le formulaire
  const errors = document.querySelectorAll('[data-error-visible="true"]');
  if (errors.length === 0) { // S'il n'y a pas d'erreurs
    // Masquer les champs du formulaire
    formData.forEach(data => {
      data.style.visibility = "hidden"; // Masquer les éléments du formulaire sans les supprimer
    });

    // Masquer le bouton de soumission
    if (submitButton) submitButton.style.visibility = "hidden";

    // Afficher le message de confirmation
    confirmationMessage.style.display = "block"; // Afficher le message de confirmation
    confirmationMessage.style.position = "absolute"; // Positionnement absolu pour centrer le message
    confirmationMessage.style.top = "50%";
    confirmationMessage.style.left = "50%";
    confirmationMessage.style.transform = "translate(-50%, -50%)"; // Centrer le message
  }
});

// === Écouteurs d'événements ===
// Écouteurs pour l'ouverture et la fermeture de la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // Ajouter l'écouteur d'événement à chaque bouton
closeModalBtn.addEventListener("click", closeModal); // Écouteur d'événement pour fermer la modale

// Écouteurs d'événements pour les champs du formulaire (validation)
prenomInput.addEventListener('blur', validatePrenom);
prenomInput.addEventListener('input', validatePrenom);
nomInput.addEventListener('blur', validateNom);
nomInput.addEventListener('input', validateNom);
emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', validateEmail);
birthdateInput.addEventListener('blur', validateDate);
birthdateInput.addEventListener('input', validateDate);
quantityInput.addEventListener('blur', validateQuantity);
quantityInput.addEventListener('input', validateQuantity);

// Écouteurs pour les choix multiples (location)
document.querySelectorAll("input[name='location']").forEach(input => {
  input.addEventListener('change', validateLocation); // Valider lors de la sélection d'une option
});

// Écouteur pour la case à cocher des conditions d'utilisation
termsCheckbox.addEventListener('change', validateTerms); // Valider lors du changement d'état de la case
