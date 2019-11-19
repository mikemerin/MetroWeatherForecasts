import React from 'react'
import { Menu, Button, Icon, Segment } from 'semantic-ui-react'

export const Header = (props) => {

  const { debug, current, handlePageChange } = props;
  if (debug) console.log("Header rendering", props);

  var lift_buttons = ['LIFT', 'LI', 'M2', 'M3', 'M4', 'M5'].map((page, i) => {
    return <Button compact key={i} size='mini' active={current === i} color='blue' onClick={ handlePageChange } >{page}</Button>;
  });

  var other_buttons = ['TIDES', 'CUSTOM'].map((page, i) => {
    i += 6;
    return <Button compact key={i} size='mini' active={current === i} color='blue' onClick={ handlePageChange } >{page}</Button>;
  });

  return (
    <Menu color='blue' inverted fluid widths={1} size='mini' icon fixed='top' >

        <Menu.Item name='lift_links' fitted='vertically'>
          <Button.Group>{ lift_buttons }</Button.Group>
          <Button.Group>{ other_buttons }</Button.Group>
        </Menu.Item>

    </Menu>
  )

}

export const Info = (props) => {

  const { debug, data, current, season, handleSeasonChange, units, handleUnitChange } = props;
  if (debug) console.log("Info rendering", props);

  const option_buttons = () => {
    const season_buttons = [{'value': 'normal', 'icon': 'sun'}, {'value': 'winter', 'icon': 'snowflake outline'}].map(button => {
      const active = (season === button.value);
      return <Button icon circular compact size='mini' active={active} basic={!active} color='blue' key={button.value} value={button.value} onClick={ handleSeasonChange } ><Icon name={button.icon} /></Button>;
    })

    const unit_buttons = ['ºF', 'ºC'].map(temp => {
      const active = (units.temperature === temp);
      return <Button icon circular compact size='mini' active={active} basic={!active} color='blue' key={temp} value={temp} onClick={ handleUnitChange }>{temp}</Button>;
    })

    if (current === 6) {
      return (
        <Segment.Group horizontal>
        <Segment>{ unit_buttons }</Segment>
        </Segment.Group>
      )
    } else {
      return (
        <Segment.Group horizontal>
        <Segment>{ season_buttons }</Segment>
        <Segment>{ unit_buttons }</Segment>
        </Segment.Group>
      )
    }
  }

  const location = [
        "NYC", "Islip NY",
        "White Plains NY", "Beacon NY", "Chester NY", "Easton CT",
        "TIDES - NYC Area",
        "Custom Location"
      ]

  var lat = 0
  var long = 0

  if (data.loc !== undefined) {
    lat = data.loc.lat
    long = data.loc.long
  }

  lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
  long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`

  var latlong = `Lat: ${ lat } - Long: ${ long }`

  if ( current === 6 ) { latlong = "Various Locations" }
  if ( current === 7 ) { latlong = "Custom Lat/Long" }
  var full_header;
  if(current !== 7) {
    full_header = location[current] + " - " + latlong;
  } else {
    full_header = "Custom Location"
  }

  return (
    <center>
      <Segment.Group compact>
        { option_buttons() }
        <Segment color='blue' textAlign='center'>
          <h3>{ full_header }</h3>
        </Segment>
      </Segment.Group>
    </center>
  )

}
