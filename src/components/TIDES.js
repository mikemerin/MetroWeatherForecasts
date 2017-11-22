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



  function body() {

    // const tide1 = data.periods[0]
    // const night1 = data.periods[1]
    // const day2 = data.periods[2]
    // const night2 = data.periods[3]
    // const day3 = data.periods[4]
    // const day4 = data.periods[6]
    // const day5 = data.periods[8]
    //
    // const three_day = [day1, night1, day2, night2, day3]
    //
    // function cells(type) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type] }</Table.Cell> ) }
    // function cells_range(type1, type2) { return three_day.map((x, i) => <Table.Cell key={i}>{ x[type1] }-{ x[type2] }</Table.Cell> )}
    // function cells_wx_types() { return three_day.map((x, i) => <Table.Cell key={i}>{ weather_types[x['weatherPrimaryCoded'].split(":")[2]] }</Table.Cell> ) }



    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={2} rowSpan={4}>College Point (Flushing Bay)</Table.Cell>
          <Table.Cell>L</Table.Cell>
          <Table.Cell>Time</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>H</Table.Cell>
          <Table.Cell>Time</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>L</Table.Cell>
          <Table.Cell>Time</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>H</Table.Cell>
          <Table.Cell>Time</Table.Cell>
        </Table.Row>

      </Table.Body>
    )
  }

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
