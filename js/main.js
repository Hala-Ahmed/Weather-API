






var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  async function search(place) {
    if (place.length >= 3) {
      let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=c66c0c47a7d843978ff195717220106&q=${place}&days=3`
      );
      let finalResponse = await response.json();
  
      displayCurrent(
        finalResponse.location,
        finalResponse.current,
        finalResponse.forecast.forecastday[0]
      );
      document.getElementById("otherDay").innerHTML = "";
  
      displayAnother(finalResponse.forecast.forecastday);
    }
  }
  search("cairo");
  
  
  function displayCurrent(location, current, forcastNow) {
    let currentDate = new Date(current.last_updated);
    
    document.querySelector(".current-day").innerHTML = days[currentDate.getDay()];
    
    document.querySelector(".current-month").innerHTML =
      currentDate.getDate() + monthNames[currentDate.getMonth()];
  
    document.querySelector(".location").innerHTML = location.name;
  
    document.querySelector(".deg-num").innerHTML =
      current.temp_c + `<sup>o</sup>C`;
  
    document.querySelector(
      ".deg-icon"
    ).innerHTML = `<img src="https:${current.condition.icon}" >`;
  
    document.querySelector(".weather-status").innerHTML = current.condition.text;
    document.querySelector(".rain-change").innerHTML =
      forcastNow.day.daily_chance_of_rain + "%";
    document.querySelector(".wind").innerHTML =
      forcastNow.day.maxwind_kph + " km/h";
    document.querySelector(".wind-dir").innerHTML = forcastNow.hour[0].wind_dir;
  }
  
  function displayAnother(forCast) {
    let otherDay = "";
  
    for (let i = 1; i < forCast.length; i++) {
      otherDay += `  <div class="col-lg-6 bg  ">
      <div class="weather-card text-center other-day pb-5">
  
      <div class="weather-hd">
            <span>${days[new Date(forCast[i].date).getDay()]}</span>
      </div>
              <div class="weather-card-body ">
                  <div class="deg-icon">
                      <img src="https:${forCast[i].day.condition.icon}" alt="">
                  </div>
                  <div class="degree">
                      <div class="deg-num">
                          <p class=" mb-0">${
                            forCast[i].day.maxtemp_c + `<sup>o</sup>C`
                          }
                          </p>
                      </div>
                      <small>${forCast[i].day.mintemp_c + `<sup>o</sup>C`}</small>
                  </div>
                  <div class="weather-status ">
                      ${forCast[i].day.condition.text}
                  </div>
              </div>
      </div>
  </div>`;
    }
    document.getElementById("otherDay").innerHTML += otherDay;
  }