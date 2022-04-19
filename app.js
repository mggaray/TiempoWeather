//dom
let btnSend= document.querySelector(".btnSend");
let search= document.querySelector(".search")
let locationInfo= document.querySelector(".weather__info__location");
let tempValue= document.querySelector(".weather__info__tempValue");
let maxTemp= document.querySelector(".weather__info__maxTemp");
let minTemp= document.querySelector(".weather__info__minTemp")
let subValue= document.querySelector(".weather__info__subValue");

function temperatureConverter(valNum) {
    return Math.floor((valNum- 273.15));
  } 


setWeatherInfo=(data)=>{
    locationInfo.textContent= `${data.name} ${data.sys.country}`;
    tempValue.textContent= `Temperatura actual: ${temperatureConverter(data.main.temp)}°`;
    maxTemp.textContent= `Maxima ${temperatureConverter(data.main.temp_max)}°`;
    minTemp.textContent= `Minima ${temperatureConverter(data.main.temp_min)}°`;
    subValue.textContent= data.weather[0].description;
}

fetchInfo=(url)=>{
    fetch(url)  
    .then(response=>{
        return response.json()
    })
    .then(data=>{
      console.clear();
      console.log(data);
      setWeatherInfo(data);
    })
    .catch(err=>{
        console.log(err);
    })
}

window.addEventListener("load", ()=>{ // obtener datos automaticamente segun la ubicacion del usuario
    // se utiliza la API de geolocalizacion 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
            lat= pos.coords.latitude;
            lon= pos.coords.longitude;
            const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=1e30fda674cd5c0e908463a4cc26fccd`;
            fetchInfo(url);
        })
    }
})

btnSend.addEventListener("click", ()=>{
    let searchCity= search.value;
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&lang=es&appid=1e30fda674cd5c0e908463a4cc26fccd`;
    fetchInfo(url);
})
