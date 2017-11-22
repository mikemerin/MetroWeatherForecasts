import React, { Component } from 'react'

import { LIFTs } from '../components/LIFTs'
import { TIDES } from '../components/TIDES'

export default class FormContainer extends Component {

  render() {

    const { data, current } = this.props

    if ( current !== 6 ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 )
        { return <LIFTs data={ data[current] } current={ current }/> }
      else
        { return <div><center><br />Lift data is curenlty offline, please try again in a few minutes.</center></div> }
    } else {
      if ( data[6].loc !== undefined && data[6].loc.lat !== 0 )
        { return <TIDES data={ data.slice(6) } current={ current }/> }
      else
        { return <div><center><br />Tide data is curenlty offline, please try again in a few minutes.</center></div> }
    }

  }

}
