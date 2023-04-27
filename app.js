//dom
let container = document.querySelector(".weather");
let btnSend = document.querySelector(".btnSend");
let search = document.querySelector(".search");
let locationInfo = document.querySelector(".weather__info__location");
let tempValue = document.querySelector(".weather__info__tempValue");
let weatherImg = document.querySelector(".weather__info__img");
let maxTemp = document.querySelector(".weather__info__maxTemp");
let minTemp = document.querySelector(".weather__info__minTemp");
let subValue = document.querySelector(".weather__info__subValue");
let body = document.querySelector("body");

var date = new Date();
var hour = date.getHours();

function temperatureConverter(valNum) {
  return Math.floor(valNum - 273.15);
}

setBodyBgr = (url) => {
  body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`;
};

setWeatherInfo = (data) => {
  container.classList.remove("hidden");
  locationInfo.textContent = `${data.name} ${data.sys.country}`;
  tempValue.textContent = `Temperatura actual: ${temperatureConverter(
    data.main.temp
  )}°`;
  maxTemp.textContent = `Maxima: ${temperatureConverter(data.main.temp_max)}°`;
  minTemp.textContent = `Minima: ${temperatureConverter(data.main.temp_min)}°`;
  let desc = data.weather[0].description;
  subValue.textContent = desc;
  setWeatherImg(data);
};

setWeatherImg = (data) => {
  id = data.weather[0].id;
  switch (true) {
    case id >= 200 && id <= 232: //truenos
      weatherImg.src = "/animated/thunder.svg";
      setBodyBgr("https://wallpapercave.com/wp/wp9119616.jpg");
      break;

    case id == 801: //poco nublado
      if (hour >= 7 && hour <= 19) {
        weatherImg.src = "./animated/cloudy-day-1.svg";
        setBodyBgr(
          "https://images.pexels.com/photos/412462/pexels-photo-412462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        );
      } else {
        weatherImg.src = "./animated/cloudy-nigth-1.svg";
        setBodyBgr("https://wallpaperaccess.com/full/3397089.jpg");
      }
      break;

    case 802: // nublado
      if (hour >= 7 && hour <= 19) {
        weatherImg.src = "./animated/cloudy-day-3.svg";
        setBodyBgr(
          "https://images.pexels.com/photos/404984/pexels-photo-404984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        );
      } else {
        weatherImg.src = "./animated/cloudy-night-3.svg";
        setBodyBgr(
          "https://images.pexels.com/photos/734986/pexels-photo-734986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        );
      }
      break;

    case id >= 803 && id <= 804: //muy nublado
      weatherImg.src = "./animated/cloudy.svg";
      setBodyBgr("https://wallpaperaccess.com/full/1244184.jpg");
      break;

    case id >= 300 && id <= 321: //llovizna
      hour >= 7 && hour <= 19
        ? (weatherImg.src = "./animated/rainy1.svg")
        : (weatherImg.src = "./animated/rainy4.svg");
      break;

    case id >= 500 && id <= 531: //lluvia
      if (id == 501 || id == 502) {
        weatherImg.src = "./animated/rainy-4.svg";
      } else weatherImg.src = "./animated/rainy-7.svg";
      break;

    case id >= 600 && id <= 622: //nieve
      weatherImg.src = "./animated/snowy-6.svg";
      setBodyBgr(
        "https://images.pexels.com/photos/773953/pexels-photo-773953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      );
      break;

    case id >= 700 && id <= 781: //lluevia fuerte
      weatherImg.src = "./animated/rainy-4.svg";
      setBodyBgr(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMOGHt_Zvsl3hCxEV7euM-DuBeD1neELRZTYihTYcXFq_2ivwBio4utwN8LVNRSreQl8&usqp=CAU"
      );
      break;

    case id == 800: //despejado
      if (hour >= 7 && hour <= 19) {
        weatherImg.src = "./animated/day.svg";
        setBodyBgr("https://wallpaperaccess.com/full/175912.jpg");
      } else {
        weatherImg.src = "./animated/night.svg";
        setBodyBgr(
          "https://images.unsplash.com/photo-1595178302776-fa04e6d45879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80"
        );
      }
  }
};

fetchInfo = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.clear();
      console.log(data);
      setWeatherInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.addEventListener("load", () => {
  // obtener datos automaticamente segun la ubicacion del usuario
  // se utiliza la API de geolocalizacion
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=1e30fda674cd5c0e908463a4cc26fccd`;
      fetchInfo(url);
    });
  }
});

btnSend.addEventListener("click", () => {
  let searchCity = search.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&lang=es&appid=1e30fda674cd5c0e908463a4cc26fccd`;
  fetchInfo(url);
});
