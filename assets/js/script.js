var searchHistory = document.getElementById('recents');
var fetchButton = document.getElementById('fetch-button');
var searchInput = document.getElementById('city-search');
var msgDiv = document.querySelector("#msg");
var APIkey = 'c27a1f4c454fb85c78f18c582a3a25ef';
var form = document.getElementById('input');
var date = document.getElementById('today-date');
var thisName = document.getElementById('city-name');
var humidValue = document.getElementById('humidValue');
var pressureValue = document.getElementById('pressureValue');
var tempValue = document.getElementById('tempValue');
var windValue = document.getElementById('windValue');
var thisCity = document.getElementById('thisCity');

var blocks = document.getElementById('weatherblock')

const list = document.querySelector('.wasof .daily');

window.onload = localStorage.clear();

var todayDate = dayjs();
$('#1a').text(todayDate.format('dddd, MMMM D, YYYY'));

function setDate() {
  date.innerHTML = todayDate;
}

// sets the date to today and runs the initial call for my current location
setDate();
getMe();

// use this for the default load values
var searches = [];

// will spit out error message if no data is entered into search
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//creates the buttons for the searched cities
function listSearches() {
  searchHistory.innerHTML ="";

  for (var i=0; i < searches.length; i++) {
    var searched = searches[i];

    var city = document.createElement('button');
    city.textContent = searched;
    searched = searched.replace(/\s+/g, '+').toLowerCase();
    city.setAttribute('class', "w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700");
    city.setAttribute('id', searched);

    searchHistory.appendChild(city);
  }
}

// api call for user's current location to load by default
function getMe() {
  navigator.geolocation.getCurrentPosition((success) => {
    // console.log(success);
    let { latitude, longitude } = success.coords;
    let getMyCoords = 'https://api.openweathermap.org/data/2.5/forecast?lat='.concat(latitude, '&lon=', longitude, '&appid=', APIkey, '&units=imperial&exclude=minutely,hourly,alerts');
    // console.log(getMyCoords);    

    fetch(getMyCoords)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
         
        let { name } = data.city;
        localStorage.setItem('cityName', name);

        data.list.forEach((value, index) => {
          if (index > 0 ) {
            var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
              weekday: "long",
            } );
            var timeBlock = value.dt_txt;
            var icon = value.weather[0].icon;
            var mainTemp = value.main.temp.toFixed(0);
            var minTemp = value.main.temp_min.toFixed(0);
            var maxTemp = value.main.temp_max.toFixed(0);
            var humidity = value.main.humidity;
            var pressure = value.main.pressure;
            var wind = value.wind.speed;
  
            const forecastBlock = document.createElement('div');
            forecastBlock.setAttribute('class', "px-5 bg-amber-200 rounded-lg");
           
            forecastBlock.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather graphic">
            <div class="font-light text-2xl">${dayname}</div>
            <div class="font-light text-sm">${timeBlock}</div>
            <div class="font-light text-sm">Average Temperature: ${mainTemp} °F</div>
            <div class="font-light text-sm">Pressure: ${pressure}</div>
            <div class="font-light text-sm">Humidity: ${humidity}%</div>
            <div class="font-light text-sm">Wind-Speed: ${wind} mph</div>          
       `;
  
            blocks.appendChild(forecastBlock);
            
            setCITYname();
          }
        });


        var thisHumid = data.list[0].main.humidity;
        var thisPressure = data.list[0].main.pressure;
        var thisTemp = data.list[0].main.temp.toFixed(0);
        var thisWind = data.list[0].wind.speed;
        var thisIcon = data.list[0].weather[0].icon;

        var weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${thisIcon}@2x.png`);
        weatherIcon.setAttribute('alt', 'weather graphic');
        thisCity.innerHTML = '';
        thisCity.appendChild(weatherIcon);
        
        humidValue.innerHTML = `${thisHumid}%`
        pressureValue.innerHTML = `${thisPressure}`
        tempValue.innerHTML = `${thisTemp} °F`
        windValue.innerHTML = `${thisWind} mph`

        localStorage.setItem('citydeets', JSON.stringify(data.city)); 
        let citydeets = window.localStorage.getItem('citydeets');
        // console.log(JSON.parse(citydeets));
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

      // getWeather(data);
      })
  });
}

