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
    // for (let x = 0; x < 21; x++) {
    //   ForecastAdapter.all(x).then(data => {
    //     const response = data.response[0]
    //     var current_data = this.state.data
    //     current_data[x] = response
    //     this.setState({ data: current_data })
    //   })
    // }
    this.loginPassword();
    // for debugging TIDES pages, does 4 calls instead of 21
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
  }

  loginPassword = () => {
    var pw = "Stfzoexsqk9955";
    var map = {
      a: 'q', b: 'w', c: 'e', d: 'r', e: 't', f: 'y',
      g: 'u', h: 'i', i: 'o', j: 'p', k: 'a', l: 's',
      m: 'd', n: 'f', o: 'g', p: 'h', q: 'j', r: 'k',
      s: 'l', t: 'z', u: 'x', v: 'c', w: 'v', x: 'b',
      y: 'n', z: 'm',
      A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', F: 'Y',
      G: 'U', H: 'I', I: 'O', J: 'P', K: 'A', L: 'S',
      M: 'D', N: 'F', O: 'G', P: 'H', Q: 'J', R: 'K',
      S: 'L', T: 'Z', U: 'X', V: 'C', W: 'V', X: 'B',
      Y: 'N', Z: 'M',
      1: '2', 2: '3', 3: '4', 4: '5', 5: '6',
      6: '7', 7: '8', 8: '9', 9: '0', 0: '1'
    };
    var text = prompt("Please enter the password to continue");
    if (text.split("").map(x => map[x]).join("") !== pw) {
      alert("Sorry wrong password, please try again.")
      this.loginPassword();
    }
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
