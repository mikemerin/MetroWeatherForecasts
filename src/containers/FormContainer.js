import React, { Component } from 'react'

import { LIFTs } from '../components/LIFTs'
import { TIDES } from '../components/TIDES'
import { CUSTOM } from '../components/CUSTOM'

const tideCount = 7;

export default class FormContainer extends Component {

  render() {

    const { data, current, season } = this.props

    if ( current < tideCount ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 )
        { return <LIFTs data={ data[current] } graph_data={ data[current + tideCount] } current={ current } season={ season }/> }
      else
        { return <div><center><br />Lift data is curenlty offline, please try again in a few minutes.</center></div> }
    } else if ( current === tideCount ) {
      if ( data[tideCount * 2].loc !== undefined && data[tideCount * 2].loc.lat !== 0 )
        { return <TIDES data={ data.slice(tideCount * 2) } current={ current } /> }
      else
        { return <div><center><br />Tide data is curenlty offline, please try again in a few minutes.</center></div> }
    } else {
      return <CUSTOM season={ season }/>
    }

  }

}
