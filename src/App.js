import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './App.css'

import { ForecastAdapter } from './adapters'

import { Header } from './components/Header'
import FormContainer from './containers/FormContainer'

var month = (new Date()).getMonth()
var season = month < 3 || month === 11 ? "winter" : "normal"

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      current: 0,
      season: season,
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ]
    }
  }

  componentWillMount() {
    console.log("mounting")
    for (let x = 0; x < 21; x++) {
      ForecastAdapter.all(x).then(data => {
        const response = data.response[0]
        var current_data = this.state.data
        current_data[x] = response
        this.setState({ data: current_data })
      })
    }
    // for debugging TIDES pages, does 4 calls instead of 21
    // for (let x = 0; x < 2; x++) {
    //   ForecastAdapter.all(x).then(data => {
    //     const response = data.response[0]
    //     var current_data = this.state.data
    //     current_data[x] = response
    //     this.setState({ data: current_data })
    //   })
    // }
    // for (let x = 6; x < 8; x++) {
    //   ForecastAdapter.all(x).then(data => {
    //     const response = data.response[0]
    //     var current_data = this.state.data
    //     current_data[x] = response
    //     this.setState({ data: current_data })
    //   })
    // }
  }

  handlePageChange = (event, result) => {
    event.preventDefault()
    const current = {"LIFT": 0, "LI": 1, "M2": 2, "M3": 3, "M4": 4, "M5": 5, "TIDES": 6}
    this.setState({ current: current[result.children] })
  }

  handleSeasonChange = (event, result) => {
    event.preventDefault()
    this.setState({ season: event.target.value })
  }

  render() {

    const { data, current, season } = this.state

    return (
      <div>
        <Header data={ data[current] } current={ current } season={ season }
          handlePageChange={ this.handlePageChange } handleSeasonChange={ this.handleSeasonChange }/>
        <Grid>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={14}>
            <FormContainer data={ data } current={ current } season={ season }/>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid>
      </div>
    )

  }

}
