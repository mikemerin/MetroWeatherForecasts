import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './App.css'

import { ForecastAdapter } from './adapters'

import { Header, Info } from './components/Header'
import { map } from './components/utils';
import FormContainer from './containers/FormContainer'

var month = (new Date()).getMonth()
var season = month <= 3 || month >= 10 ? "winter" : "normal"

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      current: 0,
      season: season,
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      debug: false
    }
  }

  componentWillMount() {
    console.log("mounting")
    if (this.state.debug) {
      // for debugging main or LIFT pages, does 4 calls instead of 21
      for (let x = 0; x < 2; x++) {
        ForecastAdapter.all(x).then(data => {
          const response = data.response[0]
          var current_data = this.state.data
          current_data[x] = response
          this.setState({ data: current_data })
        })
      }
      for (let x = 6; x < 8; x++) {
        ForecastAdapter.all(x).then(data => {
          const response = data.response[0]
          var current_data = this.state.data
          current_data[x] = response
          this.setState({ data: current_data })
        })
      }
    } else {
      this.greeting();
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

  greeting = () => {
    var p = "uYmtlgtbyzm";
    var a = ["How's it going?", "How are you?", "What's up?", "What are you doing?", "How's the weather?", "How's it hanging?", "Sup?", "How have you been?", "Where have you been?", "How's your day going?", "How do you do?", "What have you been up to?"];
    var t = prompt(a[Math.floor(Math.random()*a.length)]); if (!t || t.match(/\W+/)) { this.greeting(); }; this.m = (u) => u.split("").map(x => map[x]).join("");
    var tm = this.m(t), tl = tm.length, tla = tl - (tl % 2 === 0 ? 0 : 1), s = ""; for (let i = 0; i < tla; i++) { i % 2 === 0 ? s += tm[i+1] : s += tm[i-1] }; if (tl % 2 === 1) { s+=tm[tl-1] }; s = this.m(s); if (s !== p) { this.greeting(); };
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

    const { data, current, season } = this.state

    return (
      <div>
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
      </div>
    )

  }

}
