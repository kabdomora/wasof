// copied from 06-Act-10. Use for reference for api call

var userContainer = document.getElementById('users');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.063229&lon=-118.359651&appid=c27a1f4c454fb85c78f18c582a3a25ef';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

fetchButton.addEventListener('click', getApi);


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
