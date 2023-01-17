import React from 'react'
import { Table } from 'semantic-ui-react'
import { Graph } from './Graph'
import { weather_types } from './WxTypes'

export const LIFTs = (props) => {

  const { data, season, graph_data } = props

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const header = (tomorrow) => {
    let d = new Date()
    if (tomorrow) {
      d.setDate(d.getDate() + 1);
    }

    const dayOffset = tomorrow ? 2 : 0;

    let d_1 = d.getDay()
    let d_2 = d_1 + 1
    let d_3 = d_2 + 1
    let d_4 = d_3 + 1
    let d_5 = d_4 + 1
  
    if ( data.loc !== undefined ) {
      if (d_2 > 6) { d_2 -= 7 }
      if (d_3 > 6) { d_3 -= 7 }
      if (d_4 > 6) { d_4 -= 7 }
      if (d_5 > 6) { d_5 -= 7 }
    }

    return (
      <>
        <h4>For {tomorrow ? 'Tomorrow' : 'Today'} ({d.toDateString()})</h4>
        Today: { data.periods[0 + dayOffset].weather }<br />
        Tonight: { data.periods[1 + dayOffset].weather }<br />
        { weekdays[d_2] }: { data.periods[2 + dayOffset].weather }<br />
        { weekdays[d_2].slice(0,3) }. Night: { data.periods[3 + dayOffset].weather }<br />
        { weekdays[d_3] }: { data.periods[4 + dayOffset].weather }<br />
        { weekdays[d_4] }: { data.periods[6 + dayOffset].weather }<br />
        { weekdays[d_5] }: { data.periods[8 + dayOffset].weather }
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          <Table.Header>
            <Table.Row>
              <Table.Cell><h4>Copy below</h4></Table.Cell>
              <Table.Cell><h4>{weekdays[d_1].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.Cell>
              <Table.Cell><h4>{weekdays[d_1].toUpperCase().slice(0,3)}. NIGHT 6P-6A</h4></Table.Cell>
              <Table.Cell><h4>{weekdays[d_2].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.Cell>
              <Table.Cell><h4>{weekdays[d_2].toUpperCase().slice(0,3)}. NIGHT 6P-6A</h4></Table.Cell>
              <Table.Cell><h4>{weekdays[d_3].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.Cell>
            </Table.Row>
          </Table.Header>

        </Table>
      </>
    )
  }

  const body = (season, tomorrow) => {
    
    // repeated code, extract
    let d = new Date()
    if (tomorrow) {
      d.setDate(d.getDate() + 1);
    }

    const dayOffset = tomorrow ? 2 : 0;

    let d_1 = d.getDay()
    let d_2 = d_1 + 1
    let d_3 = d_2 + 1
    let d_4 = d_3 + 1
    let d_5 = d_4 + 1
  
    if ( data.loc !== undefined ) {
      if (d_2 > 6) { d_2 -= 7 }
      if (d_3 > 6) { d_3 -= 7 }
      if (d_4 > 6) { d_4 -= 7 }
      if (d_5 > 6) { d_5 -= 7 }
    }
    // end repeated code

    const day1 = data.periods[0 + dayOffset]
    const night1 = data.periods[1 + dayOffset]
    const day2 = data.periods[2 + dayOffset]
    const night2 = data.periods[3 + dayOffset]
    const day3 = data.periods[4 + dayOffset]
    const day4 = data.periods[6 + dayOffset]
    const day5 = data.periods[8 + dayOffset]

    const three_day = [day1, night1, day2, night2, day3]

    function cells(type) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type] }</Table.Cell> ) }
    function cells_range(type1, type2) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type1] }-{ x[type2] }</Table.Cell> )}
    function cells_wx_types() { return three_day.map((x, i) => <Table.Cell key={i}>{ weather_types[x['weatherPrimaryCoded'].split(":")[2]] }</Table.Cell> ) }

    function season_output(type) {
      if ( season === "normal" ) {
        switch(type) {
          case "maxDewpointF":
            return (
              <Table.Row>
                <Table.Cell>DEWPOINT (ºF)</Table.Cell>
                <Table.Cell>{ day1.maxDewpointF }</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>{ day2.maxDewpointF }</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>{ day3.maxDewpointF }</Table.Cell>
              </Table.Row>
            )
          case "THUNDER %":
            return (
              <Table.Row>
                <Table.Cell>THUNDER %</Table.Cell>
                <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
              </Table.Row>
            )
          case "bottom":
            return (
              <Table.Row>
                <Table.Cell>DAYTIME AVG HUMIDITY</Table.Cell>
                <Table.Cell colSpan={2}>{ day1.humidity }%</Table.Cell>
                <Table.Cell>DAYTIME UV INDEX</Table.Cell>
                <Table.Cell colSpan={2}>{ day1.uvi }</Table.Cell>
              </Table.Row>
            )
          default: break;
        }
      } else if ( season === "winter" ) {
        switch(type) {
          case "snowIN":
            return (
              <Table.Row>
                <Table.Cell>SNOW (IN)</Table.Cell>
                { cells('snowIN') }
              </Table.Row>
            )
            case "CHANGEOVER":
              return (
                <Table.Row>
                  <Table.Cell>CHANGEOVER</Table.Cell>
                  <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
                </Table.Row>
              )
            case "bottom":
              return (
                <Table.Row>
                  <Table.Cell>FORECAST CONFIDENCE</Table.Cell>
                  <Table.Cell colSpan={2}>-</Table.Cell>
                  <Table.Cell>1ST 2'' OF SNOW BY</Table.Cell>
                  <Table.Cell colSpan={2}>-</Table.Cell>
                </Table.Row>
              )
            default: break;
        }
      }
    }

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>TEMPS (ºF)</Table.Cell>
          <Table.Cell>{ day1.maxTempF }</Table.Cell>
          <Table.Cell>{ night1.minTempF }</Table.Cell>
          <Table.Cell>{ day2.maxTempF }</Table.Cell>
          <Table.Cell>{ night2.minTempF }</Table.Cell>
          <Table.Cell>{ day3.maxTempF }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>FEELS LIKE (ºF)</Table.Cell>
          <Table.Cell>{ day1.maxFeelslikeF }</Table.Cell>
          <Table.Cell>{ night1.minFeelslikeF }</Table.Cell>
          <Table.Cell>{ day2.maxFeelslikeF }</Table.Cell>
          <Table.Cell>{ night2.minFeelslikeF }</Table.Cell>
          <Table.Cell>{ day3.maxFeelslikeF }</Table.Cell>
        </Table.Row>
        { season_output('maxDewpointF') }
        <Table.Row>
          <Table.Cell>WIND DIR</Table.Cell>
          { cells('windDir') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>SPEED (MPH)</Table.Cell>
          { cells_range('windSpeedMinMPH', 'windSpeedMaxMPH') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>GUSTS (MPH)</Table.Cell>
          { cells('windGustMPH') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>PRECIP</Table.Cell>
          { cells_wx_types() }
        </Table.Row>
        <Table.Row>
          <Table.Cell>PRECIP %</Table.Cell>
          { cells('pop') }
        </Table.Row>
        { season_output('THUNDER %') }
        <Table.Row>
          <Table.Cell>LIQUID (IN)</Table.Cell>
          { cells('precipIN') }
        </Table.Row>
        { season_output('snowIN') }
        { season_output('CHANGEOVER') }
        <Table.Row>
          <Table.Cell>START</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>STOP</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>VISIBILITY (MILES)</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GROUND TEMP</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
          <Table.Cell>ADVISORIES</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
        </Table.Row>
        { season_output('bottom') }
        <Table.Row>
          <Table.Cell>{ weekdays[d_4] }</Table.Cell>
          <Table.Cell colSpan={2}>{ day4.weather }, { day4.maxTempF }ºF</Table.Cell>
          <Table.Cell>{ weekdays[d_5] }</Table.Cell>
          <Table.Cell colSpan={2}>{ day5.weather }, { day5.maxTempF }ºF</Table.Cell>
        </Table.Row>

      </Table.Body>
    )
  }

    if ( data.loc !== undefined) {

      return (
        <div>
          <br />
          {/* Today */}
          { header() }
          <br />
          <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
            { body(season) }
          </Table>
          {/* Tomorrow */}
          <br />
          { header(true) }
          <br />
          <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
            { body(season, true) }
          </Table>
          <Graph graph_data={ graph_data } season={ season }/>
        </div>

      )

    } else {
      return <div><br />Please wait for the data to load.<br/><br/>If data does not load within 20 seconds then please try again in a few minutes.</div>
    }

}
