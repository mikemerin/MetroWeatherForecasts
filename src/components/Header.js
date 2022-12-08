import React from 'react'
import { Menu, Button, Icon, Segment } from 'semantic-ui-react'

export const Header = (props) => {

  const { current, season, handlePageChange, handleSeasonChange } = props

  var lift_buttons = ['LIFT', 'LI', 'M2', 'M3', 'M4', 'M5', 'NH'].map((page, i) => {
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
          <Button icon circular compact active={season === "normal"} color='blue' value="normal" onClick={ handleSeasonChange } ><Icon name='sun' /></Button>
          <Button icon circular compact active={season === "winter"} color='blue' value="winter" onClick={ handleSeasonChange } ><Icon name='snowflake outline' /></Button>
        </Menu.Item>

    </Menu>
  )

}

export const Info = (props) => {

  const { data, current } = props;

  const location = [
        "NYC", "Islip NY",
        "White Plains NY", "Beacon NY", "Chester NY", "Easton CT", "Keene, NH",
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

  if ( current === 7 ) { latlong = "Various Locations" }
  if ( current === 8 ) { latlong = "Custom Lat/Long" }
  var full_header;
  if(current !== 8) {
    full_header = location[current] + " - " + latlong;
  } else {
    full_header = "Custom Location"
  }

  return (
    <div>
      <center>
        <Segment compact color='blue' textAlign='center'>
          <h3>{ full_header }</h3>
        </Segment>
      </center>
    </div>
  )

}
