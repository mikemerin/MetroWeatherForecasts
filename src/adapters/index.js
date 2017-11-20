const URL = "http://api.aerisapi.com/forecasts/"
const id_secret = "?client_id=8XdPaXwzYWIbDTrF8iCL3&client_secret=ncTOr4kcLcjhRKVOeGRW2tecqJPTWRkCHLqErUli"

const lift_url = URL + "40.78,-73.97" + id_secret


const lilift_url = URL + "40.79,-71.10" + id_secret


const mnr2_url = URL + "41.06,-73.70" + id_secret
const mnr3_url = URL + "41.50,-74.10" + id_secret
const mnr4_url = URL + "41.51,-74.27" + id_secret
const mnr5_url = URL + "41.16,-73.13" + id_secret


export class ForecastAdapter {

  static lift() {
    return fetch(lift_url)
      .then( res => res.json() )
  }
}
