import React, { Component } from 'react'
import './FilmCard.css'

import { Card } from 'antd'

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

  render() {
    const { title, overview, releaseDate, img } = this.props.children
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
            minHeight: '279px',
            maxHeight: '280px',
            margin: 0,
          }}
          bodyStyle={{
            display: 'flex',
            padding: 0,
          }}
        >
          <img
            alt="film poster"
            className="card-list__element--film-poster"
            src={img}
            style={{
              minHeight: '279px',
              maxHeight: '280px',
              margin: 0,
              marginRight: '20px',
            }}
          />
          <div
            style={{
              paddingTop: '10px',
              paddingRight: '20px',
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
          </div>
        </Card>
      </li>
    )
  }
}
