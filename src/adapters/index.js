import { Tempdata, Temptidedata } from './Tempdata'

const id_secret = "?client_id=8XdPaXwzYWIbDTrF8iCL3&client_secret=ncTOr4kcLcjhRKVOeGRW2tecqJPTWRkCHLqErUli"

const URL = "https://api.aerisapi.com/"

const forecast_parameters = "&from=today&to=+5days&filter=daynight&limit=9"
const tide_parameters = "&from=sunday&to=+7days&filter=highlow"

const LIFT_URL   = URL + "forecasts/" + "40.78,-73.97" + id_secret + forecast_parameters
const LILIFT_URL = URL + "forecasts/" + "40.79,-71.10" + id_secret + forecast_parameters
const MNR2_URL   = URL + "forecasts/" + "41.06,-73.70" + id_secret + forecast_parameters
const MNR3_URL   = URL + "forecasts/" + "41.50,-74.10" + id_secret + forecast_parameters
const MNR4_URL   = URL + "forecasts/" + "41.51,-74.27" + id_secret + forecast_parameters
const MNR5_URL =   URL + "forecasts/" + "41.16,-73.13" + id_secret + forecast_parameters

const TIDES1_URL = URL + "tides/" + "flushing+bay,ny"       + id_secret + tide_parameters
const TIDES2_URL = URL + "tides/" + "8518668"               + id_secret + tide_parameters
const TIDES3_URL = URL + "tides/" + "queensboro+bridge,ny"  + id_secret + tide_parameters
const TIDES4_URL = URL + "tides/" + "gowanus+canal,ny"      + id_secret + tide_parameters
const TIDES5_URL = URL + "tides/" + "the+battery,ny"        + id_secret + tide_parameters
const TIDES6_URL = URL + "tides/" + "great+kills,ny"        + id_secret + tide_parameters
const TIDES7_URL = URL + "tides/" + "fort+wadsworth,ny"     + id_secret + tide_parameters
const TIDES8_URL = URL + "tides/" + "8517741"               + id_secret + tide_parameters
const TIDES9_URL = URL + "tides/" + "rockaway,ny"           + id_secret + tide_parameters

// const lifts = [LIFT_URL, LILIFT_URL, MNR2_URL, MNR3_URL, MNR4_URL, MNR5_URL,
              // TIDES1_URL, TIDES2_URL, TIDES3_URL, TIDES4_URL, TIDES5_URL, TIDES6_URL, TIDES7_URL, TIDES8_URL, TIDES9_URL ]
const lifts = ["", "", "", "", "", "",
              TIDES1_URL, TIDES2_URL, TIDES3_URL, TIDES4_URL, TIDES5_URL, TIDES6_URL, TIDES7_URL, TIDES8_URL, TIDES9_URL ]

export class ForecastAdapter {

  static all(n) {
    return fetch(lifts[n])
      .then( res => {
        if (res.ok)
      { return res.json() }
      else
        { throw new Error('Something went wrong') }
      }).catch((error) => {
        // alert("Sorry something went wrong and no run data was found.\n\nPlease try again shortly.\n\nIf this problem persists please contact Mike Merin.")
        return n > 6 ? Temptidedata : Tempdata
      })
  }

}



// return lifts.map(lift => fetch(lift).then( res => res.json() ) )
