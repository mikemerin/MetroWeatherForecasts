import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { LIFTs } from '../components/LIFTs';
import { TIDES } from '../components/TIDES';
import { CUSTOM } from '../components/CUSTOM';

import { DataLoadingMessage, DataErrorMessage } from '../components/Common';

export default class FormContainer extends Component {

  render() {

    const { data, current, season, tides, handleTides } = this.props;
    
    if ( current < 6 ) {
      if ( data[current].loc !== undefined && data[current].loc.lat !== 0 ) { // todo: if lifts
        return <LIFTs data={ data[current] } graph_data={ data[current + 6] } current={ current } season={ season }/>
      } else if (data[current].temp_data) {
        return <DataErrorMessage type='Lift' />;
      } else {
        return <DataLoadingMessage type='Lift' />;
      }
    } else if ( current === 6 ) {
      var output = '';
      switch(tides) {
        case 0:
          output = <center><br /><Button onClick={ handleTides }>Click to load tide data</Button></center>;
          break;
        case 1:
          output = <DataLoadingMessage type='Tide' />;
          break;
        case 2:
          output = <TIDES data={ data.slice(12) } current={ current } />;
          break;
        default: output = `no info found (debug: tides = ${tides})`; break;
      }
      return output;
    } else {
      return <CUSTOM season={ season }/>
    }

  }

}
