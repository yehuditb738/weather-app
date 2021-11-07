// App.js

import React from 'react'
import '../style/WeatherData.css'
import clockIcon from '../images/clock.png'
import sunIcon from '../images/sun.png'
import cloudIcon from '../images/clouds.png'
import snowflakeIcon from '../images/snowflake.png'

import { DegreesToDirection, Month, Weekday, Day } from '../helpers/utils'
import { Clock } from './Clock'

export const WeatherData = ({ data }) => {
    const { name, country, temp, description, temp_min, temp_max, icon, feels_like, speed, deg, humidity, lat, lon } = data;

    return (
        <div>
            <header>
                <div>
                    <img src={clockIcon} alt='time icon' />
                    <Clock />
                </div>
                <h5>{Weekday}, {Month} {Day}</h5>
            </header>
            <main>
                <div className='weather-main'>


                    {temp > 14 && <img src={sunIcon} alt='weather icon' className='weather-icon' />}
                    {(temp > 1 && temp <= 14) && <img src={cloudIcon} alt='weather icon' className='weather-icon' />}
                    {temp < 0 && <img src={snowflakeIcon} alt='weather icon' className='weather-icon' />}


                    {/*<img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
                        className='weather-icon' />
                    */}
                    <div>
                        <h2>{name}, {country}</h2>
                        <h3 className='description'>lat :{lat} , lon: {lon}</h3>
                    </div>
                </div>
                <div className='temp-main'>
                    <h5>Feels like {feels_like} °</h5>
                    <h1 className='temperature'>{temp}°</h1>
                    <div className='hi-lo'>
                        <h5>H {temp_max}°</h5>
                        <h5>L {temp_min}°</h5>
                    </div>
                </div>
            </main>
            {/* 
        <footer>
                <div className='weather-prop'>
                    <img src={windIcon} alt='time icon' />
                    <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
                </div>
                <div className='weather-prop'>
                    <img src={dropIcon} alt='time icon' />
                    <h4>{humidity} %</h4>
                </div>
            </footer>
            */}
        </div>
    );
}