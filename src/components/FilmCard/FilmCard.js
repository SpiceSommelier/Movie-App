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

  render() {
    const { title, overview, releaseDate, img, voteAverage } =
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
              disabled
              count={10}
              defaultValue={voteAverage}
              allowHalf
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
  if (rating < 6.6) borderColor = 'red'
  if (rating >= 6.6) borderColor = 'yellow'
  if (rating >= 7.3) borderColor = 'green'
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
