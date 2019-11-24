import { Component } from 'react';
import { Scrambler } from '../components/Common';

const lifts = [ //todo: move this to app
  {name: 'LIFT',    lat: '40.78',   long: '-73.88'},
  {name: 'LILIFT',  lat: '40.79',   long: '-73.10'},
  {name: 'MNR2',    lat: '41.06',   long: '-73.70'},
  {name: 'MNR3',    lat: '41.50',   long: '-74.10'},
  {name: 'MNR4',    lat: '41.51',   long: '-74.27'},
  {name: 'MNR5',    lat: '41.16',   long: '-73.13'}
];

const tides = [ //todo: move this to app
  {name: 'College Point (Flushing Bay)',  loc: 'flushing+bay,ny'},
  {name: '91st East River (Horns)',       loc: 'mill+rock,ny'},
  {name: '59th St. (Queensboro)',         loc: 'queensboro+bridge,ny'},
  {name: 'Gowanus Canal',                 loc: 'gowanus+canal,ny'},
  {name: 'The Battery',                   loc: 'the+battery,ny'},
  {name: 'Great Kills',                   loc: 'great+kills,ny'},
  {name: 'Lower Hudson Bay',              loc: 'fort+wadsworth,ny'},
  {name: 'Coney Island',                  loc: 'coney,ny'},
  {name: 'Rockaway',                      loc: 'rockaway,ny'}
];

const calls = [];

['forecast', 'graph'].forEach(param => {
  lifts.forEach(lift => {
      const loc = lift.lat + "," + lift.long;
      calls.push( generate_URL(param, loc) );
  })
});

tides.forEach(tide => {
  calls.push( generate_URL('tide', tide.loc) );
})

function generate_URL(param, loc) {
  const id_secret = `?client_id=${Scrambler('G6ˆQzGrexçXNuP:/CZYmpø6LW1')}&client_secret=${Scrambler('wfH.C2mw/dwLjaDMHBIøåvXMc0wvAk.CQMX∑ßWdLJV©∆kOmpl')}`;
  const URL = "https://api." + Scrambler('vçßrp®.mµrœ¥s∆øpq') + ".com/";

  const URLs = {
    'forecast': { 'prefix': 'forecasts', 'query': '&from=today&to=+5days&filter=daynight&limit=9' },
    'graph': { 'prefix': 'forecasts', 'query': '&from=-1hours&filter=1hr&limit=144' },
    'tide': { 'prefix': 'tides', 'query': '&from=sunday&to=+7days&filter=highlow' }
  };
  // console.log(`${URL}${URLs[param]['prefix']}/${loc}${id_secret}${URLs[param]['query']}`)
  return `${URL}${URLs[param]['prefix']}/${loc}${id_secret}${URLs[param]['query']}`;
}


class Helpers extends Component {

  constructor() {
    super();
    this.state = {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  }

  add_day_data = (period, index) => {
    const day_of_week = this.state.days[ new Date( period.dateTimeISO ).getDay() ];
    const short = day_of_week.slice(0,3);
    const short_upper = short.toUpperCase();
    var text_forecast = day_of_week;
    var table_forecast = short_upper + ". 6A-6P";

    if (period.isDay) {
      if (index === 0) text_forecast = "Today";
      if (index === 1) text_forecast = "Tonight";
    } else {
      text_forecast = (index < 2 ? "Tonight" : short + ". Night");
      table_forecast = short_upper + ". NIGHT 6P-6A";
    }

    const day_data = {
      day_of_week: day_of_week,
      short: short,
      short_upper: short_upper,
      text_forecast: text_forecast,
      table_forecast: table_forecast
    }

    console.log(day_data);
    return day_data;
  }

}

const helpers = new Helpers();

export class ForecastAdapter {

  static all(n) {
    return Promise.all(n.map((url, i) =>
      fetch(calls[url]).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong with call ' + calls[n]);
        }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease wait a few minutes and try again.\n\nIf this problem persists please contact Mike Merin.");
        return "Error found: " + error;
      }).then(res => {
        if (res.success) {
          res.response[0].periods.forEach((period, index) => {
            res.response[0].periods[index]["day"] = helpers.add_day_data(period, index);
          })
          return res.response[0];
        } else {
          return { fail_data: true, error: res };
        }
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
        return "Error found: " + error;
      })
  }

}
