import React from 'react';
import { Loader, Icon } from 'semantic-ui-react';

export const Scrambler = (v) => {

  const map = {
    a: 'q', b: 'w', c: 'e', d: 'r', e: 't', f: 'y',
    g: 'u', h: 'i', i: 'o', j: 'p', k: 'a', l: 's',
    m: 'd', n: 'f', o: 'g', p: 'h', q: 'j', r: 'k',
    s: 'l', t: 'z', u: 'x', v: 'c', w: 'v', x: 'b',
    y: 'n', z: 'm',
    A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', F: 'Y',
    G: 'U', H: 'I', I: 'O', J: 'P', K: 'A', L: 'S',
    M: 'D', N: 'F', O: 'G', P: 'H', Q: 'J', R: 'K',
    S: 'L', T: 'Z', U: 'X', V: 'C', W: 'V', X: 'B',
    Y: 'N', Z: 'M',
    1: '2', 2: '3', 3: '4', 4: '5', 5: '6',
    6: '7', 7: '8', 8: '9', 9: '0', 0: '1'
  };

  var m = (u) => u.split("").map(x => map[x]).join(""), vm = m(v), vl = vm.length, vla = vl - (vl % 2 === 0 ? 0 : 1), s = ""; for (let i = 0; i < vla; i++) { i % 2 === 0 ? s += vm[i+1] : s += vm[i-1] }; if (vl % 2 === 1) { s+=vm[vl-1] }; return m(s);

}

export const DataLoadingMessage = (props) => {
  const { debug, type } = props; //todo: stopwatch, and <Progress value='' total='' progress='ratio' />
  var text;
  if (debug.lift || debug.limit_calls) {
    text = [ <h1 key="loading debug">Debug (temp lift data: {debug.lift ? "true" : "false"}, limit calls: {debug.limit_calls ? "true" : "false"}) is active for {type}</h1> ];
  } else {
    text = [
      <h1 key="loading 1">{type} data is loading or is currently offline.</h1>,
      <h1 key="loading 2">If this takes more than 20 seconds, please try again in a few minutes.</h1>,
      <h1 key="loading 3">If this problem persists, please contact Mike Merin.</h1>
    ];
  }
  return (
    <center>
      <br />
      <Loader active inline indeterminate size="massive" />
      <br />
      { text }
    </center>
  )
}

export const DataErrorMessage = (props) => {
  const { data, type } = props;
  return (
    <center>
      <br />
      <Icon name="warning sign" size="massive" color="red" />
      <br />
      <h1>
        There was an error loading this {type} page.<br />
        Please try again in a few minutes.< br/>
        If this problem persists, please contact Mike Merin.<br /><br />
        { data.error }
      </h1>
    </center>
  )
}

export const WeatherTypes = {
  'CL': '-',
  'FW': '-',
  'SC': '-',
  'BK': '-',
  'OV': '-',
  'A':	'Hail',
  'BD': 'Blowing dust',
  'BN': 'Blowing sand',
  'BR': 'Mist',
  'BS': 'Blowing snow',
  'BY': 'Blowing spray',
  'F': 'Fog',
  'FR': 'Frost',
  'H': 'Haze',
  'IC': 'Ice crystals',
  'IF': 'Ice fog',
  'IP': 'Sleet',
  'K': 'Smoke',
  'L': 'Drizzle',
  'R': 'Rain',
  'RW': 'Rain showers',
  'RS': 'Rain/snow mix',
  'SI': 'Snow/sleet mix',
  'WM': 'Wintry mix',
  'S': 'Snow',
  'SW': 'Snow showers',
  'T': 'Thunderstorms',
  'UP': 'Unknown precipitation',
  'VA': 'Volcanic ash',
  'WP': 'Waterspouts',
  'ZF': 'Freezing fog',
  'ZL': 'Freezing drizzle',
  'ZR': 'Freezing rain',
  'ZY': 'Freezing spray',
}
