import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

export const Header = (props) => {

  const { data, current, season, handlePageChange, handleSeasonChange } = props

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
    <Menu color='blue' inverted fluid widths={3} size='huge' icon fixed='top' >

      <Menu.Item name='type' position='left' fitted='vertically' >{ full_header }</Menu.Item>

      <Menu.Item name='type' fitted='vertically' >
        <Button compact active={season === "normal"} color='blue' value="normal" onClick={ handleSeasonChange } >Normal Form</Button>
        <Button compact active={season === "winter"} color='blue' value="winter" onClick={ handleSeasonChange } >Winter Form</Button>
      </Menu.Item>

      <Menu.Item name='links' position='right' fitted='vertically'>

        <Button compact active={current === 0} color='blue' onClick={ handlePageChange } >LIFT</Button>
        <Button compact active={current === 1} color='blue' onClick={ handlePageChange } >LI</Button>
        <Button compact active={current === 2} color='blue' onClick={ handlePageChange } >M2</Button>
        <Button compact active={current === 3} color='blue' onClick={ handlePageChange } >M3</Button>
        <Button compact active={current === 4} color='blue' onClick={ handlePageChange } >M4</Button>
        <Button compact active={current === 5} color='blue' onClick={ handlePageChange } >M5</Button>
        <Button compact active={current === 6} color='blue' onClick={ handlePageChange } >TIDES</Button>
        <Button compact active={current === 7} color='blue' onClick={ handlePageChange } >FREE</Button>

      </Menu.Item>

    </Menu>
  )

}
