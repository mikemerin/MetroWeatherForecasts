import React, { Component } from 'react';
import { Button, Loader } from 'semantic-ui-react';

import { LIFTs } from '../components/LIFTs';
import { TIDES } from '../components/TIDES';
import { CUSTOM } from '../components/CUSTOM';

export default class FormContainer extends Component {

  loader = (type) => {
    return <center><br /><Loader active inline>{type} data is loading or is currently offline.<br />If this takes more than 10 seconds, please try again in a few minutes.</Loader></center>;
  }

  render() {

    const { data, current, season, tides, handleTides } = this.props;

    if ( current < 6 ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 ) {
        return <LIFTs data={ data[current] } graph_data={ data[current + 6] } current={ current } season={ season }/>
      } else {
        return this.loader('Lift');
      }
    } else if ( current === 6 ) {
      if ( data[12].loc !== undefined && data[12].loc.lat !== 0 ) {
        if (tides) {
          return <TIDES data={ data.slice(12) } current={ current } />;
        } else {
          return this.loader('Tide');
        }
      // } else if (tides) {
      //   return this.loader('Tide'); //todo, is this needed?
      } else {
        return <center><br /><Button onClick={ handleTides }>Click to load tide data</Button></center>;
      }
    } else {
      return <CUSTOM season={ season }/>
    }

  }

}
