import React from 'react'
import { Table } from 'semantic-ui-react'
import { Temptidedata } from '../adapters/Tempdata'

export const TIDES = (props) => {

  const { data } = props

  var dates = ["", "", "", "", "", "", "", "" ]

  // date
  // data[n].periods[0].dateTimeISO.slice(0,10)
  // time
  // data[n].periods[0].dateTimeISO.match(/T(\S+)-/)[1]

  function periods_to_days(n) {

    var days = undefined

    // if that specific location returns no data
    if ( data[n] === undefined )
      { data[n] = Temptidedata.response[0] }

    var station_periods = data[n].periods
    days = [ [ station_periods[0] ], [], [], [], [], [], [] ]

    var index = 0

    for (let i = 1; i < station_periods.length; i++) {
      if ( station_periods[i].dateTimeISO.slice(0,10) !==
           station_periods[i-1].dateTimeISO.slice(0,10) )
           { index++ }
      days[index].push(station_periods[i])
    }

    days.forEach((x, i) => dates[i] = x[0].dateTimeISO.slice(5,10))

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

    const row_0 = station_days.map((day,i) => {
      return (
        [
        <Table.Cell key={`${i} tt`}>{ `${day[0].type.toUpperCase()} ${day[0].dateTimeISO.slice(11,16)}` }</Table.Cell>,
        <Table.Cell key={`${i} h`}>{ `${day[0].heightFT}’` }</Table.Cell>
        ]
      )
    })

    return (
      <Table.Row>
        <Table.Cell colSpan={2} rowSpan={4} >{ names[x] }</Table.Cell>
        { row_0 }
      </Table.Row>
    )
  }

  function location_bot(x) {

    const station_days = stations[x]

    const rows_13 = [1, 2, 3].map((row, i) => {

      var this_row = station_days.map(day => day[row])

      return (
        <Table.Row key={i}>
          { this_row.map((cell, j) => {
            if (row === 3 && cell === undefined) {
              return (
                  [
                  <Table.Cell key={`${j} tt`}>-</Table.Cell>,
                  <Table.Cell key={`${j} ft`}>-</Table.Cell>
                  ]
              )
            } else {
              return (
                  [
                  <Table.Cell key={`${j} tt`}>{ `${cell.type.toUpperCase()} ${cell.dateTimeISO.slice(11,16)}` }</Table.Cell>,
                  <Table.Cell key={`${j} ft`}>{ `${cell.heightFT}’` }</Table.Cell>
                  ]
              )
            }
          })
          }
      </Table.Row>
      )

    })

    return rows_13

  }

  function body() {

    return (
      <Table.Body>
        { location_top(0) }
        { location_bot(0) }
        { location_top(1) }
        { location_bot(1) }
        { location_top(2) }
        { location_bot(2) }
        { location_top(3) }
        { location_bot(3) }
        { location_top(4) }
        { location_bot(4) }
        { location_top(5) }
        { location_bot(5) }
        { location_top(6) }
        { location_bot(6) }
        { location_top(7) }
        { location_bot(7) }
        { location_top(8) }
        { location_bot(8) }
      </Table.Body>
    )

  }

  // returns

  if ( data[0].loc !== undefined) {

    return (
      <div>
        <br />
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}><h4>Location</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Sunday {dates[0]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Monday {dates[1]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Tuesday {dates[2]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Wednesday {dates[3]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Thursday {dates[4]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Friday {dates[5]}</h4></Table.HeaderCell>
              <Table.HeaderCell colSpan={2}><h4>Saturday {dates[6]}</h4></Table.HeaderCell>
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
