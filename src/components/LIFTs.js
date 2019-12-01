import React from 'react';
import { Table } from 'semantic-ui-react';
import { Graph } from './Graph';
import { Hourly } from './Hourly';
import { WeatherTypes as weather_types } from './Common';

export const LIFTs = (props) => {

  const { debug, data, datatype, graph_data, season, units } = props;
  const { periods } = data;
  const { temperature, precip, snow, speed, distance } = units;
  const FC = temperature[1];

  const get_top_text = () => {
    const top_text = props.data.periods.map((period, index) => {
      return <p key={"top_text_" + index}>{ period.day.text_forecast + ": " + period.weather }</p>;
    })
    return <div style={{"textAlign": "left"}}>{ top_text }</div>;
  }

  const get_table_header = () => {
    var table_header = [ <Table.Cell key="copy below"><h4>Copy below</h4></Table.Cell> ];
    periods.slice(0,5).forEach((period, index) => {
      table_header.push( <Table.Cell key={"table_forecast_" + index}><h4>{ period.day.table_forecast }</h4></Table.Cell> );
    })
    return (
      <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
        <Table.Header>
          <Table.Row>
            { table_header }
          </Table.Row>
        </Table.Header>
      </Table>
    );
  }

  const get_body = () => {
    const first = (precip === "IN" ? "2" : "5") + snow;
    const day4 = periods[0].isDay ? 6 : 5;
    const day5 = day4 + 2;
    var three_day_forecast = [];
    var extended_forecast = [];

    const three_day_forecast_rows = [
      { header: `TEMPS (${temperature})`,       name: "Temp",                 unit: FC,     type: "minmax" },
      { header: `FEELS LIKE (${temperature})`,  name: "Feelslike",            unit: FC,     type: "minmax" },
      { header: `DEWPOINT (${temperature})`,    name: "Dewpoint",             unit: FC,     type: "minmax",     season: "normal" },
      { header: `WIND DIR`,                     name: "windDir" },
      { header: `SPEED (${speed})`,             name: "windSpeed",            unit: speed,  type: "range" },
      { header: `GUSTS (${speed})`,             name: "windGust",             unit: speed },
      { header: `PRECIP`,                       name: "weatherPrimaryCoded",                type: "weatherType" },
      { header: `PRECIP %`,                     name: "pop" },
      { header: `THUNDER %`,                                                                type: "blank",      season: "normal" },
      { header: `LIQUID (${precip})`,           name: "precip",               unit: precip },
      { header: `SNOW (${snow})`,               name: "snow",                 unit: snow,                       season: "winter" },
      { header: `CHANGEOVER`,                                                               type: "blank",      season: "winter" },
      { header: `START`,                                                                    type: "blank" },
      { header: `STOP`,                                                                     type: "blank" },
      { header: `VISIBILITY (${distance})`,                                                 type: "blank" }
    ];

    const extended_forecast_rows = [
      { side: "L",  header: `GROUND TEMP (${temperature})`,                                 type: "blank" },
      { side: "R",  header: `ADVISORIES`,                                                   type: "blank" },
      { side: "L",  header: `AVG HUMIDITY (%)`,                 name: "humidity",                               season: "normal" },
      { side: "L",  header: `FORECAST CONFIDENCE`,                                          type: "blank",      season: "winter" },
      { side: "R",  header: `UV INDEX`,                         name: "uvi",                                    season: "normal" },
      { side: "R",  header: `1ST ${first} OF SNOW BY`,                                      type: "blank",      season: "winter" },
      { side: "L",  header: `${periods[day4].day.table_forecast}`, name: day4,   unit: FC,  type: "forecast"},
      { side: "R",  header: `${periods[day5].day.table_forecast}`, name: day5,   unit: FC,  type: "forecast"}
    ];

    three_day_forecast_rows.forEach(row => {
      if (!row.season || row.season === season) {
        var row_cells = [ <Table.Cell key={ row.header + " header" }>{ row.header }</Table.Cell> ];
        [0,1,2,3,4].forEach(period_index => {
          const period = periods[period_index];
          var text;
          switch(row.type) {
            case "minmax":      text = period[ (period.isDay ? "max" : "min") + row.name + row.unit ];                  break;
            case "range":       text = ["Min", "Max"].map(minmax => period[row.name + minmax + row.unit] ).join("-");   break;
            case "weatherType": text = weather_types[ period[row.name].split(":")[2]];                                  break;
            case "blank":       text = "-";                                                                             break;
            default:            text = period[ row.name + (row.unit ? row.unit : "") ];                                 break;
          }
          row_cells.push( <Table.Cell key={ period_index + ") " + row.header + " text" }>{ text }</Table.Cell> );
        })
        three_day_forecast.push( <Table.Row key={ row.header }>{ row_cells }</Table.Row> );
      }
    })

    var row_cells = [];

    extended_forecast_rows.forEach(row => {
      if (!row.season || row.season === season) {
        row_cells.push( <Table.Cell key={ row.header + " header" }>{ row.header }</Table.Cell> );

        var text;
        switch(row.type) {
          case "forecast":    text = periods[row.name]["weather"] + ", " + periods[row.name]["maxTemp" + row.unit] + "º" + row.unit;  break;
          case "blank":       text = "-";                                                                                             break;
          default:            text = periods[0][ row.name + (row.unit ? row.unit : "") ];                                             break;
        }
        row_cells.push( <Table.Cell key={ row.header + " text" } colSpan={2} >{ text }</Table.Cell> )

        if (row.side === "R") {
          extended_forecast.push( <Table.Row key={ row.header }>{ row_cells }</Table.Row> );
          row_cells = [];
        }
      }
    })

    return (
      <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
        <Table.Body>
          { three_day_forecast }
          { extended_forecast }
        </Table.Body>
      </Table>
    )
  }


  if (debug.render_logging) console.log("LIFTs rendering", props);

  if (datatype === "table") {
    return (
      <>
        <br />
        { get_top_text() }
        { get_table_header() }
        { get_body() }
      </>
    )
  } else if (datatype === "graph"){
    return (
      <>
        <br />
        <Graph graph_data={ graph_data } season={ season } units={ units } />
      </>
    )
  } else {
    return (
      <>
      <br />
        <Hourly graph_data={ graph_data } season={ season } units={ units } />
      </>
    )
  }
}
