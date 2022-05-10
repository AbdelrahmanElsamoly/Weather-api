let post = [];
const x = new Date();
let day = x.getDay();
let next = day + 1;
let preNext = day + 2;
let month = x.getMonth();
let date = x.getDate();
let year = x.getFullYear();

let searchInput = document.getElementById("searchInput");
let dayy = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// search if search container valid
function valid() {
  if (searchInput.value == "") {
    return true;
  } else {
    return false;
  }
}
async function showDynamic() {
  let myHttp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=egypt&days=3`
  );
  response = await myHttp.json();
  await currentDay();
  await getPreDays();
}

document.addEventListener("readystatechange", showDynamic);

async function getWeather(a) {
  {
    let myHttp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=7`
    );
    response = await myHttp.json();
    await currentDay();
    await getPreDays();
  }
}

searchInput.addEventListener("keyup", function (e) {
  getWeather(e.target.value);
});

async function currentDay() {
  let cartoona = `
  <div class="date-container" style="color:white">
    <h2 class="date-dayname">${dayy[day]}</h2>
    <span class="date-day">${date} ${months[month]} ${year}</span
    ><i class="location-icon" data-feather="map-pin"></i
    ><h3 class="location">${response.location.country}</h3>
  </div>
  <div class="weather-container" style="color:white">
  <img src="https:${response.current.condition.icon}"  alt="" srcset="" />
  <h1 class="weather-temp">${response.current.temp_c}<sup>o</sup>C</h1>
  <h3 class="weather-desc mb-0">${response.current.condition.text}</h3>
  </div>`;

  document.getElementById("weather").innerHTML = cartoona;
}

async function getPreDays() {
  let arr = response.forecast.forecastday;
  if (day == 6) {
    next = 0;
    preNext = 1;
  } else if (day == 5) {
    next = 6;
    preNext = 0;
  }

  let cantoona = ``;
  cantoona = `
    <div class="today-info-container">
    <div class="today-info d-flex flex-column justify-content-center">
      <div class="precipitation">
        <span class="title">Pressure <i class="fa-solid fa-temperature-half"></i></span
        ><span class="value">${response.current.pressure_in}</span>
      </div>
      <div class="humidity">
        <span class="title">Humidity <i class="fa-solid fa-feather"></i></span><span class="value">${
          response.current.humidity
        } %</span>
      </div>
      <div class="wind">
        <span class="title">Wind <i class="fa-solid fa-wind"></i></span><span class="value">${
          response.current.wind_kph
        } km/h</span>
        
      </div>
    </div>
  </div>
  <div class="week-container">
    <ul class="week-list d-flex flex-row justify-content-center align-items-center my-3">
    <li class="active">
      <img src="https:${response.current.condition.icon}"  alt="" srcset="" />
      <span class="day-name">${dayy[day].substring(0, 3)}</span
        ><span class="day-temp">${response.current.temp_c}<sup>o</sup>C</span>
      </li>
      <li>
      <img src="https:${arr[1].day.condition.icon}"  alt="" srcset="" />
      <span class="day-name">${dayy[next].substring(0, 3)}</span
        ><span class="day-temp">${arr[1].day.maxtemp_c}<sup>o</sup>C</span>
      </li>
      <li>
      <img src="https:${arr[2].day.condition.icon}"  alt="" srcset="" />
      <span class="day-name">${dayy[preNext].substring(0, 3)}</span
        ><span class="day-temp">${arr[2].day.maxtemp_c}<sup>o</sup>C</span>
      </li>
    </ul>
  </div>
  <div class="d-flex  justify-content-center align-items-center p-1 my-5" style="background-color: #73C6B6;
 
  border-radius:15px
  "><img
  src="images/output-onlinegiftools.gif"
  style="width:40px"
  class="p-0"
  alt=""
  srcset=""
/><p class="ps-1 fw-bold p-0 my-0">${response.location.country}</p></div>
</div>
    `;

  document.getElementById("weath").innerHTML = cantoona;
}
