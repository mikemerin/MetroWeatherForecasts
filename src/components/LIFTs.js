import React from 'react'
import { Table } from 'semantic-ui-react'
import { weather_types } from './WxTypes'

export const LIFTs = (props) => {

  const { lift, lilift, mnr2, mnr3, mnr4, mnr5 } = props.data
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const d = new Date()

  var d_1 = d.getDay()
  var d_2 = d_1 + 1
  var d_3 = d_2 + 1
  var d_4 = d_3 + 1
  var d_5 = d_4 + 1

  if ( lift.loc !== undefined ) { [d_1, d_2, d_3, d_4, d_5].map(x => x = (x > 6 ? x-=7 : x) ) }

  function body() {

    const day1 = lift.periods[0]
    const night1 = lift.periods[1]
    const day2 = lift.periods[2]
    const night2 = lift.periods[3]
    const day3 = lift.periods[4]
    const day4 = lift.periods[6]
    const day5 = lift.periods[8]

    const three_day = [day1, night1, day2, night2, day3]
    const daynights = [day1, night1, day2, night2, day3, day4, day5]

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
          <Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>START</Table.Cell>
          <Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>STOP</Table.Cell>
          <Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>VISIBILITY (MILES)</Table.Cell>
          <Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell><Table.Cell> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GROUND TEMP</Table.Cell>
          <Table.Cell colSpan={2}> </Table.Cell>
          <Table.Cell>ADVISORIES</Table.Cell>
          <Table.Cell colSpan={2}> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>WINTER FORECAST CONFIDENCE</Table.Cell>
          <Table.Cell colSpan={2}> </Table.Cell>
          <Table.Cell>1ST 2'' OF SNOW BY</Table.Cell>
          <Table.Cell colSpan={2}> </Table.Cell>
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

    var lat = 0
    var long = 0

    if (lift.loc !== undefined) {
      lat = lift.loc.lat
      long = lift.loc.long
    }

    lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
    long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`
    const latlong = `Lat: ${ lat } Long: ${ long }`

    if ( lift.loc !== undefined) {

      return (
        <div>
          <div className="center">NYC Forecast - {latlong}</div>
          Today: { lift.periods[0].weather }<br />
          Tonight: { lift.periods[1].weather }<br />
          { weekdays[d_2] }: { lift.periods[2].weather }<br />
          { weekdays[d_2].slice(0,3) } Night: { lift.periods[3].weather }<br />
          { weekdays[d_3] }: { lift.periods[4].weather }<br />
          { weekdays[d_4] }: { lift.periods[6].weather }<br />
          { weekdays[d_5] }: { lift.periods[8].weather }
          <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>  </Table.HeaderCell>
                <Table.HeaderCell><h4>{ weekdays[d_1].slice(0,3) }. 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{ weekdays[d_1].slice(0,3) }. Night 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{ weekdays[d_2].slice(0,3) }. 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{ weekdays[d_2].slice(0,3) }. Night 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>{ weekdays[d_3].slice(0,3) }. 6A-6P</h4></Table.HeaderCell>
              </Table.Row>
            </Table.Header>


            { body() }

          </Table>
        </div>

      )

    } else {
      return "Please try again later"
    }

}
