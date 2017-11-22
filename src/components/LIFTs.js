import React from 'react'
import { Table } from 'semantic-ui-react'
import { weather_types } from './WxTypes'

export const LIFTs = (props) => {

  const { data } = props

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const d = new Date()

  var d_1 = d.getDay()
  var d_2 = d_1 + 1
  var d_3 = d_2 + 1
  var d_4 = d_3 + 1
  var d_5 = d_4 + 1

  if ( data.loc !== undefined ) {
    if (d_2 > 6) { d_2 -= 7 }
    if (d_3 > 6) { d_3 -= 7 }
    if (d_4 > 6) { d_4 -= 7 }
    if (d_5 > 6) { d_5 -= 7 }
  }

  function body() {

    const day1 = data.periods[0]
    const night1 = data.periods[1]
    const day2 = data.periods[2]
    const night2 = data.periods[3]
    const day3 = data.periods[4]
    const day4 = data.periods[6]
    const day5 = data.periods[8]

    const three_day = [day1, night1, day2, night2, day3]

    function cells(type) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type] }</Table.Cell> ) }
    function cells_range(type1, type2) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type1] }-{ x[type2] }</Table.Cell> )}
    function cells_wx_types() { return three_day.map((x, i) => <Table.Cell key={i}>{ weather_types[x['weatherPrimaryCoded'].split(":")[2]] }</Table.Cell> ) }


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
        <Table.Row>
          <Table.Cell>LIQUID (IN)</Table.Cell>
          { cells('precipIN') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>SNOW (IN)</Table.Cell>
          { cells('snowIN') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>CHANGEOVER</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
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
        <Table.Row>
          <Table.Cell>WINTER FORECAST CONFIDENCE</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
          <Table.Cell>1ST 2'' OF SNOW BY</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
        </Table.Row>
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
          Today: { data.periods[0].weather }<br />
          Tonight: { data.periods[1].weather }<br />
          { weekdays[d_2] }: { data.periods[2].weather }<br />
          { weekdays[d_2].slice(0,3) }. Night: { data.periods[3].weather }<br />
          { weekdays[d_3] }: { data.periods[4].weather }<br />
          { weekdays[d_4] }: { data.periods[6].weather }<br />
          { weekdays[d_5] }: { data.periods[8].weather }
          <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><h4>WX</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{weekdays[d_1].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{weekdays[d_1].toUpperCase().slice(0,3)}. NIGHT 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{weekdays[d_2].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{weekdays[d_2].toUpperCase().slice(0,3)}. NIGHT 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{weekdays[d_3].toUpperCase().slice(0,3)}. 6A-6P</h4></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            { body() }

          </Table>
        </div>

      )

    } else {
      return <div><br />Data is curenlty offline, please try again in a few minutes.</div>
    }

}
