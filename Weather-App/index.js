const apiKey="e8ee93f45923986da65ec152966f9194";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchButton=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkweather(city){
    const response=await fetch(apiUrl + city +`&appid=${apiKey}`);

 if(response.status==404){
document.querySelector(".error").style.display="block";
document.querySelector(".weather").style.display="none";
 }
 
 else{
    const data=await response.json();
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
    
    if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png";
    }
    else{
        weatherIcon.src="images/snow.png";
    }
    document.querySelector(".error").style.display="none";
    document.querySelector(".weather").style.display="block";
    }
   
 }

 checkweather();
searchButton.addEventListener("click", ()=>{
    checkweather(searchBox.value)
}
);