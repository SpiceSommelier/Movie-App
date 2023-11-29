export default class MovieService {
  _apiKey = 'api_key=6c1cb5e7650f142dcbf483d20c027445'
  _apiBaseUrl = 'https://api.themoviedb.org/3/'
  _apiBaseUrlImg = 'https://image.tmdb.org/t/p/'

  async getImage(url, imgType = false) {
    imgType = imgType ? 'original' : 'w500'
    const res = await fetch(`${this._apiBaseUrlImg}${imgType}${url}`)
    if (!res.ok) {
      throw new Error(`Couldnt fetch${url} received ${res.status}`)
    }
    return res.url
  }

  async getResource(url, page = 1) {
    const res = await fetch(
      `${this._apiBaseUrl}${url}?${this._apiKey}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Couldnt fetch${url} received ${res.status}`)
    }
    return await res.json()
  }
  async getResourceBySearch(request, page = 1) {
    const res = await fetch(
      `${this._apiBaseUrl}search/movie?query=${request}&${this._apiKey}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Couldnt fetch${request} received ${res.status}`)
    }
    return await res.json()
  }
  async requestTopRated(page) {
    return this.getResource('movie/top_rated', page)
  }
  async requestTopTrending(timeWindow = false, page) {
    timeWindow = timeWindow ? 'week' : 'day'
    return this.getResource(`trending/movie/${timeWindow}`, page)
  }
}
