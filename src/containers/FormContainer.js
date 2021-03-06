import React from 'react';
import { Button } from 'semantic-ui-react';

import { LIFTs } from '../components/LIFTs';
import { TIDES } from '../components/TIDES';
import { CUSTOM } from '../components/CUSTOM';

import { DataLoadingMessage, DataErrorMessage } from '../components/Common';

export const FormContainer = (props) => {

  const { debug, data, datatype, forecast_days, current, season, lifts, tides, handleTides, units } = props;

  var output = '';

  if ( current < 6 ) {
    switch(lifts) {
      case 0:
        output = <DataLoadingMessage debug={ debug } type='Lift' />;
        break;
      case 1:
        if ( data[current].loc !== undefined && data[current].loc.lat !== 0 ) {
          output = <LIFTs debug={ debug } data={ data[current] } graph_data={ data[current + 6] } season={ season } datatype={ datatype } units={ units }/>
        } else if (data[current].fail_data) {
          output = <DataErrorMessage type='Lift' data={ data[current] } />;
        // } else if (debug === 2 || debug === 3) {
        } else if (debug.debug_lift || debug.limit_calls) {
          output = <DataLoadingMessage debug={ debug } type='Lift' />;
        }
        break;
      default: output = `no info found (debug: lifts = ${lifts})`; break;
    }
  } else if ( current === 6 ) {
    switch(tides) {
      case 0:
        output = <center><br /><Button onClick={ handleTides }>Click to load tide data</Button></center>;
        break;
      case 1:
        output = <DataLoadingMessage debug={ debug } type='Tide' />;
        break;
      case 2:
        output = <TIDES debug={ debug } data={ data.slice(12) } current={ current } units={ units } />;
        break;
      default: output = `no info found (debug: tides = ${tides})`; break;
    }
  } else if (current < 8) {
    return <CUSTOM debug={ debug } season={ season } units={ units } forecast_days={ forecast_days }/>
  } else {
    return <DataErrorMessage type='Current' data={ current } />;
  }

  return output;

}

export default FormContainer;