// api call to pull the data either based on the users current search or click event on historical search
function getApi() {  
  var lastItem = localStorage.getItem('lastItem');
  let citySearch = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(lastItem, '&appid=', APIkey, '&units=imperial&exclude=minutely,hourly,alerts');
  // console.log(citySearch);

  fetch(citySearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      let { name } = data.city;
      localStorage.setItem('cityName', name);

      data.list.forEach((value, index) => {
        if (index > 0 ) {
          var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
            weekday: "long",
          } );
          var timeBlock = value.dt_txt;
          var icon = value.weather[0].icon;
          var mainTemp = value.main.temp.toFixed(0);
          var minTemp = value.main.temp_min.toFixed(0);
          var maxTemp = value.main.temp_max.toFixed(0);
          var humidity = value.main.humidity;
          var pressure = value.main.pressure;
          var wind = value.wind.speed;

          const forecastBlock = document.createElement('div');
          forecastBlock.setAttribute('class', "px-5 bg-amber-200 rounded-lg");
         
          forecastBlock.innerHTML = `
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather graphic">
          <div class="font-light text-2xl">${dayname}</div>
          <div class="font-light text-sm">${timeBlock}</div>
          <div class="font-light text-sm">Average Temperature: ${mainTemp} °F</div>
          <div class="font-light text-sm">Pressure: ${pressure}</div>
          <div class="font-light text-sm">Humidity: ${humidity}</div>
          <div class="font-light text-sm">Wind-Speed: ${wind}</div>          
     `;

          blocks.appendChild(forecastBlock);


          setCITYname();
        }
      });

      var thisHumid = data.list[0].main.humidity;
      var thisPressure = data.list[0].main.pressure;
      var thisTemp = data.list[0].main.temp.toFixed(0);
      var thisWind = data.list[0].wind.speed;
      var thisIcon = data.list[0].weather[0].icon;

      var weatherIcon = document.createElement('img');
      weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${thisIcon}@2x.png`);
      weatherIcon.setAttribute('alt', 'weather graphic');
      thisCity.innerHTML = '';
      thisCity.appendChild(weatherIcon);
      
      humidValue.innerHTML = `${thisHumid}%`
      pressureValue.innerHTML = `${thisPressure}`
      tempValue.innerHTML = `${thisTemp} °F`
      windValue.innerHTML = `${thisWind} mph`

      localStorage.setItem('citydeets', JSON.stringify(data.city));  
      let citydeets = window.localStorage.getItem('citydeets');
      // console.log(JSON.parse(citydeets));
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

      getCurrentWeather();
    });
};

function setCITYname() {
  var thisCITYname = localStorage.getItem('cityName');
  // console.log(thisCITYname);
  thisName.innerHTML = thisCITYname;
}

// click event that allows search via use of the search button
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
    blocks.innerHTML = "";
    getApi();
    listSearches();
  }
});

// click event that allows search via use of keyboard return key
form.addEventListener('submit', function(event) {
  event.preventDefault();

  var searchItem = searchInput.value;
  // console.log(searchItem);

  

  if (searchItem === "") {
    displayMessage('error', "Please enter a city name");
  } else {
    displayMessage('success', "");
    searches.push(searchItem);    
    localStorage.setItem('searchCity', JSON.stringify(searches));
    searchItem = searchItem.replace(/\s+/g, '+').toLowerCase();
    localStorage.setItem('lastItem', searchItem);
    searchInput.value = "";
    blocks.innerHTML = "";
    getApi();
    listSearches();
  }

})

// click event that allows search via click on historical search button
searchHistory.addEventListener('click', function(event) {
  event.preventDefault();
  var element = event.target;

  if (element.matches('button') === true) {
    var thisCity = element.getAttribute('id');
    localStorage.setItem('lastItem', thisCity);
    blocks.innerHTML = "";
    getApi();
  }
})



