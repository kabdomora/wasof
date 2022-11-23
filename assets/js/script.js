// copied from 06-Act-10. Use for reference for api call

var searchHistory = document.getElementById('recents');
var fetchButton = document.getElementById('fetch-button');
var searchInput = document.getElementById('city-search');
var msgDiv = document.querySelector("#msg");

window.onload = localStorage.clear();

getCoordinates();
// use this for the default load values


var searches = [];

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function listSearches() {
  searchHistory.innerHTML ="";

  for (var i=0; i < searches.length; i++) {
    var searched = searches[i];

    var city = document.createElement('button');
    city.textContent = searched;
    city.setAttribute('class', "w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700");
    city.setAttribute('id', "historical");

    searchHistory.appendChild(city);
  }
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
  });
}

function getApi() {  
  var lastItem = localStorage.getItem('lastItem');
  let citySearch = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(lastItem, '&appid=c27a1f4c454fb85c78f18c582a3a25ef');
  console.log(citySearch);
  
  fetch(citySearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      localStorage.setItem('citydeets', JSON.stringify(data.city));  
      let citydeets = window.localStorage.getItem('citydeets');
      console.log(JSON.parse(citydeets));
      var split1 = citydeets.substring(
        citydeets.indexOf("{") + 1,
        citydeets.lastIndexOf("}")
      );
      localStorage.setItem('split1', split1);
      var coordinates = split1.substring(
        split1.indexOf("{") + 1,
        split1.lastIndexOf("}")
      );
      coordinates = coordinates.replace(",", "&");
      coordinates = coordinates.replace(/(['"'])/g, '');
      coordinates = coordinates.replace(":", "=");
      coordinates = coordinates.replace(":", "=");
      localStorage.setItem('coordinates', coordinates);
      
      getWeather();
    });
};

function getWeather() {
  var coordinates = localStorage.getItem('coordinates');
  let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?'.concat(coordinates, '&appid=c27a1f4c454fb85c78f18c582a3a25ef');
  console.log(requestUrl);
}



fetchButton.addEventListener('click', function(event) {
  event.preventDefault();

  var searchItem = searchInput.value;

  if (searchItem === "") {
    displayMessage('error', "Please enter a city name");
  } else {
    displayMessage('success', "");
    searches.push(searchItem);    
    localStorage.setItem('searchCity', JSON.stringify(searches));
    searchItem = searchItem.replace(/\s+/g, '+').toLowerCase();
    localStorage.setItem('lastItem', searchItem);
    searchInput.value = "";
    getApi();
    listSearches();
  }
});




