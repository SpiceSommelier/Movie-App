import React, { Component } from 'react'
import './App.css'

import Header from '../Header'
import CardList from '../CardList'
import { Pagination } from 'antd'

export default class App extends Component {
  state = {
    currentList: 'trending',
    searchRequest: null,
    currentPage: '1',
  }

  searchFilm = (request) => {
    this.setState({
      searchRequest: request,
    })
  }

  changeList = (newList) => {
    this.setState({
      currentList: newList,
    })
  }

  render() {
    const { currentList, currentPage, searchRequest } = this.state    
    return (
      <>
        <Header
          changeList={this.changeList}
          searchRequest={this.searchFilm}
          currentList={currentList}
        />
        <CardList
          currentList={currentList}
          searchRequest={searchRequest}
          currentPage={currentPage}
        />
        <Pagination
          style={{ margin: '30px', position: 'relative', left: '33%' }}
          total={200}
          showSizeChanger={false}
          defaultCurrent={1}
          pageSize={20}
          onChange={(page) => {
            this.setState({
              currentPage: page,
            })
          }}
        />
      </>
    )
  }
}
