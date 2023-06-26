
function updateLoginButton() {
  const logElement = document.querySelector(".login-logout-btn");
  let email = localStorage.getItem("email");
  if ( email=== null) {
    logElement.textContent = "Log In";
  } else {
    logElement.textContent = email;
  }
}
document.addEventListener("DOMContentLoaded", updateLoginButton);


const getBusinessData = (url) => {

    return fetch(url)
    .then(response => response.json())
    .then(data => {
        return { results: data.businesses, totalResults: data.total }
    })
    .catch(err => {
      console.error(err);
    })
}


const getData = async (e) => {
  e.preventDefault();
 
  const locationSelect = document.getElementById("location");
  const location = locationSelect.value;
  const term = 'boba';
  const itemsPerPage = 5;

  if (location === "") {
    locationSelect.setAttribute("error", "true");  
  }
  else {

  const url = `http://localhost:3000/getData?location=${location}&term=${term}&itemsPerPage=${itemsPerPage}`;
  
  const { results, totalResults } = await getBusinessData(url);

    let resultsContainer = document.getElementById('displayResults');
    resultsContainer.innerHTML = "";

    results.forEach(business => {
    let name = business.name;
    let imageURL = business.image_url;
    let rating = business.rating;
    let yelpURL = business.url;

    let nameElement = document.createElement("h3");
    nameElement.textContent = name;

    let ratingElement = document.createElement("p");
    ratingElement.textContent = rating;

    let yelpLinkElement = document.createElement("a");
    yelpLinkElement.href = yelpURL;
    yelpLinkElement.target = "_blank";
    yelpLinkElement.textContent = "Visit Yelp Page";

    let imageElement = document.createElement("img");
    imageElement.src = imageURL;
    imageElement.classList.add("businessImage");

    let businessDiv = document.createElement("div");
    businessDiv.classList.add("business");

    let businessDetailsDiv = document.createElement("div");
    businessDetailsDiv.classList.add("businessDetails");

    businessDiv.appendChild(imageElement);
    businessDiv.appendChild(businessDetailsDiv);

    businessDetailsDiv.appendChild(nameElement);
    businessDetailsDiv.appendChild(ratingElement);
    businessDetailsDiv.appendChild(yelpLinkElement);

    resultsContainer.appendChild(businessDiv);

});

}}