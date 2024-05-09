import { scramble } from '../components/utils';

import { Tempdata, Temptidedata } from './Tempdata'

const U = scramble('vrpmrspq');
const URL = `https://api.${U}.com/`;
const forecast_parameters = "&from=today&to=+8days&filter=daynight&limit=11"
const graph_parameters = "&from=-3hours&filter=3hr&limit=48"
const tide_parameters = "&from=sunday&to=+14days&filter=highlow"

const generateIdSecretQuery = (clientId, clientSecret, parameters) => `?client_id=${clientId}&client_secret=${clientSecret}${parameters || ''}`;

const generateLiftURLs = (clientId, clientSecret) => {

  const LIFT_URL = URL + "forecasts/40.78,-73.88" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const LILIFT_URL = URL + "forecasts/40.79,-73.10" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const MNR2_URL = URL + "forecasts/41.06,-73.70" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const MNR3_URL = URL + "forecasts/41.50,-74.10" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const MNR4_URL = URL + "forecasts/41.51,-74.27" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const MNR5_URL = URL + "forecasts/41.16,-73.13" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);
  const KNH_URL = URL + "forecasts/42.93,-72.28" + generateIdSecretQuery(clientId, clientSecret, forecast_parameters);

  const LIFT_GRAPH = URL + "forecasts/40.78,-73.88" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const LILIFT_GRAPH = URL + "forecasts/40.79,-73.10" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const MNR2_GRAPH = URL + "forecasts/41.06,-73.70" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const MNR3_GRAPH = URL + "forecasts/41.50,-74.10" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const MNR4_GRAPH = URL + "forecasts/41.51,-74.27" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const MNR5_GRAPH = URL + "forecasts/41.16,-73.13" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);
  const KNH_GRAPH = URL + "forecasts/42.93,-72.28" + generateIdSecretQuery(clientId, clientSecret, graph_parameters);

  const TIDES1_URL = URL + "tides/flushing+bay,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES2_URL = URL + "tides/mill+rock,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES3_URL = URL + "tides/queensboro+bridge,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES4_URL = URL + "tides/gowanus+canal,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES5_URL = URL + "tides/the+battery,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES6_URL = URL + "tides/great+kills,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES7_URL = URL + "tides/fort+wadsworth,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES8_URL = URL + "tides/coney,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);
  const TIDES9_URL = URL + "tides/rockaway,ny" + generateIdSecretQuery(clientId, clientSecret, tide_parameters);

  return [
    LIFT_URL, LILIFT_URL, MNR2_URL, MNR3_URL, MNR4_URL, MNR5_URL, KNH_URL,
    LIFT_GRAPH, LILIFT_GRAPH, MNR2_GRAPH, MNR3_GRAPH, MNR4_GRAPH, MNR5_GRAPH, KNH_GRAPH,
    TIDES1_URL, TIDES2_URL, TIDES3_URL, TIDES4_URL, TIDES5_URL, TIDES6_URL, TIDES7_URL, TIDES8_URL, TIDES9_URL
  ];
};

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
