import React, { Component } from 'react'
import './Header'
import Search from 'antd/es/input/Search'
import { Menu } from 'antd'
import debounce from 'lodash.debounce'

export default class Header extends Component {
  debouncedSearchRequest = debounce(this.props.searchRequest, 1000)
  state = {
    searchValue: '',
  }
  clearSearch = () => {
    this.setState({
      searchValue: '',
    })
  }
  debouncedClearSearch = debounce(this.clearSearch, 1000)
  items = [
    {
      label: 'Top trending',
      key: 'trending',
      style: {
        marginLeft: 'auto',
      },
    },
    {
      label: 'Top Rated',
      key: 'rated',
    },
    {
      label: 'Search',
      key: 'search',
      style: {
        marginRight: 'auto',
      },
    },
  ]
  render() {
    const search =
      this.props.currentList === 'search' ? (
        <Search
          placeholder="Type to find a film"
          onChange={(evt) => {
            if (evt.target.value) {
              this.setState({
                searchValue: evt.target.value,
              })
              this.debouncedSearchRequest(evt.target.value)
              this.debouncedClearSearch()
            }
          }}
          style={{ width: '938px', margin: '0 auto', marginTop: '20px' }}
          value={this.state.searchValue}
        />
      ) : null
    return (
      <header className="header" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Menu
          mode="horizontal"
          items={this.items}
          style={{ display: 'flex', width: '100%' }}
          defaultSelectedKeys={['trending']}
          selectable={true}
          onSelect={({ key }) => {
            this.props.changeList(key)
          }}
        />
        {search}
      </header>
    )
  }
}
