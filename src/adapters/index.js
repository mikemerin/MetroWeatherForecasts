import { Scrambler } from '../components/Common';

const locs = [
  {'name': 'LIFT', 'loc': '40.78,-73.88'},
  {'name': 'LILIFT', 'loc': '40.79,-73.10'},
  {'name': 'MNR2', 'loc': '41.06,-73.70'},
  {'name': 'MNR3', 'loc': '41.50,-74.10'},
  {'name': 'MNR4', 'loc': '41.51,-74.27'},
  {'name': 'MNR5', 'loc': '41.16,-73.13'}
];

const tides = [
  {'name': 'College Point (Flushing Bay)', 'loc': 'flushing+bay,ny'},
  {'name': '91st East River (Horns)', 'loc': 'mill+rock,ny'},
  {'name': '59th St. (Queensboro)', 'loc': 'queensboro+bridge,ny'},
  {'name': 'Gowanus Canal', 'loc': 'gowanus+canal,ny'},
  {'name': 'The Battery', 'loc': 'the+battery,ny'},
  {'name': 'Great Kills', 'loc': 'great+kills,ny'},
  {'name': 'Lower Hudson Bay', 'loc': 'fort+wadsworth,ny'},
  {'name': 'Coney Island', 'loc': 'coney,ny'},
  {'name': 'Rockaway', 'loc': 'rockaway,ny'}
];

const lifts = [];

['forecast', 'graph'].forEach(param => {
  locs.forEach(loc => {
      lifts.push(generate_URL(param, loc['loc']));
  })
});

tides.forEach(loc => {
  lifts.push(generate_URL('tide', loc['loc']));
})

function generate_URL(param, loc) {
  const id_secret = `?client_id=${Scrambler('G6ˆQzGrexçXNuP:/CZYmpø6LW1')}&client_secret=${Scrambler('wfH.C2mw/dwLjaDMHBIøåvXMc0wvAk.CQMX∑ßWdLJV©∆kOmpl')}`;
  const URL = "https://api." + Scrambler('vçßrp®.mµrœ¥s∆øpq') + ".com/";

  const URLs = {
    'forecast': { 'prefix': 'forecasts', 'query': '&from=today&to=+5days&filter=daynight&limit=9' },
    'graph': { 'prefix': 'forecasts', 'query': '&from=-3hours&filter=3hr&limit=48' },
    'tide': { 'prefix': 'tides', 'query': '&from=sunday&to=+7days&filter=highlow' }
  };

  return `${URL}${URLs[param]['prefix']}/${loc}${id_secret}${URLs[param]['query']}`;
}

export class ForecastAdapter {

  static all(n) {
    return Promise.all(n.map((url, i) =>
      fetch(lifts[url]).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong with call ' + lifts[n]);
        }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease wait a few minutes and try again.\n\nIf this problem persists please contact Mike Merin.");
        return "Error found: " + error;
      }).then(res => {
        return res.success ? res.response[0] : { fail_data: true, error: res };
      })
    ))
  }

  static custom(loc) {
    var custom_url = generate_URL('forecast', loc);
    return fetch(custom_url)
      .then( res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong with call ' + custom_url);
        }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease try again shortly.\n\nIf this problem persists please contact Mike Merin.")
        // return n > 12 ? FailTideData : FailData
      })
  }

}



// return lifts.map(lift => fetch(lift).then( res => res.json() ) )
