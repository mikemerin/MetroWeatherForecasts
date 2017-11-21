import React from 'react'
import { Table } from 'semantic-ui-react'

export const LIFTs = (props) => {

  const { lift, lilift, mnr2, mnr3, mnr4, mnr5 } = props.data

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
          { cells('weatherPrimary') }
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
          <Table.Cell>1ST 2in OF SNOW BY</Table.Cell>
          <Table.Cell colSpan={2}> </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Day 4</Table.Cell>
          <Table.Cell colSpan={2}>{ day4.weather }, { day4.maxTempF }ºF</Table.Cell>
          <Table.Cell>Day 5</Table.Cell>
          <Table.Cell colSpan={2}>{ day5.weather }, { day5.maxTempF }ºF</Table.Cell>
        </Table.Row>

      </Table.Body>
    )
  }

    // rh: {day1.minHumidity}-{day1.maxHumidity}%


    // <Grid celled columns={ 7} textAlign ="center" verticalAlign="middle">
    //   <Grid.Row>
    //       { [0, 1, 2, 3, 4, 5, 6].map(x => output(x) ) }
    //   </Grid.Row>
    // </Grid>

    var lat = 0
    var long = 0

    if (lift.length > 0) {
      lat = lift.loc.lat
      long = lift.loc.long
      lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
      long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`
    }

    const latlong = `Lat: ${ lat } Long: ${ long }`

    if ( lift.loc !== undefined) {
      return (
        <div>
          <div className="center">NYC Forecast - {latlong}</div>
          Day 1: { lift.periods[0].weather }
          <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>  </Table.HeaderCell>
                <Table.HeaderCell><h4>Day 1 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>Day 1 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>Day 2 6A-6P</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>Day 2 6P-6A</h4></Table.HeaderCell>
                <Table.HeaderCell><h4>Day 3 6A-6P</h4></Table.HeaderCell>
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
