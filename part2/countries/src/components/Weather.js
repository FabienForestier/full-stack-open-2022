import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ lat, lng }) => {
    const token = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${token}&units=metric`
    const [temperature, setTemperature] = useState(undefined);
    const [wind, setWind] = useState(undefined);
    const [icon, setIcon] = useState(undefined);
    useEffect(() => {
        const getWeather = async () => {
            const { data } = await axios.get(weatherAPIUrl);
            setTemperature(data.main.temp);
            setWind(data.wind.speed);
            setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        }

        getWeather();
    }, [weatherAPIUrl]);
    return <div>
        {temperature && <p>Temperature {temperature} Celcius</p>}
        {icon && <img src={icon} alt="Weather icon" />}
        {wind && <p>Wind {wind} m/s</p>}
    </div>
}

export default Weather;