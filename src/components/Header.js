import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

export const Header = (props) => {

  const data = props.data

  var lat = 0
  var long = 0

  if (data.loc !== undefined) {
    lat = data.loc.lat
    long = data.loc.long
  }

  lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`
  long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`
  const latlong = `Lat: ${ lat } Long: ${ long }`

  return (
    <Menu color='blue' inverted  fluid widths={3} size='huge' icon fixed='top' >

      <Menu.Item name='Metro Weather Forecasts' position='left' fitted='vertically' ></Menu.Item>

      <Menu.Item name='type' fitted='vertically' >NYC Forecast - {latlong}</Menu.Item>

      <Menu.Item name='links' position='right' fitted='vertically'>

        <Button compact color='blue' onClick={ props.handlePageChange } >LIFT</Button>
        <Button compact color='blue' onClick={ props.handlePageChange } >LILIFT</Button>
        <Button compact color='blue' onClick={ props.handlePageChange } >MNR2</Button>
        <Button compact color='blue' onClick={ props.handlePageChange } >MNR3</Button>
        <Button compact color='blue' onClick={ props.handlePageChange } >MNR4</Button>
        <Button compact color='blue' onClick={ props.handlePageChange } >MNR5</Button>

      </Menu.Item>

    </Menu>
  )

}
