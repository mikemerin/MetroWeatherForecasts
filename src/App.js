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
    const lifts = [ "lift", "lilift", "mnr2", "mnr3", "mnr4", "mnr5" ]
    ForecastAdapter.lift().then(data => {
      const response = data.response[0]
      this.setState({ lift: response })
    })
  }

  // var lat = this.state.location.lat
  // var long = this.state.location.long

  // if (!!this.state.location) {
  //   lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
  //   long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`
  // }

  // const latlong = `Lat: ${ lat } Long: ${ long }`

  render() {

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Metro Weather Forecasts</h1>
          </header>
          <h4>Website was made by Mike Merin using React.js and React-Semantic-Ui</h4>
        </div>
        <LIFTs />
      </div>
    )

  }

}
