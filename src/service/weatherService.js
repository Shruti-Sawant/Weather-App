import { DateTime } from "luxon";

const API_KEY = "54b8e130dd620ce612a527f20c4f5270";
const Base_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(Base_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url).then((res) => res.json())
};


//url:: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={a237f433592439e986a4fcbe2f4e0f00}
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0];
    return {
        lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise,
        sunset, details, icon, speed
    }
}

const formatForecastWeather = (data) => {
    let { timezone, list } = data;
    const tommorrow = list.slice(4, 9).map(d => {
        return {

            title: formatToLocalTime(d.dt, timezone,'ccc'),
            time: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    })

    const nextDay = list.slice(12, 17).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone,'ccc'),
            time: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, nextDay,tommorrow };
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams)
        .then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForcastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        //     exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForcastWeather };
}

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: ' hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => {
   return ` http://openweathermap.org/img/wn/${code}@2x.png`;
}
export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
