//dom
let container=document.querySelector(".weather")
let btnSend= document.querySelector(".btnSend");
let search= document.querySelector(".search");
let locationInfo= document.querySelector(".weather__info__location");
let tempValue= document.querySelector(".weather__info__tempValue");
let weatherImg= document.querySelector(".weather__info__img");
let maxTemp= document.querySelector(".weather__info__maxTemp");
let minTemp= document.querySelector(".weather__info__minTemp")
let subValue= document.querySelector(".weather__info__subValue");

var date = new Date;
var hour= date.getHours();

function temperatureConverter(valNum) {
    return Math.floor((valNum- 273.15));
  } 

setWeatherInfo=(data)=>{
    container.classList.remove("hidden");
    locationInfo.textContent= `${data.name} ${data.sys.country}`;
    tempValue.textContent= `Temperatura actual: ${temperatureConverter(data.main.temp)}°`;
    maxTemp.textContent= `Maxima: ${temperatureConverter(data.main.temp_max)}°`;
    minTemp.textContent= `Minima: ${temperatureConverter(data.main.temp_min)}°`;
    let desc= data.weather[0].description;
    subValue.textContent= desc;
    setWeatherImg(data);
}

setWeatherImg=(data)=>{
    id=(data.weather[0].id);
    console.log(id);

    switch ((true)) {
        case (id>=200 &&id<=232):
        weatherImg.src="/animated/thunder.svg"
            break;

        case id==801:
            hour>=7 && hour<=19? weatherImg.src="/animated/cloudy-day-1.svg": weatherImg.src="/animated/cloudy-nigth-1.svg";
            break;

        case 802:
            hour>=7 && hour<=19? weatherImg.src="/animated/cloudy-day-3.svg": weatherImg.src="/animated/cloudy-night-3.svg";
            break;

        case (id>=803 && id<=804):
        weatherImg.src="/animated/cloudy.svg"
            break;

        case (id>=300 &&id<=321):
            hour>=7 && hour<=19? weatherImg.src="/animated/rainy1.svg": weatherImg.src="/animated/rainy4.svg";
            break;

        
        case(id>=500 &&id<=531):
            if(id== 501 || id==502){
                weatherImg.src="/animated/rainy-4.svg"
            }
            else weatherImg.src="/animated/rainy-7.svg"
            break;
    

        case (id>=600 &&id<=622):
        weatherImg.src="/animated/snowy-6.svg"
            break;
        
            
        case (id>=700 &&id<=781):
            weatherImg.src="/animated/rainy-4.svg"
                break;
        
        case id==800:
        hour>=7 && hour<=19? weatherImg.src="/animated/day.svg": weatherImg.src="/animated/night.svg";
    }
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



