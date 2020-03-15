import React from "react"
import { navigate } from "gatsby"
import reactComposition from "react-composition"

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: props.query
    }
  }
  render() {
    const self = this;
    const { query } = this.state
    return (
      <form role="search" method="GET">
        <label htmlFor="search-input">
          <h1>Search posts</h1>
        </label>
        <input
          type="search"
          id="search-input"
          name="keywords"
          aria-controls="search-results-count"
          {...reactComposition({
            onChange: e =>{
              if (e.reactComposition.composition === false) {
                navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
              }
              self.setState({
                query: e.target.value
              })
            }
          })}
          value={query}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SearchForm
