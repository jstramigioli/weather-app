import { getTomorrowWeatherInfo,
    getSearchMatches } from './weather-api-fetch'

let temperatureUnits = 'C'
let currentInfo

function loadLocationInfo(info) {
    const cityDom = document.querySelector('#city')
    const regionAndCountryDom = document.querySelector('#region-country')

    cityDom.textContent = info.city
    regionAndCountryDom.textContent = info.region + ', ' + info.country
}

function loadWeatherInfo(info) {
    function loadWeatherInfoElement(data, domElement) {
        domElement.textContent = data
    }

    function loadConditionIcon(src) {
        condIconDom.src = src
    }
    
    const condTextDom = document.querySelector('.condition-text')
    const condIconDom = document.querySelector('.condition-icon')
    const minTempDom = document.querySelector('#min-temp .value')
    const maxTempDom = document.querySelector('#max-temp .value')
    const rainProbDom = document.querySelector('#rain-prob .value')
    const snowProbDom = document.querySelector('#snow-prob .value')

    const condText = info.conditionText
    const condIconUrl = info.conditionIconUrl
    let minTemp
    let maxTemp
    if (temperatureUnits == 'F') {
        minTemp = info.minTempF + '°F'
        maxTemp = info.maxTempF + '°F'
    }
    else {
        minTemp = info.minTempC + '°C'
        maxTemp = info.maxTempC + '°C'
    }
    
    const chanceOfRain = info.chanceOfRain + '%'
    const chanceOfSnow = info.chanceOfSnow + '%'

    loadWeatherInfoElement(condText, condTextDom)
    loadWeatherInfoElement(minTemp, minTempDom)
    loadWeatherInfoElement(maxTemp, maxTempDom)
    loadConditionIcon(condIconUrl)
    loadWeatherInfoElement(chanceOfRain, rainProbDom)
    loadWeatherInfoElement(chanceOfSnow, snowProbDom)
}

function loadInfo(info) {
    loadLocationInfo(info)
    loadWeatherInfo(info)
    setDisplayFromCondition(info.conditionText)
    storeCurrentInfo(info)
}

function storeCurrentInfo(info) {
    currentInfo = info
}

function createPredictSearch(listOfMatches) {
    if (!Array.isArray(listOfMatches)) return
    const list = document.querySelector('#search-results')
    list.innerHTML = ''

    listOfMatches.forEach(element => {
        const predictResult = document.createElement('li')
        predictResult.classList.add('predict-result')
        const city = document.createElement('p')
        city.classList.add('city')
        city.textContent = element.name
        predictResult.appendChild(city)
        const regionAndCountry = document.createElement('p')
        regionAndCountry.classList.add('region-country')
        regionAndCountry.textContent = element.region + ', ' + element.country
        predictResult.appendChild(regionAndCountry)
        list.appendChild(predictResult)
// Using 'mousedown' instead of 'click' because this way the event fires BEFORE the blur event
        predictResult.addEventListener('mousedown', () => {
            search(element.url)
        })
    });
}

function clearPredictSearch() {
    const searchInput = document.querySelector('#search-bar')
    searchInput.value = ''
    const list = document.querySelector('#search-results')
    list.innerHTML = ''
}

function setDisplayFromCondition(condition) {
    let cond = ''
    
    switch (true) {
        case condition.toLowerCase().includes('snow'):
            cond = 'snowy';
            break;
        case condition.toLowerCase().includes('rain'):
            cond = 'rainy';
            break;
        case condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('storm'):
            cond = 'stormy';
            break;
        case condition.toLowerCase().includes('cloud'):
            cond = 'cloudy';
            break;
        case condition.toLowerCase().includes('sun'):
            cond = 'sunny';
            break;
        default:
            cond = 'default'
    }

    const background = document.querySelector('#content')
    background.classList = cond
}

const search = (inputToSearch) => {
    console.log(inputToSearch)
    getTomorrowWeatherInfo(inputToSearch).then(info => loadInfo(info))
    clearPredictSearch()
}

const searchInput = document.querySelector('#search-bar')
searchInput.addEventListener('input', () => {
    getSearchMatches(searchInput.value).then(info => createPredictSearch(info))
})
searchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        search(searchInput.value)
    }
})

searchInput.addEventListener('blur', clearPredictSearch)

const searchBtn = document.querySelector('#search-btn')
// Using 'mousedown' instead of 'click' because this way the event fires BEFORE the blur event
searchBtn.addEventListener('mousedown', () => {
    search(searchInput.value)} )

getTomorrowWeatherInfo('villa gesell').then(info => loadInfo(info))

function setTemperatureUnits(unit) {
    if (unit === 'C' || unit === 'F') {
        temperatureUnits = unit
    }
    else console.log('error: invalid units')
}

function changeTemperatureUnits() {
    if (temperatureUnits == 'C') {
        setTemperatureUnits('F')
    }
    else {
        setTemperatureUnits('C')
    }

    loadInfo(currentInfo)
}

const changeUnitBtn = document.querySelector('#toggle-units')
changeUnitBtn.addEventListener('click', changeTemperatureUnits)

export {loadInfo, createPredictSearch, clearPredictSearch}