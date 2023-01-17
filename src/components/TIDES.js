import React from 'react'
import { Table } from 'semantic-ui-react'
import { Temptidedata } from '../adapters/Tempdata'

export const TIDES = (props) => {

  const { data } = props

  const tableDays = 7;
  var dates = ["", "", "", "", "", "", "", "" ]
  var dates2 = ["", "", "", "", "", "", "", "" ]

  // date
  // data[n].periods[0].dateTimeISO.slice(0,10)
  // time
  // data[n].periods[0].dateTimeISO.match(/T(\S+)-/)[1]

  function periods_to_days(n) {

    var days = undefined
    var days2 = undefined

    // if that specific location returns no data
    if ( data[n] === undefined )
      { data[n] = Temptidedata.response[0] }

    var station_periods = data[n].periods

    days = [ [ station_periods[0] ], [], [], [], [], [], [] ]
    days2 = [ [], [], [], [], [], [], [] ]

    var index = 0

    for (let i = 1; i < station_periods.length; i++) {
      if ( station_periods[i].dateTimeISO.slice(0,10) !==
           station_periods[i-1].dateTimeISO.slice(0,10) )
           { index++ }
      const days2Index = index - tableDays;

      if (days[index]) {
        days[index].push(station_periods[i])
      } else if (days2[days2Index]) {
        days2[days2Index].push(station_periods[i])
      }
    }

    days.forEach((x, i) => {
      if (x[0]) {
        dates[i] = x[0].dateTimeISO.slice(5,10)
      }
    })
    days2.forEach((x, i) => {
      if (x[0]) {
        dates2[i] = x[0].dateTimeISO.slice(5,10)
      }
    })

    return { days, days2 }
  }

  const stations = [0,1,2,3,4,5,6,7,8].map(x => periods_to_days(x).days )
  const stations2 = [0,1,2,3,4,5,6,7,8].map(x => periods_to_days(x).days2 )

  function location_top(x, secondTable) {

    const names = [ "1. College Point (Flushing Bay)",
                    "2. 91st East River (Horns)",
                    "3. 59th St. (Queensboro)",
                    "4. Gowanus Canal",
                    "5. The Battery",
                    "6. Great Kills",
                    "7. Lower Hudson Bay",
                    "8. Coney Island",
                    "9. Rockaway" ]

    const station_days = (secondTable ? stations2 : stations)[x]

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

  function location_bot(x, secondTable) {

    const station_days = (secondTable ? stations2 : stations)[x]

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

  function body(secondTable) {

    return (
      secondTable
       ? (
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
       ) : (
          <Table.Body>
          { location_top(0, true) }
          { location_bot(0, true) }
          { location_top(1, true) }
          { location_bot(1, true) }
          { location_top(2, true) }
          { location_bot(2, true) }
          { location_top(3, true) }
          { location_bot(3, true) }
          { location_top(4, true) }
          { location_bot(4, true) }
          { location_top(5, true) }
          { location_bot(5, true) }
          { location_top(6, true) }
          { location_bot(6, true) }
          { location_top(7, true) }
          { location_bot(7, true) }
          { location_top(8, true) }
          { location_bot(8, true) }
        </Table.Body>
       )
    )
  }

  // returns

  if ( data[0].loc !== undefined) {

    return (
      <div>
        <br />
        <h5>This Week</h5>        
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}><h4>Location</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Sun</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[0]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Mon</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[1]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Tue</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[2]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Wed</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[3]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Thu</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[4]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Fri</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[5]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Sat</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates[6]}</h4></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          { body() }

        </Table>
        <br />
        <h5>Next Week</h5>
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}><h4>Location</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Sun</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[0]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Mon</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[1]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Tue</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[2]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Wed</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[3]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Thu</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[4]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Fri</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[5]}</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>Sat</h4></Table.HeaderCell>
              <Table.HeaderCell><h4>{dates2[6]}</h4></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          { body(true) }

        </Table>
      </div>

    )

  } else {
    return <div><br />Data is curenlty offline, please try again in a few minutes.</div>
  }

}
