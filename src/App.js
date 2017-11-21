import React, { Component } from 'react'
import './App.css'

import { ForecastAdapter } from './adapters'
import { LIFTs } from './components/LIFTs'


export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      lift: [],
      lilift: [],
      mnr2: [],
      mnr3: [],
      mnr4: [],
      mnr5: [],
    }
  }

  componentWillMount() {
    console.log("mounting")
    // for (let x = 0; x < 2; x++) {
      // ForecastAdapter.all(0).then(data => {
      //   const response = data.response[0]
      //   this.setState({ lift: response })
      const data = ForecastAdapter.all(0)
      // debugger

        this.setState({ lift: data.response[0] })
    // }
  }

  render() {

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Metro Weather Forecasts</h1>
          </header>
        </div>
        <LIFTs data={ this.state }/>
      </div>
    )

  }

}
