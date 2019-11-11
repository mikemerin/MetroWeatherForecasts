import React from 'react'
import { Grid, Menu, Button, Icon, Segment } from 'semantic-ui-react'

export const Header = (props) => {

  const { current, season, handlePageChange, handleSeasonChange } = props

  var page_buttons = ['LIFT', 'LI', 'M2', 'M3', 'M4', 'M5', 'TIDES', 'FREE'].map((page, i) => {
    return <Button compact key={i} size='mini' active={current === i} color='blue' onClick={ handlePageChange } >{page}</Button>;
  });


  return (
    <Menu color='blue' inverted fluid widths={1} size='huge' icon fixed='top' >

        <Menu.Item name='links' position='right' fitted='vertically'>
          <Button.Group>
            { page_buttons }
          </Button.Group>
            <Button icon circular compact active={season === "normal"} color='blue' value="normal" onClick={ handleSeasonChange } ><Icon name='sun' /></Button>
            <Button icon circular compact active={season === "winter"} color='blue' value="winter" onClick={ handleSeasonChange } ><Icon name='snowflake outline' /></Button>

        </Menu.Item>

    </Menu>
  )

}


export const Info = (props) => {

  const { data, current } = props;

  const location = [ "LIFT - NYC", "LILIFT - Islip NY",
       "MNR2 - White Plains NY", "MNR3 - Beacon NY", "MNR4 - Chester NY", "MNR5 - Easton CT", "TIDES - NYC Area",
        "Custom Location"]

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
    <div>
    <br />
      <center>
        <Segment compact color='blue' textAlign='center'>
          <h3>{ full_header }</h3>
        </Segment>
      </center>
    </div>
  )

}
