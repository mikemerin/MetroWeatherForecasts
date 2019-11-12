import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';

import { ForecastAdapter } from './adapters';

import Greeting from './components/Greeting';
import { Header, Info } from './components/Header';
import FormContainer from './containers/FormContainer';

var month = (new Date()).getMonth()
var season = month <= 3 || month >= 10 ? "winter" : "normal"

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      current: 0,
      season: season,
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      login: false,
      debug: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.login === false && this.state.login === true) {
      if (this.state.debug) {
        // for debugging LIFT pages, does less calls
        var pages = 2;
        for (let x = 0; x < pages; x++) {
          ForecastAdapter.all(x).then(data => {
            const response = data.response[0]
            var current_data = this.state.data
            current_data[x] = response
            this.setState({ data: current_data })
          })
        }
        for (let x = 6; x < 6+pages; x++) {
          ForecastAdapter.all(x).then(data => {
            const response = data.response[0]
            var current_data = this.state.data
            current_data[x] = response
            this.setState({ data: current_data })
          })
        }
      } else {
        for (let x = 0; x < 21; x++) {
          ForecastAdapter.all(x).then(data => {
            const response = data.response[0]
            var current_data = this.state.data
            current_data[x] = response
            this.setState({ data: current_data })
          })
        }
      }
    }
  }

  hl = () => {
    this.setState({ login: true });
  }

  handlePageChange = (event, result) => {
    event.preventDefault()
    const current = {"LIFT": 0, "LI": 1, "M2": 2, "M3": 3, "M4": 4, "M5": 5, "TIDES": 6, "CUSTOM": 7}
    this.setState({ current: current[result.children] })
  }

  handleSeasonChange = (event, result) => {
    event.preventDefault();
    this.setState({ season: result.value });
  }

  render() {

    const { login, data, current, season } = this.state

    if (login) {
      return (
        <>
          <Header current={ current } season={ season }
            handlePageChange={ this.handlePageChange } handleSeasonChange={ this.handleSeasonChange }/>
          <Grid>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={14}>
              <Grid.Row>
                <Info data={ data[current] } current={ current } />
              </Grid.Row>
              <Grid.Row>
                <FormContainer data={ data } current={ current } season={ season }/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
          </Grid>
        </>
      )
    } else {
      return (
        <Greeting hl={ this.hl } />
      )
    }


  }

}
