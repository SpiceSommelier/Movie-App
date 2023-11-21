import React, { Component } from 'react'
import MovieService from '../../services/movie-service'
import './CardList.css'

import FilmCard from '../FilmCard'
import { Spin, Alert } from 'antd'

export default class CardList extends Component {
  constructor() {
    super()
    this.requestItems()
  }

  state = {
    itemList: null,
    loading: true,
    error: {
      state: false,
      message: null,
    },
  }

  movieService = new MovieService()

  async requestItems() {
    try {
      const itemList = await this.movieService.requestTopTrending()
      const genresList = await this.movieService.getResource('genre/movie/list')
      const newArr = itemList.results.map((element) => {
        return {
          id: `${element.id}`,
          title: element.title,
          genres: element.genre_ids,
          overview: element.overview,
          releaseDate: element.release_date,
          voteAverage: element.vote_average,
          img: element.poster_path,
        }
      })
      for (let i = 0; i < newArr.length; i++) {
        const element = newArr[i]
        element.img = await this.movieService.getImage(element.img)
        element.genres = element.genres.map((el) => {
          genresList.genres.forEach((e) => {
            if (e.id === el) el = e.name
          })
          return el
        })
      }

      this.setState({
        itemList: newArr,
        loading: false,
      })
    } catch (err) {
      this.onError(err)
    }
  }

  onError(err) {
    this.setState({
      error: { state: true, message: err.message },
    })
  }

  render() {
    const { itemList, loading, error } = this.state
    if (error.state) {
      return (
        <Alert
          type="error"
          style={{ marginRight: '30px' }}
          message={`${error.message}`}
          banner={true}
        />
      )
    }
    if (loading) {
      return (
        <Spin
          size="large"
          style={{ top: '50%', left: '50%', position: 'absolute' }}
        />
      )
    }
    const elements = itemList.map((el) => {
      return <FilmCard key={el.id}>{el}</FilmCard>
    })
    return <ul className="card-list">{elements}</ul>
  }
}
