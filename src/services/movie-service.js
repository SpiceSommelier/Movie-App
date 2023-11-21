export default class MovieService {
  _apiKey = '?api_key=6c1cb5e7650f142dcbf483d20c027445'
  _apiBaseUrl = 'https://api.themoviedb.org/3/'
  _apiBaseUrlImg = 'https://image.tmdb.org/t/p/'

  async getImage(url, imgType = false) {
    imgType = imgType ? 'original' : 'w500'
    const res = await fetch(`${this._apiBaseUrlImg}${imgType}${url}`)
    if (!res.ok) {
      throw new Error(`Couldnt fetch${url} received ${res.status}`)
    }
    return await res.url
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBaseUrl}${url}${this._apiKey}`)
    if (!res.ok) {
      throw new Error(`Couldnt fetch${url} received ${res.status}`)
    }
    return await res.json()
  }
  async requestTopRated() {
    return this.getResource('movie/top_rated')
  }
  async requestTopTrending(timeWindow = false) {
    timeWindow = timeWindow ? 'week' : 'day'
    return this.getResource(`trending/movie/${timeWindow}`)
  }
}
