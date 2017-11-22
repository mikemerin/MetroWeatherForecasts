import React from 'react'
import { Table } from 'semantic-ui-react'
import { weather_types } from './WxTypes'

export const TIDES = (props) => {

  const { data, current } = props

  const start_date = data[0].periods[0].dateTimeISO.slice(0,10)

  // date
  // data[n].periods[0].dateTimeISO.slice(0,10)
  // time
  // data[n].periods[0].dateTimeISO.match(/T(\S+)-/)[1]

  function periods_to_days(n) {
    var station_periods = data[n].periods
    var days = [ [ station_periods[0] ], [], [], [], [], [], [] ]

    var index = 0

    for (let i = 1; i < station_periods.length; i++) {
      if ( station_periods[i].dateTimeISO.slice(0,10) !==
           station_periods[i-1].dateTimeISO.slice(0,10) )
           { index++ }
      days[index].push(station_periods[i])
    }

    return days
  }

  const stations = [0,1,2,3,4,5,6,7,8].map(x => periods_to_days(x) )

  function location_top(x) {

    const names = [ "1. College Point (Flushing Bay)",
                    "2. 91st East River (Horns)",
                    "3. 59th St. (Queensboro)",
                    "4. Gowanus Canal",
                    "5. The Battery",
                    "6. Great Kills",
                    "7. Lower Hudson Bay",
                    "8. Coney Island",
                    "9. Rockaway" ]

    const station_days = stations[x]

    const row_0 = station_days.map((x,i) => {
      return (
        [
        <Table.Cell key={`${i} tt`}>{ `${x[0].type.toUpperCase()} ${x[0].dateTimeISO.slice(11,16)}` }</Table.Cell>,
        <Table.Cell key={`${i} h`}>{ `${x[0].heightFT}’` }</Table.Cell>
        ]
      )
    })
    // { `${first[0].type.toUpperCase()} ${first[0].dateTimeISO.match(/T(\S+)-/)[1]}` }
    // { `${first[0].heightFT}’` }
    return (
      <Table.Row>
        <Table.Cell colSpan={2} rowSpan={4} >{ names[x] }</Table.Cell>
        { row_0 }
      </Table.Row>
    )
  }

  function location_24(x,row) {
    if (row == 3 ) { //&& periods_to_days(0)[x][3].timestamp === null ) {
      return (
        <Table.Row>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
      )
    } else {
      return (
        <Table.Row>
          <Table.Cell>Sun</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Mon</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Tue</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Wed</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Thu</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Fri</Table.Cell>
          <Table.Cell>’</Table.Cell>
          <Table.Cell>Sat</Table.Cell>
          <Table.Cell>’</Table.Cell>
        </Table.Row>
      )
    }
  }

  function body() {

    return (
      <Table.Body>
        { location_top(0) }
        { location_24(0,1) }
        { location_24(0,2) }
        { location_24(0,3) }
        { location_top(1) }
        { location_24(1,1) }
        { location_24(1,2) }
        { location_24(1,3) }
        { location_top(2) }
        { location_24(2,1) }
        { location_24(2,2) }
        { location_24(2,3) }
        { location_top(3) }
        { location_24(3,1) }
        { location_24(3,2) }
        { location_24(3,3) }
        { location_top(4) }
        { location_24(4,1) }
        { location_24(4,2) }
        { location_24(4,3) }
        { location_top(5) }
        { location_24(5,1) }
        { location_24(5,2) }
        { location_24(5,3) }
        { location_top(6) }
        { location_24(6,1) }
        { location_24(6,2) }
        { location_24(6,3) }
        { location_top(7) }
        { location_24(7,1) }
        { location_24(7,2) }
        { location_24(7,3) }
        { location_top(8) }
        { location_24(8,1) }
        { location_24(8,2) }
        { location_24(8,3) }
      </Table.Body>
    )

  }

  // returns

  if ( data[0].loc !== undefined) {

    return (
      <div>
        <br />
        This tide table begins on Sunday { start_date }
        <font size='1'>
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}><h4>Location</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Sunday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Monday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Tuesday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Wednesday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Thursday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Friday</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Saturday</h4></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          { body() }

        </Table>
        </font>
      </div>

    )

  } else {
    return <div><br />Data is curenlty offline, please try again in a few minutes.</div>
  }

}
