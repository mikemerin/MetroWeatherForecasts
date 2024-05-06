
import React, { Component } from 'react'
//import { Graph } from './GraphCustom'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { ForecastAdapter } from '../adapters'

export class CUSTOM extends Component {

  constructor() {
    super();
    this.state = {
      shortcuts: {
        "Atlanta": { "name": "Atlanta, Georgia" },
        "Chicago": { "name": "Chicago, Illinois" },
        "LA": { "name": "Los Angeles, CA" },
        "NYC": { "name": "New York, New York" },
        "Pitt": { "name": "Pittsburgh, Pennsylvania" },
        "Philly": { "name": "Philadelphia, Pennsylvania" },
        "Toronto": { "name": "Toronto, Ontario", "metric": true }
      },
      metric: false
    }
  }
  // var graph_data = {}; //todo: link up graph

  get_forecast = (loc) => {
    for (let i1 = 0; i1 < 9; i1++) {
      document.getElementById("custom_" + i1).innerText = "";
    }
    const forecastAdapter = new ForecastAdapter(this.props.clientId, this.props.clientSecret);
    console.log("🚀 ~ CUSTOM ~ forecastAdapter:", forecastAdapter)

    forecastAdapter.custom(loc).then(data => {
      console.log("🚀 ~ CUSTOM ~ forecastAdapter.custom ~ data:", data)
      if (data?.success) {
        const r = data.response[0];
        this.graph_data = data.response[0];
        r.periods.forEach((x, i) => {
          var per = data.response[0].periods[i]

          var today = new Date()
          var yyyy = today.getFullYear()
          var mm = today.getMonth() + 1
          var dd = today.getDate()
          if (dd < 10) { dd = '0' + dd; }
          if (mm < 10) { mm = '0' + mm; }
          today = yyyy + "-" + mm + "-" + dd

          var period_date = per.validTime.slice(0, 10)
          var same_date = (period_date === today)
          var days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
          var day_of_week = days[(new Date(period_date + " 12:00:00")).getDay()]

          var main, high_low, high_low_value;

          if (per.isDay) {
            main = (same_date ? "TODAY" : day_of_week) + ":\t";
            high_low = "HIGHS:\t";
            high_low_value = per.maxTempF + "°F"
            if (this.state.metric) { high_low_value += " / " + per.maxTempC + "°C" }
          } else {
            main = (same_date ? "TONIGHT" : day_of_week + " NIGHT") + ":\t";
            high_low = "LOWS:\t";
            high_low_value = per.minTempF + "°F"
            if (this.state.metric) { high_low_value += " / " + per.minTempC + "°C" }
          }

          var main_value = per.weather.toUpperCase()

          var winter_array = ["IC", "IF", "IP", "RS", "SI", "WM", "S", "SW", "ZL", "ZR", "ZY"]
          var snow_array = ["RS", "SI", "WM", "S", "SW"]
          var ice_array = ["IC", "IP", "WM", "ZL", "ZR", "ZY"]
          var winter_wx = false
          var snow_wx = false
          var ice_wx = false

          var weather_code = per.weatherPrimaryCoded.split(":")[2]
          if (winter_array.includes(weather_code)) { winter_wx = true }
          if (snow_array.includes(weather_code)) { snow_wx = true }
          if (ice_array.includes(weather_code)) { ice_wx = true }

          var precip_value, liquid_value, snow_value, ice_value;
          if (per.precipIN === 0 || per.precipIN === null) {
            liquid_value = "TRACE"
          } else {
            liquid_value = per.precipIN + '"'
            if (this.state.metric) { liquid_value += " / " + per.precipMM + "MM" }
          }
          if (per.snowIN === 0 || per.snowIN === null) {
            snow_value = "TRACE"
          } else {
            snow_value = per.snowIN + '"'
            if (this.state.metric) { snow_value += " / " + per.snowCM + "CM" }
          }
          if (per.iceaccumIN === 0 || per.iceaccumIN === null) {
            ice_value = "TRACE"
          } else {
            ice_value = per.iceaccumIN + '"'
            if (this.state.metric) { ice_value += " / " + per.iceaccumIN + "MM" }
          }

          if (per.pop < 10) {
            precip_value = "<10%"
          } else {
            if (per.pop % 10 === 0) {
              precip_value = "AROUND " + per.pop + "%"
            } else {
              var r1 = Math.floor(per.pop / 10)
              var r2 = Math.ceil(per.pop / 10)
              precip_value = r1 + "0-" + r2 + "0%"
            }
            if (winter_wx) {
              precip_value += " (" + liquid_value + ' LIQUID'
              if (snow_wx) { precip_value += ', ' + snow_value + ' SNOW' }
              if (ice_wx) { precip_value += ', ' + ice_value + ' ICE ACCUMULATION' }
              precip_value += ')'
            } else {
              precip_value += " (" + liquid_value + ')'
            }
          }

          var clouds_value;
          if (per.sky < 10) {
            clouds_value = "<10%"
          } else if (per.sky % 10 === 0) {
            clouds_value = "AROUND " + per.sky + "%"
          } else {
            var rc1 = Math.floor(per.sky / 10)
            var rc2 = Math.ceil(per.sky / 10)
            clouds_value = rc1 + "0-" + rc2 + "0%"
          }

          var wind_value = per.windDir + " " + per.windSpeedMinMPH + "-" + per.windSpeedMaxMPH + " MPH";
          if (per.windGustMPH > per.windSpeedMaxMPH) { wind_value += " G " + per.windGustMPH }
          if (this.state.metric) {
            wind_value += " / " + per.windSpeedMinKPH + "-" + per.windSpeedMaxKPH + " KPH ";
            if (per.windGustMPH > per.windSpeedMaxMPH) { wind_value += " G " + per.windGustKPH }
          }

          if (document.getElementById("custom_" + i)) {
            document.getElementById("custom_" + i).innerText = main + main_value + "\n" +
              high_low + high_low_value + "\n" +
              "% OF PRECIP:\t" + precip_value + "\n" +
              "% OF CLOUDS:\t" + clouds_value + "\n" +
              "WIND:\t" + wind_value;
          } else {
            console.log("custom_" + i + ' not found');
          }
        })
      } else {
        document.getElementById("custom_0").innerText = "Cannot find that location, or there may be another error. Please try again"
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var loc = document.getElementById('custom_loc').value;
    this.get_forecast(loc);
  }

  handleShortcut = (e) => {
    e.preventDefault();
    document.getElementById('custom_loc').value = this.state.shortcuts[e.target.textContent]['name'];
    this.setState({ metric: this.state.shortcuts[e.target.textContent]['metric'] });
  }

  handleMetric = (e) => {
    this.setState({ metric: !this.state.metric });
  }

  render() {
    var shortcut_buttons = Object.keys(this.state.shortcuts).map(shortcut => {
      return <Button key={"button_" + shortcut} color='blue' inverted onClick={this.handleShortcut} >{shortcut}</Button>
    })

    return (
      <div>
        <br />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Enter the [Zip Code], [City, State] or [City, Province/Country]</label>
            <input id='custom_loc' name='loc' placeholder='New York, NY or Toronto, Ontario' />
          </Form.Field>
          {shortcut_buttons}
          <br /><br />
          <Form.Field>
            <Checkbox name='metric' id='custom_metric' checked={this.state.metric} onClick={this.handleMetric} label='Click if you need metric' />
          </Form.Field>
          <Button name='submit' type='submit'>Submit</Button>
        </Form>
        <br /><br />
        <div id="custom_0" /><br />
        <div id="custom_1" /><br />
        <div id="custom_2" /><br />
        <div id="custom_3" /><br />
        <div id="custom_4" /><br />
        <div id="custom_5" /><br />
        <div id="custom_6" /><br />
        <div id="custom_7" /><br />
        <div id="custom_8" /><br />
        <div id="custom_9" /><br />
        <div id="custom_10" /><br />
      </div>
    )
  }
}

//<Graph graph_data={ this.graph_data } season={ props.season }/>
