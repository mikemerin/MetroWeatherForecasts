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
      temperature: 'ºF',
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // tides: [ {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      tides: false,
      login: false,
      debug: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var calls = [];
    if (!prevState.login && this.state.login) {
      var pages = (this.state.debug ? 1 : 6); // for debugging LIFT pages, does less calls
      for (let x = 0; x < pages; x++) {
        calls.push(x, x+6);
      }
    }
    if (!prevState.tides && this.state.tides) {
      for (let x = 12; x < 21; x++) {
        calls.push(x);
      }
    }

    if (calls.length > 0) {
      ForecastAdapter.all(calls).then(all_called_data => {
        var current_data = this.state.data;
        all_called_data.forEach((data, i) => {
          current_data[calls[i]] = data;
        })
        this.setState({ data: current_data })
      })
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

  handleTemperatureChange = (event, result) => {
    event.preventDefault();
    this.setState({ temperature: result.value });
  }

  render() {

    const { login, data, current, season, tides, temperature } = this.state

    if (login) {
      return (
        <>
          <Header current={ current } handlePageChange={ this.handlePageChange }/>
          <center><br /><br /><br />
            <Grid>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={14}>
                <Grid.Row>
                  <Info data={ data[current] } current={ current }
                    season={ season } handleSeasonChange={ this.handleSeasonChange }
                    temperature={ temperature } handleTemperatureChange={ this.handleTemperatureChange }
                  />
                </Grid.Row>
                <Grid.Row>
                  <FormContainer data={ data } current={ current } season={ season } tides={ tides } handleTides={ this.handleTides }/>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
            </Grid>
          </center>
        </>
      )
    } else {
      return (
        <Greeting hl={ this.hl } p={ this.state.debug } />
      )
    }


  }

}
