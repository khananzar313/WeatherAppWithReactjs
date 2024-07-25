import React, { useRef } from 'react'
import './Weather.css'
// import snow_icon from '../assets/snow.png';
// import rain_icon from '../assets/rain.png';
// import drizzle_icon from '../assets/drizzle.png' 

import { useEffect, useState } from "react";

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)
  const allIcons = {
    "01d" : './assets/clear.png' ,
    "01n" : './assets/clear.png' ,
    "02d" : './assets/cloud.png' ,
    "02n" : './assets/cloud.png' ,
    "03d" : './assets/cloud.png' ,
    "03n" : './assets/cloud.png' ,
    "04d" : './assets/drizzle.png' ,
    "04n" : './assets/drizzle.png' ,
    "09d" : './assets/rain.png' ,
    "09n" : './assets/rain.png',
    "10d" : './assets/rain.png',
    "10n" : './assets/rain.png',
    "13d" : './assets/snow.png',
    "13n" : './assets/snow.png' ,

  }
   const API_KEY = '30974b253d5c548943334690611d3119';
  
  
  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name");
      return
    }
    try {
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      // if we enter wrong city name
      if(!response.ok){
        alert(data.message);
        return
      }
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || './assets/clear.png'
      setWeatherData({
        humidity : data.main.humidity,
        windSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon : icon,
       

      })
    } catch (error) {
           setWeatherData(false)
           console.error("Error in fetching Weather Data")
    }
  }
  
useEffect(()=>{
  search("London");
},[])

  return (
    <div className='container'>
        
        <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search City'/>
            <img src='./assets/search.png' alt='' onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
           
          <img src={weatherData.icon} alt='' className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src="./assets/humidity.png" alt=''/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
           

          <div className='col'>
            <img src='./assets/wind.png' alt=''/>
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
       
        </div>
       
    </div>
  )
}


export default Weather