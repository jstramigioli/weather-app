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
    const minTemp = info.minTempC
    const maxTemp = info.maxTempC
    const chanceOfRain = info.chanceOfRain
    const chanceOfSnow = info.chanceOfSnow

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
    });
}

function clearPredictSearch() {
    const searchInput = document.querySelector('#search-bar')
    searchInput.value = ''
    const list = document.querySelector('#search-results')
    list.innerHTML = ''
}

export {loadInfo, createPredictSearch, clearPredictSearch}