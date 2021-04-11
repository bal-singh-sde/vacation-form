// Listen to the form being submitted
document
  .querySelector("#destination_details_form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  // Function to handle the #destination_details_form being submitted

  event.preventDefault(); // stop the form from refreshing the page

  // Extract the values of the different elements of the form and store them in variables
  var destinationName = event.target.elements["name"].value;
  var destinationLocation = event.target.elements["location"].value;
  var destinationPhoto = event.target.elements["photo"].value;
  var destinationDesc = event.target.elements["description"].value;

  // Reset the form elements values for a new entry
  resetFormValues(event.target);

  // Use the form elements values to create a destination card
  var destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    destinationPhoto,
    destinationDesc
  );

  var wishListContainer = document.querySelector("#destinations_container");

  // Change wishlist title if the wishlist was empty
  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My WishList";
  }

  // Appended the destinationCard in the #destinations_container div
  document
    .querySelector("#destinations_container")
    .appendChild(destinationCard);
}

function resetFormValues(form) {
  // Go through all the form values and reset their values

  for (var i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function createDestinationCard(name, location, photoUrl, description) {
  // Use the passed arguments to create a bootstrap card with destination details
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  // Create the destination photo element and append it to the card
  var img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  // Check to make sure that the photo url was entered since it's optional
  // if the user didn't enter a photo url, show a constant photo
  var constantPhotoUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  if (photoUrl.length === 0) {
    img.setAttribute("src", constantPhotoUrl);
  } else {
    img.setAttribute("src", photoUrl);
  }

  card.appendChild(img);

  // Create the card body with the destination name, location, and description and append it to the card
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  var cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  // Only add description text if the user entered some
  if (description.length !== 0) {
    var cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  var buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  var cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);

  var cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  var cardBody = event.target.parentElement.parentElement;
  var title = cardBody.children[0];
  var subTitle = cardBody.children[1];

  var card = cardBody.parentElement;
  var photoUrl = card.children[0];

  var newTitle = window.prompt("Enter new name");
  var newSubtitle = window.prompt("Enter new location");
  var newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  var cardBody = event.target.parentElement.parentElement;
  var card = cardBody.parentElement;
  card.remove();
}
