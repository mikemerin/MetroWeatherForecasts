import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { ForecastAdapter } from '../adapters'

export const FREE = (props) => {

  this.get_forecast = (loc, metric) => {
    for(let i1=0; i1<9; i1++){
      document.getElementById("free_" + i1).innerText = "";
    }
    ForecastAdapter.free(loc).then(data => {
      if(data.success) {
        const r = data.response[0];
        r.periods.forEach((x, i) => {
          var per = data.response[0].periods[i]

          var today = new Date()
          var yyyy = today.getFullYear()
          var mm = today.getMonth() + 1
          var dd = today.getDate()
          if (dd < 10) { dd = '0' + dd; }
          if (mm < 10) { mm = '0' + mm; }
          today = yyyy + "-" + mm + "-" + dd

          var period_date = per.validTime.slice(0,10)
          var same_date = (period_date === today)
          var days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
          var day_of_week = days[(new Date(period_date + " 12:00:00")).getDay()]

          var main, high_low, high_low_value;

          console.log(loc, metric)

          if(per.isDay){
            main = (same_date ? "TODAY" : day_of_week) + ":\t";
          	high_low = "HIGHS:\t";
          	high_low_value = per.maxTempF + "°F"
            if (metric) { high_low_value += " / " + per.maxTempC + "°C" }
          } else {
          	main = (same_date ? "TONIGHT" : day_of_week + " NIGHT") + ":\t";
          	high_low = "LOWS:\t";
          	high_low_value = per.minTempF + "°F"
            if (metric) { high_low_value += " / " + per.minTempC + "°C" }
          }

          var main_value = per.weather.toUpperCase()

          var winter_array = ["IC", "IF", "IP", "RS", "SI", "WM", "S", "SW", "ZL", "ZR", "ZY"]
          var snow_array = ["RS", "SI", "WM", "S", "SW"]
          var ice_array = ["IC", "IP", "WM", "ZL", "ZR", "ZY"]
          var winter_wx = false
          var snow_wx = false
          var ice_wx = false

          per.weatherPrimaryCoded.split(":").forEach(x => {
            if(winter_array.includes(x)) { winter_wx = true }
            if(snow_array.includes(x)) { snow_wx = true }
            if(ice_array.includes(x)) { ice_wx = true }
          })

          var precip_value, liquid_value, snow_value, ice_value;
          if(per.precipIN === 0 || per.precipIN === null) {
            liquid_value = "TRACE"
          } else {
            liquid_value = per.precipIN + '"'
            if (metric) { liquid_value += " / " + per.precipMM + "MM" }
          }
          if(per.snowIN === 0 || per.snowIN === null) {
            snow_value = "TRACE"
          } else {
            snow_value = per.snowIN + '"'
            if (metric) { snow_value += " / " + per.snowCM + "CM" }
          }
          if(per.iceaccumIN === 0 || per.iceaccumIN === null) {
            ice_value = "TRACE"
          } else {
            ice_value = per.iceaccumIN + '"'
            if (metric) { ice_value += " / " + per.iceaccumIN + "MM" }
          }

          if(per.pop < 10) {
          	precip_value = "<10%"
          } else {
            if (per.pop % 10 === 0) {
              precip_value = "AROUND " + per.pop + "%"
            } else {
              var r1 = Math.floor(per.pop/10)
            	var r2 = Math.ceil(per.pop/10)
            	precip_value = r1 + "0-" + r2 + "0%"
            }
            if(winter_wx) {
              precip_value += " (" + liquid_value + ' LIQUID'
              if(snow_wx) { precip_value += ', ' + snow_value + ' SNOW' }
              if(ice_wx) { precip_value += ', ' + ice_value + ' ICE ACCUMULATION' }
              precip_value += ')'
            } else {
              precip_value += " (" + liquid_value + ')'
            }
          }

          var clouds_value;
          if(per.sky < 10) {
          	clouds_value = "<10%"
          } else if (per.sky %  10 === 0) {
            clouds_value = "AROUND " + per.sky + "%"
          } else {
            var rc1 = Math.floor(per.sky/10)
            var rc2 = Math.ceil(per.sky/10)
            clouds_value = rc1 + "0-" + rc2 + "0%"
          }

          var wind_value = per.windSpeedMinMPH + "-" + per.windSpeedMaxMPH + " MPH " + per.windDir + " G" + per.windGustMPH
          if(metric) { wind_value += " / " + per.windSpeedMinKPH + "-" + per.windSpeedMaxKPH + " KPH " + per.windDir + " G" + per.windGustKPH }

          document.getElementById("free_" + i).innerText = main + main_value + "\n" +
                                                             high_low + high_low_value + "\n" +
                                                             "% OF PRECIP:\t" + precip_value + "\n" +
                                                             "% OF CLOUDS:\t" + clouds_value + "\n" +
                                                             "WIND:\t" + wind_value
        })
      } else {
        document.getElementById("free_0").innerText = "Cannot find that location, or there may be another error. Please try again"
      }
    })
  }

  this.handleSubmit = (e) => {
    e.preventDefault()
    var loc = e.target.children[0].children[1].value;
    var metric = (e.target.children[1].children[0].classList[1] === "checked" ? true : false);
    this.get_forecast(loc, metric)
  }

  return (
    <div>
      <br />
      <br />
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Enter the [Zip Code], [City, State] or [City, Province/Country]</label>
          <input name='loc' placeholder='New York, NY or Toronto, Ontario' />
        </Form.Field>
        <Form.Field>
          <Checkbox name='metric' id='free_metric' label='Click if you need metric' />
        </Form.Field>
        <Button name='submit' type='submit'>Submit</Button>
      </Form>
      <br /><br />
      <div id="free_0" /><br/>
      <div id="free_1" /><br/>
      <div id="free_2" /><br/>
      <div id="free_3" /><br/>
      <div id="free_4" /><br/>
      <div id="free_5" /><br/>
      <div id="free_6" /><br/>
      <div id="free_7" /><br/>
      <div id="free_8" /><br/>

    </div>
  )
}
