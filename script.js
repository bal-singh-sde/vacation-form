// Listen to the form being submitted
document
  .getElementById("userForm")
  .addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const destinationName = event.target["name"].value;
  const destinationLocation = event.target["location"].value;
  var photoUrl = await getPhotoUrl(event.target["name"].value);
  const destinationDesc = event.target["description"].value;
  
  resetFormValues(event.target);

  // Use the form elements values to create a destination card
  var destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    photoUrl,
    destinationDesc
  );

  var wishListContainer = document.querySelector("#btns_container");

  // Change wishlist title if the wishlist was empty
  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My WishList";
  }

  // Appended the destinationCard in the #btns_container div
  document
    .querySelector("#btns_container")
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
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  // Create the destination photo element and append it to the card
  var img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", photoUrl);
  card.appendChild(img);

  // Create the card body with the destination name, location, and description and append it to the card
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  // Only add description text if the user entered some
  if (description.length !== 0) {
    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");
  cardBody.appendChild(buttonsContainer);

  const cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);
  buttonsContainer.appendChild(cardEditBtn);

  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);
  buttonsContainer.appendChild(cardDeleteBtn);


  return card;
}

async function getPhotoUrl(destinationName) {
  const API = `https://api.unsplash.com/search/photos?client_id=GV_lAZ5ZCpvqH6UEiWjBtXHo1XiITp2LBla7g18SlxI&page=1&query=${destinationName}`;

  const fallBackUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";

  try {
    const res = await fetch(API);
    const result = await res.json();
    //if no results returned, show default photo, otherwise show the first photo from results
    return result.results.length === 0
      ? fallBackUrl
      : result.results[0].urls.thumb;
  } catch (error) {
    console.log(error);
  }
}

async function editDestination(event) {
  // var cardBody = event.target.parentElement.parentElement;
  // var title = cardBody.children[0];
  // var subTitle = cardBody.children[1];

  // var card = cardBody.parentElement;
  // var photoUrl = card.children[0];

  var newTitle = prompt("Enter new name");
  var newSubtitle = prompt("Enter new location");
  var newPhotoUrl = await getPhotoUrl(newTitle);
  var updatedDescription = prompt("Your new description for the next trip");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }


if (updatedDescription.length > 0) {
  destinationDesc.innerText = updatedDescription;
}
}

function removeDestination(event) {
  var cardBody = event.target.parentElement.parentElement;
  var card = cardBody.parentElement;
  card.remove();
}
