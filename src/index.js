import './style.css'

async function getTomorrowWeatherInfo(city) {
    const url = 'https://api.weatherapi.com/v1/forecast.json?'
    const apiKey = '0ab19ad4300c4d0895923218240305'
    const fetchData = await fetch(url+'key='+apiKey+'&q='+city+'&days=2')
    const jsonFetchData = await fetchData.json()
    const weatherInfo = await function() {
        const location = jsonFetchData.location
        const weatherTomorrow = jsonFetchData.forecast.forecastday[1]
        return {
            city: location.name,
            region: location.region,
            country: location.country,
            conditionText: weatherTomorrow.day.condition.text,
            conditionIconUrl: weatherTomorrow.day.condition.text,
            minTempC: weatherTomorrow.day.mintemp_c,
            minTempF: weatherTomorrow.day.mintemp_f,
            maxTempC: weatherTomorrow.day.maxtemp_c,
            maxTempF: weatherTomorrow.day.maxtemp_f,
            chanceOfRain: weatherTomorrow.day.daily_chance_of_rain,
            chanceOfSnow: weatherTomorrow.day.daily_chance_of_snow,
        }
    }
    return weatherInfo()  
}

getTomorrowWeatherInfo('villa gesell').then(info => console.log(info))