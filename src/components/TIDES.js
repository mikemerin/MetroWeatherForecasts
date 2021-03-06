import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export class TIDES extends Component {

  constructor(props, context) {
    super();
    this.state = {
      all_station_data: this.format_station_data(props)
    }
  }

  format_station_data(props) {
    const stations = [ "1. College Point (Flushing Bay)",
                          "2. 91st East River (Horns)",
                          "3. 59th St. (Queensboro)",
                          "4. Gowanus Canal",
                          "5. The Battery",
                          "6. Great Kills",
                          "7. Lower Hudson Bay",
                          "8. Coney Island",
                          "9. Rockaway" ]; //todo: bring to props
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => ({ "name": day, "date": null }) );

    var all_station_data = { "days": days, "stations" : [] };

    props.data.forEach((station, station_index) => {
      var station_data = { "name": stations[station_index], "fail_data": station.fail_data };
      if (station !== undefined && !station.fail_data) {
        const station_periods = station.periods;
        var date_index = 0;

        for (let i = 0; i < station_periods.length; i++) {
          if (i > 0 && station_periods[i].dateTimeISO.slice(0,10) !== station_periods[i-1].dateTimeISO.slice(0,10) ) date_index++;

          const date = station_periods[i].dateTimeISO.slice(5,10);
          station_periods[i]["time"] = station_periods[i].dateTimeISO.slice(11,16);
          station_periods[i]["type"] = station_periods[i]["type"].toUpperCase();

          if (!station_data[ days[date_index]["date"] ]) {
            if (!days[date_index]["date"]) days[date_index]["date"] = date;
            station_data[ days[date_index]["date"] ] = [ station_periods[i] ];
          } else {
            station_data[ days[date_index]["date"] ].push(station_periods[i]);
          }
        }
      }

      all_station_data["stations"].push(station_data);
    })

    return all_station_data;
  }

  get_header() {
    const header_cells = this.state.all_station_data["days"].map((day,i) => {
      return ["name", "date"].map(cell_type => {
          return <Table.HeaderCell key={day[cell_type] + "_" + cell_type}><h4>{day[cell_type]}</h4></Table.HeaderCell>;
      })
    })

    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={2}><h4>Location</h4></Table.HeaderCell>
          { header_cells }
        </Table.Row>
      </Table.Header>
    )
  }

  get_body() {
    const body_cells = this.state.all_station_data.stations.map(station => {
      var station_rows = [ ];

      for (let row = 0; row < 4; row++) {
        let station_row = [];
        if (row === 0) station_row.push( <Table.Cell key={ station.name } colSpan={2} rowSpan={4} >{ station.name }</Table.Cell> );

        this.state.all_station_data.days.forEach((day, day_index) => {
          const day_info = (station.fail_data ? undefined : station[day["date"]][row]);
          const no_data = day_info === undefined;

          var key = (station.fail_data ? day_index : day["date"]) + "_type";
          var text = (no_data ? "-" : day_info["type"] + " " + day_info["time"]);
          station_row.push( <Table.Cell error={ station.fail_data } key={key}><h4>{ text }</h4></Table.Cell> );

          var units = (this.props.units.temperature === "ºF" ? { "name": "heightFT", "addon": " '"} : { "name": "heightM", "addon": " m"});
          key = (station.fail_data ? day_index : day["date"]) + "_height";
          text = (no_data ? "-" : (Math.round(day_info[units["name"]] * 100)/100) + units["addon"]);
          station_row.push( <Table.Cell error={ station.fail_data } key={key}><h4>{ text }</h4></Table.Cell> );

          // keeping above because I added in rounding of the tide heights which isn't done for time, can be refactored later but it's good enough for now. Old code below
        })

        station_rows.push( <Table.Row key={ station.name + "_" + row}>{station_row}</Table.Row> );
      }

      return station_rows;
    });

    return (
      <Table.Body>
        { body_cells }
      </Table.Body>
    )

  }

  render() {
    if (this.props.debug.render_logging) console.log(this.constructor.name + " rendering", this);

    return (
      <div>
        <br />
        <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
          { this.get_header() }
          { this.get_body() }
        </Table>
      </div>
    )
  }

}
