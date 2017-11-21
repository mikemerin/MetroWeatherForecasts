import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

export const Header = (props) => {

  const { data, current, handlePageChange } = props

  const location = [ "LIFT - NYC", "LILIFT - Islip NY",
       "MNR2 - White Plains NY", "MNR3 - Beacon NY", "MNR4 - Chester NY", "MNR5 - Easton CT" ]

  var lat = 0
  var long = 0

  if (data.loc !== undefined) {
    lat = data.loc.lat
    long = data.loc.long
  }

  lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
  long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`

  const latlong = `Lat: ${ lat } - Long: ${ long }`

  return (
    <Menu color='blue' inverted fluid widths={2} size='huge' icon fixed='top' >

      <Menu.Item name='type' position='left' fitted='vertically' >{ location[current] } - { latlong }</Menu.Item>

      <Menu.Item name='links' position='right' fitted='vertically'>

        <Button compact active={current === 0} color='blue' onClick={ handlePageChange } >LIFT</Button>
        <Button compact active={current === 1} color='blue' onClick={ handlePageChange } >LILIFT</Button>
        <Button compact active={current === 2} color='blue' onClick={ handlePageChange } >MNR2</Button>
        <Button compact active={current === 3} color='blue' onClick={ handlePageChange } >MNR3</Button>
        <Button compact active={current === 4} color='blue' onClick={ handlePageChange } >MNR4</Button>
        <Button compact active={current === 5} color='blue' onClick={ handlePageChange } >MNR5</Button>

      </Menu.Item>

    </Menu>
  )

}
