import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './App.css'

import { ForecastAdapter } from './adapters'

import { Header } from './components/Header'
import { LIFTs } from './components/LIFTs'


export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      current: 0,
      data: [ {}, {}, {}, {}, {}, {} ],
    }
  }

  componentWillMount() {
    console.log("mounting")
    for (let x = 0; x < 6; x++) {
      ForecastAdapter.all(x).then(data => {
        const response = data.response[0]
        var current_data = this.state.data
        current_data[x] = response
        this.setState({ data: current_data })
      })
    }
  }

  handlePageChange = (event, result) => {
    event.preventDefault()
    const current = {"LIFT": 0, "LILIFT": 1, "MNR2": 2, "MNR3": 3, "MNR4": 4, "MNR5": 5}
    this.setState({ current: current[result.children] })
  }

  render() {

    const { data, current } = this.state

    return (
      <div>
        <Header data={ data[current] } current={ current } handlePageChange={ this.handlePageChange } />
        <Grid>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={14}>
            <LIFTs data={ data[current] }/>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid>
      </div>
    )

  }

}
