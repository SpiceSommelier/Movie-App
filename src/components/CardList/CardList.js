import React, { Component } from 'react'
import MovieService from '../../services/movie-service'
import './CardList.css'

import FilmCard from '../FilmCard'
import { Spin, Alert } from 'antd'

export default class CardList extends Component {
  movieService = new MovieService()

  componentDidMount = () => {
    this.requestItems()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.requestItems()
    }
    if (prevProps.searchRequest !== this.props.searchRequest) {
      this.requestItems()
    }
    if (prevProps.currentList !== this.props.currentList) {
      this.requestItems()
    }
  }

  state = {
    itemList: null,
    loading: true,
    error: {
      state: false,
      message: null,
    },
  }

  async requestItems() {
    this.setState({
      loading: true,
      itemList: null,
      error: {
        state: false,
        message: null,
      },
    })
    try {
      const { currentList } = this.props
      let itemList = []
      if (currentList === 'trending') {
        itemList = await this.movieService.requestTopTrending( true,
          this.props.currentPage
        )
      }
      if (currentList === 'rated') {
        itemList = await this.movieService.requestTopRated(
          this.props.currentPage
        )
      }
      if (currentList === 'search' && this.props.searchRequest) {
        itemList = await this.movieService.getResourceBySearch(
          this.props.searchRequest,
          this.props.currentPage
        )
      }
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
        try {
          element.img = await this.movieService.getImage(element.img)
        } catch (err) {
          element.img =
            'https://cdn-icons-png.flaticon.com/512/4054/4054617.png'
        }

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
    if (itemList !== null && itemList.length <= 0) {
      return (
        <Alert
          message="No movies found matching your request"
          style={{ margin: '30px 30px', height: '100px' }}
        />
      )
    }

    if (
      this.props.currentList === 'search' &&
      this.props.searchRequest === null
    ) {
      return (
        <Alert
          type="info"
          message="Type to search a film"
          style={{ margin: '30px 30px', height: '100px' }}
        />
      )
    }
    if (error.state) {
      return (
        <Alert
          type="error"
          style={{ margin: '30px 30px', height: '100px' }}
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
