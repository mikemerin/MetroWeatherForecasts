import React, { Component } from 'react';
import { Button, Loader } from 'semantic-ui-react';

import { LIFTs } from '../components/LIFTs';
import { TIDES } from '../components/TIDES';
import { CUSTOM } from '../components/CUSTOM';

export default class FormContainer extends Component {

  render() {

    const { data, current, season, tides, handleTides } = this.props;

    if ( current < 6 ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 ) {
        return <LIFTs data={ data[current] } graph_data={ data[current + 6] } current={ current } season={ season }/>
      } else {
        return <div><center><br /><Loader active inline>Lift data is loading or is currently offline. If this takes more than 10 seconds, please try again in a few minutes.</Loader></center></div>
      }
    } else if ( current === 6 ) {
      if ( data[20].loc !== undefined && data[20].loc.lat !== 0 ) {
        if (tides) {
          return <TIDES data={ data.slice(12) } current={ current } />
        } else {
          return <div><center><br />Tide data is currently offline, please try again in a few minutes.</center></div>
        }
      } else if (tides) {
        return <center><br /><Loader active inline>Tide data is loading or is currently offline. If this takes more than 10 seconds, please try again in a few minutes.</Loader></center>;
      } else {
        return <center><br /><Button onClick={ handleTides }>Click to load tide data</Button></center>;
      }
    } else {
      return <CUSTOM season={ season }/>
    }

  }

}
