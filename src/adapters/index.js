const URL = "http://api.aerisapi.com/forecasts/"
const id_secret = "?client_id=8XdPaXwzYWIbDTrF8iCL3&client_secret=ncTOr4kcLcjhRKVOeGRW2tecqJPTWRkCHLqErUli"
const parameters = "&from=today&to=+5days&filter=daynight&limit=9"

const LIFT_URL = URL + "40.78,-73.97" + id_secret + parameters
const LILIFT_URL = URL + "40.79,-71.10" + id_secret + parameters
const MNR2_URL = URL + "41.06,-73.70" + id_secret + parameters
const MNR3_URL = URL + "41.50,-74.10" + id_secret + parameters
const MNR4_URL = URL + "41.51,-74.27" + id_secret + parameters
const MNR5_URL = URL + "41.16,-73.13" + id_secret + parameters

const lifts = [LIFT_URL, LILIFT_URL, MNR2_URL, MNR3_URL, MNR4_URL, MNR5_URL]

export class ForecastAdapter {

  static all(n) {
    return fetch(lifts[n])
      .then( res => res.json() )
  }

}



// return lifts.map(lift => fetch(lift).then( res => res.json() ) )
