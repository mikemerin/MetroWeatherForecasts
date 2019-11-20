import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Graph } from './Graph';
import { WeatherTypes } from './Common';

export class LIFTs extends Component {

  constructor(props) {
    super();
    const { data, forecast_days, graph_data } = props; // todo: iffy data practice; it's better to store the constructed data and pass down the rest like season/units
    this.state = {
      graph_data: graph_data,
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      days: forecast_days, // todo: get rid of, use props directly
      WeatherTypes: WeatherTypes,
      periods: this.get_periods(data)
    }
  }

  get_periods = (data) => {
    const { periods } = data;
    // console.log(periods)
    // debugger
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // return {
    //   "day1": { day: "", periods: periods[0] },
    return {
      "day1": periods[0],
      "night1": periods[1],
      "day2": periods[2],
      "night2": periods[3],
      "day3": periods[4],
      "day4": periods[6],
      "day5": periods[8]
    }
  }

  body = () => {

    const { periods } = this.state;
    const { temperature, precip, speed, distance } = this.props.units;

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>TEMPS ({temperature})</Table.Cell>
          <Table.Cell>{ periods["day1"]["maxTemp" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["night1"]["minTemp" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["day2"]["maxTemp" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["night2"]["minTemp" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["day3"]["maxTemp" + temperature[1]] }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>FEELS LIKE ({temperature})</Table.Cell>
          <Table.Cell>{ periods["day1"]["maxFeelslike" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["night1"]["minFeelslike" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["day2"]["maxFeelslike" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["night2"]["minFeelslike" + temperature[1]] }</Table.Cell>
          <Table.Cell>{ periods["day3"]["maxFeelslike" + temperature[1]] }</Table.Cell>
        </Table.Row>
        { this.season_output('maxDewpoint' + temperature[1]) }
        <Table.Row>
          <Table.Cell>WIND DIR</Table.Cell>
          { this.cells('windDir') }
        </Table.Row>
        <Table.Row>
          <Table.Cell>SPEED ({speed})</Table.Cell>
          { this.cells_range('windSpeedMin' + speed, 'windSpeedMax' + speed) }
        </Table.Row>
        <Table.Row>
          <Table.Cell>GUSTS ({speed})</Table.Cell>
          { this.cells('windGust' + speed) }
        </Table.Row>
        <Table.Row>
          <Table.Cell>PRECIP</Table.Cell>
          { this.cells_wx_types() }
        </Table.Row>
        <Table.Row>
          <Table.Cell>PRECIP %</Table.Cell>
          { this.cells('pop') }
        </Table.Row>
        { this.season_output('THUNDER %') }
        <Table.Row>
          <Table.Cell>LIQUID ({precip})</Table.Cell>
          { this.cells('precip' + precip) }
        </Table.Row>
        { this.season_output('snow' + precip) }
        { this.season_output('CHANGEOVER') }
        <Table.Row>
          <Table.Cell>START</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>STOP</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>VISIBILITY ({distance})</Table.Cell>
          <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GROUND TEMP</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
          <Table.Cell>ADVISORIES</Table.Cell>
          <Table.Cell colSpan={2}>-</Table.Cell>
        </Table.Row>
        { this.season_output('bottom') }
        <Table.Row>
          <Table.Cell>{ this.state.weekdays[this.state.days[3]] }</Table.Cell>
          <Table.Cell colSpan={2}>{ periods["day4"].weather }, { periods["day4"]["maxTemp" + temperature[1]] + temperature}</Table.Cell>
          <Table.Cell>{ this.state.weekdays[this.state.days[4]] }</Table.Cell>
          <Table.Cell colSpan={2}>{ periods["day5"].weather }, { periods["day5"]["maxTemp" + temperature[1]] + temperature}</Table.Cell>
        </Table.Row>

      </Table.Body>
    )
  }

  season_output = (type) => {
    const { periods } = this.state;
    const { temperature, precip } = this.props.units;

    if ( this.props.season === "normal" ) {
      switch(type) {
        case "maxDewpointF":
          return (
            <Table.Row>
              <Table.Cell>DEWPOINT ({temperature})</Table.Cell>
              <Table.Cell>{ periods["day1"]["maxDewpoint" + temperature[1]] }</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>{ periods["day2"]["maxDewpoint" + temperature[1]] }</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>{ periods["day3"]["maxDewpoint" + temperature[1]] }</Table.Cell>
            </Table.Row>
          )
        case "THUNDER %":
          return (
            <Table.Row>
              <Table.Cell>THUNDER %</Table.Cell>
              <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
            </Table.Row>
          )
        case "bottom":
          return (
            <Table.Row>
              <Table.Cell>DAYTIME AVG HUMIDITY</Table.Cell>
              <Table.Cell colSpan={2}>{ periods["day1"].humidity }%</Table.Cell>
              <Table.Cell>DAYTIME UV INDEX</Table.Cell>
              <Table.Cell colSpan={2}>{ periods["day1"].uvi }</Table.Cell>
            </Table.Row>
          )
        default: break;
      }
    } else {
      switch(type) {
        case "snowIN":
          return (
            <Table.Row>
              <Table.Cell>SNOW (IN)</Table.Cell>
              { this.cells('snowIN') }
            </Table.Row>
          )
          case "CHANGEOVER":
            return (
              <Table.Row>
                <Table.Cell>CHANGEOVER</Table.Cell>
                <Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell><Table.Cell>-</Table.Cell>
              </Table.Row>
            )
          case "bottom":
            const first = (precip === "IN" ? "2'" : "5cm");
            return (
              <Table.Row>
                <Table.Cell>FORECAST CONFIDENCE</Table.Cell>
                <Table.Cell colSpan={2}>-</Table.Cell>
                <Table.Cell>1ST {first} OF SNOW BY</Table.Cell>
                <Table.Cell colSpan={2}>-</Table.Cell>
              </Table.Row>
            )
          default: break;
      }
    }
  }

  cells = (type) => {
    return Object.keys(this.state.periods).slice(0,5).map((period, i) => <Table.Cell key={i}>{ this.state.periods[period][type] }</Table.Cell> );
  }

  cells_range = (type1, type2) => {
    return Object.keys(this.state.periods).slice(0,5).map((period, i) => <Table.Cell key={i}>{ this.state.periods[period][type1] }-{ this.state.periods[period][type2] }</Table.Cell> );
  }

  cells_wx_types = () => {
    return Object.keys(this.state.periods).slice(0,5).map((period, i) => {
      return <Table.Cell key={i}>{ this.state.WeatherTypes[this.state.periods[period]['weatherPrimaryCoded'].split(":")[2]] }</Table.Cell>;
    });
  }

  get_top_text = () => {
    const top_text = this.props.data.periods.map((period, index) => {
      return <p key={"top_text_" + index}>{ period.day.text_forecast + ": " + period.weather }</p>;
    })
    return <div style={{"textAlign": "left"}}>{ top_text }</div>;
  }

  get_table_header = () => {
    var table_header = [<Table.Cell key="copy below"><h4>Copy below</h4></Table.Cell>];
    this.props.data.periods.slice(0,5).forEach((period, index) => {
      table_header.push(<Table.Cell key={"table_forecast_" + index}><h4>{ period.day.header_forecast }</h4></Table.Cell>);
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

  render() {
    const { debug, season, units } = this.props;
    const { days, weekdays, graph_data } = this.state;

    if (debug) console.log(this.constructor.name + " rendering", this);
    return (
      <>
        <br />
        { this.get_top_text() }
        { this.get_table_header() }

        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >

          { this.body() }

        </Table>
        <Graph graph_data={ graph_data } season={ season } units={ units }/>
      </>
    )
  }
}
