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
    city.setAttribute('class', "w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700");
    city.setAttribute('id', "historical");

    searchHistory.appendChild(city);
  }
}

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
            forecastBlock.setAttribute('class', "px-5 mx-5 bg-amber-200 rounded-lg");
           
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
          forecastBlock.setAttribute('class', "px-5 mx-5 bg-amber-200 rounded-lg");
         
          forecastBlock.innerHTML = `
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather graphic">
          <div class="font-light text-2xl">${timeBlock}</div>
          <div class="font-light">Average Temperature: ${mainTemp} °F</div>
          <div class="font-light">Pressure: ${pressure}</div>
          <div class="font-light">Humidity: ${humidity}</div>
          <div class="font-light">Wind-Speed: ${wind}</div>          
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



// function getWeather(data) {
//   var coordinates = localStorage.getItem('coordinates');
//   let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?'.concat(coordinates, '&appid=', APIkey, '&units=imperial');
  // console.log(requestUrl);

  // fetch(requestUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then (function (data) {
  //     const {main, name, sys, weather } = data;
  //     const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
  //       weather[0]["icon"]
  //     }.svg`;

  //     const li = document.createElement('li');
  //     li.innerHTML = `
  //     <h2 data-name="${name},${sys.country}">
  //       <span>${name}</span>
  //       <sup>${sys.country}</sup>
  //     </h2>
  //     <div>${Math.round(main.temp)}<sup>°F</sup></div>
  //     <figure>
  //       <img src="${icon}" alt="${
  //     weather[0]["description"]
  //   }">
  //       <figcaption>${weather[0]["description"]}</figcaption>
  //     </figure>
  //   `;
  //   })
// }

function getCurrentWeather() {
  var lastItem = localStorage.getItem('lastItem');
  let currentUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(lastItem, '&appid=', APIkey, '&units=imperial&exclude=minutely,hourly,daily,alerts');
  fetch(currentUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
})
};



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









/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/


// const form = document.querySelector(".top-banner form");
// const input = document.querySelector(".top-banner input");
// const msg = document.querySelector(".top-banner .msg");
// const list = document.querySelector(".ajax-section .cities");



/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/


// const apiKey = "4d8fb5b93d4af21d66a2948710284366";




// form.addEventListener("submit", e => {
//   e.preventDefault();
//   let inputVal = input.value;



  //check if there's already a city



  // const listItems = list.querySelectorAll(".ajax-section .city");
  // const listItemsArray = Array.from(listItems);

  // if (listItemsArray.length > 0) {
  //   const filteredArray = listItemsArray.filter(el => {
  //     let content = "";



      //athens,gr



      // if (inputVal.includes(",")) {

        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal

      //   if (inputVal.split(",")[1].length > 2) {
      //     inputVal = inputVal.split(",")[0];
      //     content = el
      //       .querySelector(".city-name span")
      //       .textContent.toLowerCase();
      //   } else {
      //     content = el.querySelector(".city-name").dataset.name.toLowerCase();
      //   }
      // } else {

        //athens

    //     content = el.querySelector(".city-name span").textContent.toLowerCase();
    //   }
    //   return content == inputVal.toLowerCase();
    // });

    // if (filteredArray.length > 0) {
    //   msg.textContent = `You already know the weather for ${
    //     filteredArray[0].querySelector(".city-name span").textContent
    //   } ...otherwise be more specific by providing the country code as well 😉`;
    //   form.reset();
    //   input.focus();
    //   return;
    // }
  // }

  //ajax here
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;









//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;
//       const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
//         weather[0]["icon"]
//       }.svg`;

//       const li = document.createElement("li");
//       li.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//         <figure>
//           <img class="city-icon" src="${icon}" alt="${
//         weather[0]["description"]
//       }">
//           <figcaption>${weather[0]["description"]}</figcaption>
//         </figure>
//       `;
//       li.innerHTML = markup;
//       list.appendChild(li);
//     })
//     .catch(() => {
//       msg.textContent = "Please search for a valid city 😩";
//     });

//   msg.textContent = "";
//   form.reset();
//   input.focus();
// });
