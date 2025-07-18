import { scramble } from '../components/utils';

import { Tempdata, Temptidedata } from './Tempdata'

const U = scramble('vrpmrspq');
const URL = `https://api.${U}.com/`;
const forecast_parameters = "&from=today&to=+8days&filter=daynight&limit=11"
const graph_parameters = "&from=-3hours&filter=3hr&limit=48"
const tide_parameters = "&from=sunday&to=+14days&filter=highlow"

const generateIdSecretQuery = (clientId, clientSecret, parameters) => `?client_id=${clientId}&client_secret=${clientSecret}${parameters || ''}`;

const locMap = {
  LIFT: '40.78,-73.88',
  LILIFT: '40.79,-73.10',
  MNR2: '41.06,-73.70',
  MNR3: '41.50,-74.10',
  MNR4: '41.51,-74.27',
  MNR5: '41.16,-73.13',
  KNH: '42.93,-72.28',
}

export const URLmap = [
  { name: 'LIFT',           type: 'forecast',       loc: `forecasts/${locMap.LIFT}` },
  { name: 'LILIFT',         type: 'forecast',       loc: `forecasts/${locMap.LILIFT}` },
  { name: 'MNR2',           type: 'forecast',       loc: `forecasts/${locMap.MNR2}` },
  { name: 'MNR3',           type: 'forecast',       loc: `forecasts/${locMap.MNR3}` },
  { name: 'MNR4',           type: 'forecast',       loc: `forecasts/${locMap.MNR4}` },
  { name: 'MNR5',           type: 'forecast',       loc: `forecasts/${locMap.MNR5}` },
  { name: 'KNH',            type: 'forecast',       loc: `forecasts/${locMap.KNH}` },
  { name: 'LIFT',           type: 'graph',          loc: `forecasts/${locMap.LIFT}` },
  { name: 'LILIFT',         type: 'graph',          loc: `forecasts/${locMap.LILIFT}` },
  { name: 'MNR2',           type: 'graph',          loc: `forecasts/${locMap.MNR2}` },
  { name: 'MNR3',           type: 'graph',          loc: `forecasts/${locMap.MNR3}` },
  { name: 'MNR4',           type: 'graph',          loc: `forecasts/${locMap.MNR4}` },
  { name: 'MNR5',           type: 'graph',          loc: `forecasts/${locMap.MNR5}` },
  { name: 'KNH',            type: 'graph',          loc: `forecasts/${locMap.KNH}` },
  { name: 'Flushing',       type: 'tide',           loc: "tides/flushing+bay,ny" },
  { name: 'Mill Rock',      type: 'tide',           loc: "tides/mill+rock,ny" },
  { name: 'Queensboro',     type: 'tide',           loc: "tides/queensboro+bridge,ny" },
  { name: 'Gowanus Canal',  type: 'tide',           loc: "tides/gowanus+canal,ny" },
  { name: 'Battery',        type: 'tide',           loc: "tides/the+battery,ny" },
  { name: 'Great Kills',    type: 'tide',           loc: "tides/great+kills,ny" },
  { name: 'Fort Wadsworth', type: 'tide',           loc: "tides/fort+wadsworth,ny" },
  { name: 'Coney Island',   type: 'tide',           loc: "tides/brighton+beach,ny" },
  { name: 'Rockaway',       type: 'tide',           loc: "tides/rockaway,ny" },
];

const generateLiftURLs = (clientId, clientSecret) =>
  URLmap.map(({ loc, type }) => {
    const parameters =
      type === 'forecast' ? forecast_parameters
      : type === 'graph' ? graph_parameters
        : tide_parameters;
    return `${URL}${loc}${generateIdSecretQuery(clientId, clientSecret, parameters)}`;
  });

// const shift = str => str.slice(1) + str.slice(0,1);
// const clientId = shift('YXhtJlvX4EdRgoMLE6JkT');
// const clientSecret = shift('HpClSDVn1op9ERPH737J8luaeNWEugFXuRNNTpTm');

export class ForecastAdapter {

  constructor(clientId = 'testId', clientSecret = 'testSecret') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.lifts = generateLiftURLs(clientId, clientSecret);
  }

  all(n) {
    return fetch(this.lifts[n])
      .then(res => {
        if (res.status === 429) {
          return { error: 'Error 429: "Maximum number of daily accesses reached."'};
        };
        if (res.ok) { return res.json() }
        else { throw new Error('Something went wrong') }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease try again shortly.\n\nIf this problem persists please contact Mike Merin.")
        return n > 12 ? Temptidedata : Tempdata
      })
  }

  custom(loc) {
    var custom_url = URL + "forecasts/" + loc + generateIdSecretQuery(this.clientId, this.clientSecret, forecast_parameters);
    return fetch(custom_url)
      .then(res => {
        if (res.status === 429) {
          return { error: 'Error 429: "Maximum number of daily accesses reached."'};
        };
        if (res.ok) { return res.json() }
        else { throw new Error('Something went wrong') }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease try again shortly.\n\nIf this problem persists please contact Mike Merin.")
        // return n > 12 ? Temptidedata : Tempdata
      })
  }
}



// return lifts.map(lift => fetch(lift).then( res => res.json() ) )
