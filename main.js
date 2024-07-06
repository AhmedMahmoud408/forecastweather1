
const apiKey = `cd618c8bf8c741b2a00221507240507`;
let addLocation = document.querySelector("#addLocation");
let searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", function () {
  getWeather(addLocation.value);
});
addLocation.addEventListener("change", function () {
  getWeather(addLocation.value);
});

addLocation.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getWeather(addLocation.value);
  }
});

async function getWeather(location) {
  try {
    document.querySelector(
      "#showWeather"
    ).innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    );
    let finalResponse = await res.json();
    display(finalResponse);
    console.log(finalResponse);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter right location",
    });
    addLocation.value = "";
    document.querySelector("#showWeather").innerHTML = "";
  }
}

function display(data) {
  let array = data.forecast.forecastday;
  document.querySelector("#todayData").innerHTML= ` 
        <h1 class=" fw-bolder fs-3" id="cityName">
          <i class="fa-solid fa-location-dot"></i> ${data.location.name} , ${data.location.country}
        </h1>
        <h2 class="fw-bolder display-4" id="today"> ${data.location.localtime}</h2>
        <h2 class="fw-bolder display-4" id="temp"> ${data.current.temp_c}°</h2>
        <span class="d-flex align-items-center gap-3 mb-2">
            <img src="https:${data.current.condition.icon}" width="50px" class="" alt="">
            <p id="weatherCondition" class="fw-semibold fs-5">${data.current.condition.text}</p>
          </span>
        <div class="d-flex align-items-center gap-3">
          <span>
            <img src="./images/wind.png" width="30px" alt="" />
            <span id="windSpeed" class="ms-2 fw-semibold">${data.current.wind_kph} Km/h </span>
          </span>
          <span>
            <img src="./images/humidity.png" width="30px" alt="" />
            <span id="humidity" class="fw-semibold ">${data.current.humidity}%</span>
          </span>
        </div>
  
  
  `
  let Cartona = ``;
  for (let i = 0; i < array.length; i++) {
    const date = new Date(array[i].date);
    const weekDay = date.toLocaleDateString("us-uk", { weekday: "long" });
    Cartona += `
                  <div class=" col-md-4 today mt-5">
                      <div class=" bg-white rounded-3 py-2 px-4">
                          <p class="weekDay text-center fw-bolder text-white border border-2 rounded-3 bg-primary  mx-auto ">${weekDay}</p>
                          <div class="d-flex justify-content-between">
                              <div class="text-center">
                                  <p id="maxTemp" class="temp-type fw-bold m-1">Max Temp</p>
                                  <p class="">${array[i].day.maxtemp_c}°</p>
                              </div>
                              <div class="text-center">
                                  <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp</p>
                                  <p class="">${array[i].day.avgtemp_c}°</p>
                              </div>
                                <div class="text-center m-0 p-0">
                                  <p id="minTemp" class="temp-type fw-bold m-1">Min Temp</p>
                                  <p class="">${array[i].day.mintemp_c}°</p>
                              </div>
                          
                          </div>
                          <p class="text-center fw-semibold text-danger-emphasis m-0 p-0">${array[i].day.condition.text}</p>
                          <img src="https:${array[i].day.condition.icon}" width="50px" class="m-auto d-block" alt="">
                         <div class="d-flex align-items-center justify-content-center gap-3">
                               <p>
                                  <img src="./images/sunrise.png" width="30px" alt="" />
                                  <span class="text-center fw-semibold text-danger fs-6">${array[i].astro.sunrise}</span>
                               </p>
                               <p>
                                   <img src="./images/sunset.png" width="30px" alt="" />
                                   <span class="text-center fw-semibold text-black fs-6">${array[i].astro.sunset}</span>
                               </p>
                           </div>
                          
                      </div>
                  </div>
  `;
  }
  document.querySelector("#showWeather").innerHTML = Cartona;
}

function myCurrentLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let myCurrentPosition = `${latitude},${longitude}`;
  getWeather(myCurrentPosition);
}

navigator.geolocation.getCurrentPosition(myCurrentLocation);
