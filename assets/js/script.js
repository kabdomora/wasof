// copied from 06-Act-10. Use for reference for api call

var resultContainer = document.getElementById('recents');
var fetchButton = document.getElementById('fetch-button');
var searchInput = document.getElementById('city-search');
var msgDiv = document.querySelector("#msg");

window.onload = localStorage.clear();

var searches = [];

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function listSearches() {
  var searched = localStorage.getItem('searchCity');
  resultContainer.innerHTML = "";

  for (var i=0; i < searches.length; i++) {
    var sItem = searches[i];

    var sButton = document.createElement('button');
    sButton.textContent = searched;

  }
}

/* <button type="button" 
class="w-full lg:flex items-center text-sm leading-6 text-slate-400 
rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 
hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 
dark:hover:bg-slate-700"> <span id="recent">Recently Searched</span>
</button> */

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.063229&lon=-118.359651&appid=c27a1f4c454fb85c78f18c582a3a25ef';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i=0; i < data.length; i++) {
        var recentSearches = document.createElement('button');
        // finish this for loop
      }
    });
};

fetchButton.addEventListener('click', function(event) {
  event.preventDefault();

  var searchItem = searchInput.value;

  if (searchItem === "") {
    displayMessage('error', "Please enter a city name");
  } else {
    displayMessage('success', "");
    searches.push(searchItem);
    // searchItem = searchItem.replace(/\s+/g, '+').toLowerCase();
    localStorage.setItem('searchCity', JSON.stringify(searches));
    searchInput.value = "";
    getApi();
    listSearches();
  }
});








// userContainer.innerHTML = "";
// // TODO: Loop through the data and generate your HTML
// for (var i = 0; i < data.length; i++) {
//   var userName = document.createElement("h3");
//   var userURL = document.createElement("p");
//   userName.textContent = data[i].login;
//   userURL.textContent = data[i].url;
//   userContainer.append(userName);
//   userContainer.append(userURL);
// }
