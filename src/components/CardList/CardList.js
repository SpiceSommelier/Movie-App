import React, { Component } from 'react'
import MovieService from '../../services/movie-service'
import './CardList.css'

import FilmCard from '../FilmCard'

export default class CardList extends Component {
  constructor() {
    super()
    this.requestItems()
  }

  state = {
    itemList: [
      {
        id: 1,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
      {
        id: 2,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
      {
        id: 3,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
      {
        id: 4,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
      {
        id: 5,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
      {
        id: 6,
        title: null,
        genreIds: [null],
        overview: null,
        releaseDate: null,
        voteAverage: null,
        img: null,
      },
    ],
  }

  movieService = new MovieService()

  async requestItems() {
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
    })
  }

  render() {
    const { itemList } = this.state
    const elements = itemList.map((el) => {
      return <FilmCard key={el.id}> {el} </FilmCard>
    })
    return <ul className="card-list"> {elements} </ul>
  }
}
