// copied from 06-Act-10. Use for reference for api call

var searchHistory = document.getElementById('recents');
var fetchButton = document.getElementById('fetch-button');
var searchInput = document.getElementById('city-search');
var msgDiv = document.querySelector("#msg");
var APIkey = 'c27a1f4c454fb85c78f18c582a3a25ef';

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
    let { latitude, longitude } = success.coords;
    let getMyCoords = 'https://api.openweathermap.org/data/2.5/forecast?lat='.concat(latitude, '&lon=', longitude, '&appid=', APIkey);
    console.log(getMyCoords);

    fetch(getMyCoords)
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
      })
  });
}

function getApi() {  
  var lastItem = localStorage.getItem('lastItem');
  let citySearch = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(lastItem, '&appid=', APIkey);
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
      
// WHOEVER IS REVIEWING THIS, IF YOU HAVE COMMENTS ABOUT THIS HERE - HOW THIS COULD BE DONE BETTER/FASTER
// PLEASE LET ME KNOW! I TRIED DATA.CITY[0].COORD BUT GOT AN ERROR BACK THAT 0 WASN'T DEFINED
// I ALSO TRIED TO STRINGIFY/PARSE COORD FROM CITY BUT ALSO GOT AN ERROR THAT IT WAS UNDEFINED.

      getWeather();
    });
};

function getWeather() {
  var coordinates = localStorage.getItem('coordinates');
  let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?'.concat(coordinates, '&appid=', APIkey);
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




