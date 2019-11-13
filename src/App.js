import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';

import { ForecastAdapter } from './adapters';

import Greeting from './components/Greeting';
import { Header, Info } from './components/Header';
import FormContainer from './containers/FormContainer';

var month = (new Date()).getMonth();
var season = month <= 3 || month >= 10 ? "winter" : "normal";

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      current: 0,
      season: season,
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // tides: [ {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      tides: false,
      login: false,
      debug: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.login === false && this.state.login === true) {
      if (this.state.debug) {
        // for debugging LIFT pages, does less calls
        var pages = 1;
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
        for (let x = 0; x < 12; x++) {
          ForecastAdapter.all(x).then(data => {
            const response = data.response[0]
            var current_data = this.state.data
            current_data[x] = response
            this.setState({ data: current_data })
          })
        }
      }
    }
    if (this.state.tides && prevState.tides === false) {
      for (let x = 12; x < 21; x++) {
        ForecastAdapter.all(x).then(data => {
          const response = data.response[0]
          var current_data = this.state.data
          current_data[x] = response
          this.setState({ data: current_data, tides: true })
        })
      }
    }
  }

  hl = () => {
    this.setState({ login: true });
  }

  handleTides = (event, result) => {
    event.preventDefault();
    this.setState({ tides: true });
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

    const { login, data, current, season, tides } = this.state

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
                <FormContainer data={ data } current={ current } season={ season } tides={ tides } handleTides={ this.handleTides }/>
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
