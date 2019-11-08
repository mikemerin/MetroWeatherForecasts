import React, { Component } from 'react'

import { LIFTs } from '../components/LIFTs'
import { TIDES } from '../components/TIDES'
import { FREE } from '../components/FREE'

export default class FormContainer extends Component {

  render() {

    const { data, current, season } = this.props

    if ( current < 6 ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 )
        { return <LIFTs data={ data[current] } graph_data={ data[current + 6] } current={ current } season={ season }/> }
      else
        { return <div><center><br />Lift data is curenlty offline, please try again in a few minutes.</center></div> }
    } else if ( current === 6 ) {
      if ( data[12].loc !== undefined && data[12].loc.lat !== 0 )
        { return <TIDES data={ data.slice(12) } current={ current } /> }
      else
        { return <div><center><br />Tide data is curenlty offline, please try again in a few minutes.</center></div> }
    } else {
      return <FREE season={ season }/>
    }

  }

}
