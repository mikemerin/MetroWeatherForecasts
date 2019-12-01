import React from 'react'
import { Menu, Button, Icon, Segment } from 'semantic-ui-react'

export const Header = (props) => {

  const { debug, current, handlePageChange } = props;
  if (debug.render_logging) console.log("Header rendering", props);

  var lift_buttons = ['LIFT', 'LI', 'M2', 'M3', 'M4', 'M5'].map((page, i) => {
    return <Button compact key={i} size='mini' active={current === i} color='blue' onClick={ handlePageChange } >{page}</Button>;
  });

  var other_buttons = ['TIDES', 'CUSTOM'].map((page, i) => {
    i += 6;
    return <Button compact key={i} size='mini' active={current === i} color='blue' onClick={ handlePageChange } >{page}</Button>;
  });

  return (
    <Menu color='blue' inverted fluid widths={1} size='mini' icon fixed='top' >

        <Menu.Item name='lift_links' fitted='vertically'>
          <Button.Group>{ lift_buttons }</Button.Group>
          <Button.Group>{ other_buttons }</Button.Group>
        </Menu.Item>

    </Menu>
  )

}

export const InfoBox = (props) => {

  const { debug, data, current, datatype, handleDatatypeChange, season, handleSeasonChange, units, handleUnitChange } = props;
  if (debug.render_logging) console.log("Info rendering", props);

  const option_buttons = () => {

    var season_buttons = current >= 6 ? "" : <Segment>{
      [{'value': 'normal', 'icon': 'sun'}, {'value': 'winter', 'icon': 'snowflake outline'}].map(button => {
        const active = (season === button.value);
        return <Button key={button.value} icon circular compact size='mini' active={active} basic={!active} color='blue' value={button.value} onClick={ handleSeasonChange } ><Icon name={button.icon} /></Button>;
      })
    }</Segment>;

    var datatype_buttons = current >= 6 ? "" : <Segment>{
      [{'value': 'table', 'icon': 'table'}, {'value': 'graph', 'icon': 'line graph'}, {'value': '24_hours', 'icon': 'align justify'}].map(button => {
        const active = (datatype === button.value);
        return <Button key={button.value} icon circular compact size='mini' active={active} basic={!active} color='blue' value={button.value} onClick={ handleDatatypeChange }><Icon name={button.icon} /></Button>;
      })
    }</Segment>

    const unit_buttons = current >= 6 ? "" : <Segment>{
      ['ºF', 'ºC'].map(temp => {
        const active = (units.temperature === temp);
        return <Button key={temp} icon circular compact size='mini' active={active} basic={!active} color='blue' value={temp} onClick={ handleUnitChange }>{temp}</Button>;
      })
    }</Segment>;

    return (
      <Segment.Group horizontal>
        { season_buttons }
        { datatype_buttons }
        { unit_buttons }
      </Segment.Group>
    )
  }

  const location = [
        "NYC", "Islip NY",
        "White Plains NY", "Beacon NY", "Chester NY", "Easton CT",
        "TIDES - NYC Area",
        "Custom Location"
      ];

  var full_header;

  if (current === 7) {
    full_header = "Custom Location";
  } else if (current === 6) {
    full_header = "Various Locations";
  } else {
    if (data.loc === undefined) {
      full_header = location[current];
    } else {
      var { lat, long } = data.loc;
      lat = lat > 0 ? `${lat}ºN` : `${Math.abs(lat)}ºS`;
      long = long > 0 ? `${long}ºE` : `${Math.abs(long)}ºW`;

      var latlong = `Lat: ${ lat } - Long: ${ long }`;
      full_header = location[current] + " - " + latlong;
    }
  }

  return (
    <div id="info_div">
      <Segment.Group compact id="info_box">
        { option_buttons() }
        <Segment color='blue' textAlign='center'>
          <h3>{ full_header }</h3>
        </Segment>
      </Segment.Group>
      <br /><br />
    </div>
  )

}
