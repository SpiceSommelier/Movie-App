import React, { Component } from 'react'
import './FilmCard.css'

import { Card, Rate } from 'antd'

export default class FilmCard extends Component {
  genresToTags = () => {
    const { genres } = this.props.children
    if (genres) {
      return (
        <>
          {genres.map((element, index) => (
            <div className="tag-list__tag" key={`${index}`}>
              {element}
            </div>
          ))}
        </>
      )
    }
  }

  searchInLocal = (id) => {
    let local = localStorage.getItem('rated')
    let rate = 0
    if (local) {
      local = JSON.parse(local)
      local.results.forEach((element) => {
        if (element.id === id) rate = element.rate
      })
    }

    return rate
  }

  rateFilm = (value) => {
    const { id } = this.props.children
    const local = localStorage.getItem('rated')
    if (local) {
      const parsedLocal = JSON.parse(local)
      if (this.isExist(id)) {
        parsedLocal.results = [
          ...parsedLocal.results,
          {
            ...this.props.children,
            rate: value,
          },
        ]
        localStorage.setItem('rated', JSON.stringify(parsedLocal))
      }
    } else {
      const obj = {
        results: [],
      }
      obj.results.push({ ...this.props.children, rate: value })
      localStorage.setItem('rated', JSON.stringify(obj))
    }
  }

  isExist = (id) => {
    const local = JSON.parse(localStorage.getItem('rated'))
    let flag = true
    local.results.forEach((element) => {
      if (element.id === id) flag = false
    })
    return flag
  }

  render() {
    const { title, overview, releaseDate, img, voteAverage, id } =
      this.props.children
    const isLoading = title === null ? true : false
    const displayedDate = new Date(releaseDate)
    let textClass = 'card-list__element--text'
    return (
      <li className="card-list__element">
        <Card
          hoverable={true}
          loading={isLoading}
          className="card"
          style={{
            height: '320px',
            width: '550px',
            margin: 0,
          }}
          bodyStyle={{
            display: 'flex',
            padding: 0,
            margin: 0,
            position: 'relative',
          }}
        >
          <img
            alt="film poster"
            className="card-list__element--film-poster"
            src={img}
            style={{
              height: '320px',
              maxWidth: '220px',
              margin: 0,
              marginRight: '20px',
            }}
          />
          <div
            style={{
              paddingTop: '10px',
              paddingRight: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2 className="card-list__element--film-title">{title}</h2>
            <div className="card-list__element--info-container">
              <p className="card-list__element--release-date">
                {`${displayedDate.toLocaleString('en-us', {
                  month: 'long',
                })} ${displayedDate.getDate()}, ${displayedDate.getFullYear()}`}
              </p>
              <div className="tag-list">{this.genresToTags()}</div>
            </div>
            <p className={textClass}>{overview}</p>
            <Rate
              style={{
                marginTop: 'auto',
                marginBottom: '10px',
              }}
              count={10}
              allowHalf
              allowClear
              onChange={this.rateFilm}
              defaultValue={this.searchInLocal(id)}
            />
          </div>
          <ShowRaiting rating={voteAverage} />
        </Card>
      </li>
    )
  }
}

const ShowRaiting = ({ rating }) => {
  let borderColor = 'grey'

  switch (true) {
    case rating <= 3:
      borderColor = '#E90000'
      break
    case rating > 3.1 && rating <= 5:
      borderColor = '#E97E00'
      break
    case rating > 5 && rating < 7:
      borderColor = '#E9D100'
      break
    default:
      borderColor = '#66E900'
  }
  return (
    <div
      className="rating"
      style={{
        width: '30px',
        height: '30px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: `2px solid ${borderColor}`,
        borderRadius: '50%',
        display: 'flex',
      }}
    >
      <p
        style={{
          margin: 'auto',
        }}
      >
        {rating.toFixed(1)}
      </p>
    </div>
  )
}
