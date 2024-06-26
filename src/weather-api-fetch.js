async function getTomorrowWeatherInfo(city) {
    const url = 'https://api.weatherapi.com/v1/forecast.json?'
    const apiKey = '0ab19ad4300c4d0895923218240305'
    const fetchData = await fetch(url+'key='+apiKey+'&q='+city+'&days=2')
    const jsonFetchData = await fetchData.json()
    const weatherInfo = await function() {
        const location = jsonFetchData.location
        const weatherTomorrow = jsonFetchData.forecast.forecastday[1]
        console.log(jsonFetchData)
        return {
            city: location.name,
            region: location.region,
            country: location.country,
            conditionText: weatherTomorrow.day.condition.text,
            conditionIconUrl: weatherTomorrow.day.condition.icon,
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

async function getSearchMatches(str) {
    const url = 'https://api.weatherapi.com/v1/search.json?'
    const apiKey = '0ab19ad4300c4d0895923218240305'
    const fetchData = await fetch(url+'key='+apiKey+'&q='+str)
    const searchResults = await fetchData.json()

    return searchResults
}

export { getTomorrowWeatherInfo,
        getSearchMatches}