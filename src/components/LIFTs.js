import React from 'react'
import { Table } from 'semantic-ui-react'

export const LIFTs = (props) => {

  // debugger

  // const { days, scale } = props
  //
  // function output(day) {
  //
  //   if (!!days) {
  //     const date = days[day].dateTimeISO.match(/(.+)T/)[1]
  //
  //     const minTempF = days[day].minTempF
  //     const minTempC = days[day].minTempC
  //     const avgTempF = days[day].avgTempF
  //     const avgTempC = days[day].avgTempC
  //     const maxTempF = days[day].maxTempF
  //     const maxTempC = days[day].maxTempC
  //
  //     const minTemp = scale === "F" ? `${ minTempF }ºF` : `${ minTempC }ºC`
  //     const avgTemp = scale === "F" ? `${ avgTempF }ºF` : `${ avgTempC }ºC`
  //     const maxTemp = scale === "F" ? `${ maxTempF }ºF` : `${ maxTempC }ºC`
  //
  //     const icon = require(`../icons/${days[day].icon}`)
  //
  //     return (
  //       <Grid.Column key={day} >
  //         <strong>{ date }</strong><br /><br />
  //         <img className='image' alt={ `${days[day].icon}`.match(/(.+)\./)[1] } src={ icon } /><br /><br />
  //         Low: { maxTemp }<br />
  //         Avg: { avgTemp }<br />
  //         High: { minTemp }<br />
  //       </Grid.Column>
  //     )
  //   }

  // }

  function body() {

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell><h3>Temperature</h3></Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell>4</Table.Cell>
          <Table.Cell>5</Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }


    // <Grid celled columns={7} textAlign="center" verticalAlign="middle">
    //   <Grid.Row>
    //       { [0, 1, 2, 3, 4, 5, 6].map(x => output(x) ) }
    //   </Grid.Row>
    // </Grid>

    return (

      <Table celled color="blue" striped fixed compact="very" size="small" textAlign="center" >

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>  </Table.HeaderCell>
            <Table.HeaderCell><h4>Day 1 6A-6P</h4></Table.HeaderCell>
            <Table.HeaderCell><h4>Day 1 6P-6A</h4></Table.HeaderCell>
            <Table.HeaderCell><h4>Day 2 6A-6P</h4></Table.HeaderCell>
            <Table.HeaderCell><h4>Day 2 6P-6A</h4></Table.HeaderCell>
            <Table.HeaderCell><h4>Day 3 6A-6P</h4></Table.HeaderCell>
          </Table.Row>
        </Table.Header>


        <Table.Body>
          <Table.Row>
            <Table.Cell><h4>Temperature</h4></Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>5</Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table>

    )

  }
