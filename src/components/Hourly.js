import React from 'react';
import  { Table } from 'semantic-ui-react';
import { WeatherTypes as weather_types } from './Common';

export const Hourly = (props) => {

  const { graph_data, units } = props; //todo: add season, change graph_data to just data
  const { temperature, precip, snow, speed } = units;
  const FC = temperature[1];

  const columns = [
    { 'name': 'Time',                   'field': 'time' },
    { 'name': 'Weather',                'field': 'weatherPrimary'},
    { 'name': 'Precip',                 'field': 'weatherType'},
    { 'name': `Temps (${temperature})`, 'field': 'temp' + FC },
    { 'name': '% Precip',               'field': 'pop' },
    { 'name': `Liquid (${precip})`,     'field': 'precip' + precip },
    { 'name': `Snow (${snow})`,         'field': 'snow' + snow },
    { 'name': `Winds (${speed})`,       'field': 'winds' }
  ];

  var table_header = [];
  columns.forEach(column => {
    table_header.push( <Table.Cell key={"table_forecast_" + column.name}><h4>{ column.name }</h4></Table.Cell> );
  })

  var table_body = [];

  graph_data.periods.slice(0,36).forEach(period => {
    const date = new Date(period.dateTimeISO);
    const hour = (date.getHours() % 12 || 12) + (date.getHours() >= 12 ? "PM" : "AM");
    const time = date.getMonth()+1 + '/' + date.getDate() + ' - ' + hour;
    var row = []

    columns.forEach(column => {
      var text;
      switch(column.field) {
        case 'time':
          text = time;
          break;
        case 'weatherType':
          text = weather_types[ period['weatherPrimaryCoded'].split(":")[2]];
          break;
        case 'winds':
          text = period['windSpeed' + speed] + ' ' + period.windDir;
          break;
        default:
          text = period[column.field];
          break;
      }
      row.push( <Table.Cell key={period.timestamp + '_' + column.field}>{text}</Table.Cell>);
    })
    table_body.push(
      <Table.Row key={period.timestamp + '_row' } >
        { row }
      </Table.Row>
    )
  })

  return (
    <Table celled color="blue" structured striped fixed compact="very" size="small" textAlign="center" >
      <Table.Header>
        <Table.Row>
          { table_header }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { table_body }
      </Table.Body>
    </Table>
  );

}
