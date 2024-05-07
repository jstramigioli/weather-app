import './style.css'
import { getTomorrowWeatherInfo,
        getSearchMatches } from './weather-api-fetch'
import { loadInfo, createPredictSearch, clearPredictSearch } from './load-weatherapi-to-dom'

const search = () => {
    clearPredictSearch()
    getTomorrowWeatherInfo(searchInput.value).then(info => loadInfo(info))
}

const searchInput = document.querySelector('#search-bar')
searchInput.addEventListener('input', () => {
    getSearchMatches(searchInput.value).then(info => createPredictSearch(info))
})
searchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        search()
    }
})

const searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', search)

getTomorrowWeatherInfo('villa gesell').then(info => loadInfo(info))