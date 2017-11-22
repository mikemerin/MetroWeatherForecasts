import React from 'react'
import { Table } from 'semantic-ui-react'
import { weather_types } from './WxTypes'

export const TIDES = (props) => {

  const { data, current } = props

  const start_date = data[0].periods[0].dateTimeISO.slice(0,10)

  console.log(data)

  // date
  // data.periods[0].dateTimeISO.slice(0,10)
  // time
  // data.periods[0].dateTimeISO.match(/T(\S+)-/)[1]

  function periods_to_days(n) {
    var days = [ [ data.periods[0] ], [], [], [], [], [], [] ]

    var index = 0

    for (let i = 1; i < data.periods.length; i++) {
      if ( data.periods[i].dateTimeISO.slice(0,10) !==
           data.periods[i-1].dateTimeISO.slice(0,10) )
           { index++ }
      days[index].push(data.periods[i])
    }

    return days
  }

  function days(x) {
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


  function location_top(x) {

    return (
      <Table.Row>
        <Table.Cell colSpan={2} rowSpan={4} >1. College Point (Flushing Bay)</Table.Cell>
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

  function location_24(x,row) {
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
        { location_top(9) }
        { location_24(9,1) }
        { location_24(9,2) }
        { location_24(9,3) }
      </Table.Body>
    )

  }

  // returns

  if ( data[0].loc !== undefined) {

    return (
      <div>
        <br />
        This tide table begins on Sunday { start_date }
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
      </div>

    )

  } else {
    return <div><br />Data is curenlty offline, please try again in a few minutes.</div>
  }

}
