import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './App.css'

import { ForecastAdapter } from './adapters'

import { Header, Info } from './components/Header'
import FormContainer from './containers/FormContainer'

var month = (new Date()).getMonth()
var season = month <= 3 || month >= 10 ? "winter" : "normal"

const getQueryParam = (param) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === param) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      clientId: '',
      clientSecret: '',
      current: 0,
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      debug: false,
      fetching: false,
      forecastAdapter: undefined,
      season: season,
    }
  }

  componentDidMount() {
    console.log("mounting");
    const clientId = getQueryParam('clientId');
    const clientSecret = getQueryParam('clientSecret');
    if (clientId || clientSecret) {
      this.setState({ clientId, clientSecret });
    }
    if (clientId && clientSecret) {
      this.setState({ fetching: true });
      setTimeout(() => {
        this.setState({ fetching: false })
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.state.clientId && this.state.clientSecret) {
      if (!this.state.forecastAdapter) {
        const forecastAdapter = new ForecastAdapter(this.state.clientId, this.state.clientSecret);
        this.setState({ forecastAdapter });
      } else {
        if (!Object.keys(this.state.data[0]).length) {
          if (this.state.debug) {
            // for debugging main or LIFT pages, does 4 calls instead of 21
            for (let x = 0; x < 2; x++) {
              this.state.forecastAdapter.all(x).then(data => {
                const response = data.response[0]
                var current_data = this.state.data
                current_data[x] = response
                this.setState({ data: current_data })
              })
            }
            for (let x = 7; x < 9; x++) {
              this.state.forecastAdapter.all(x).then(data => {
                const response = data.response[0]
                var current_data = this.state.data
                current_data[x] = response
                this.setState({ data: current_data })
              })
            }
          } else {
            for (let x = 0; x < 23; x++) {
              this.state.forecastAdapter.all(x).then(data => {
                const response = data.response[0]
                var current_data = this.state.data
                current_data[x] = response
                this.setState({ data: current_data })
              })
            }
          }
        }
      }
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    const clientId = event.currentTarget.elements[0].value;
    const clientSecret = event.currentTarget.elements[1].value;
    history.pushState({}, '', `?clientId=${clientId}&clientSecret=${clientSecret}`);
    this.setState({ clientId, clientSecret, fetching: true });
    setTimeout(() => {
      this.setState({ fetching: false })
    }, 1000);
  }

  handlePageChange = (event, result) => {
    event.preventDefault()
    const current = { "LIFT": 0, "LI": 1, "M2": 2, "M3": 3, "M4": 4, "M5": 5, "NH": 6, "TIDES": 7, "CUSTOM": 8 }
    this.setState({ current: current[result.children] })
  }

  handleSeasonChange = (event, result) => {
    event.preventDefault();
    this.setState({ season: result.value });
  }

  renderForm = (noData = false) => (
    <form style={{ padding: '10px' }} onSubmit={this.handleLogin}>
      <label>Username (ID)</label>
      <br />
      <input name='clientId' defaultValue={this.state.clientId} />
      <br /><br />
      <label>Password (Secret)</label>
      <br />
      <input name='clientSecret' defaultValue={this.state.clientSecret} />
      <br /><br />
      <button type='submit'>Submit</button>
      {
        noData && (
          <div style={{ color: 'red' }}>
            <br /><br />
            No data is curenlty available.
            <br />
            This user/pass may have expired.
            <br />
            Otherwise, please try again in a few minutes.
          </div>
        )
      }
    </form>
  );

  renderGrid = () => {
    const { clientId, clientSecret, data, current, season } = this.state;
    return (
      <>
        <Header current={current} season={season}
          handlePageChange={this.handlePageChange}
          handleSeasonChange={this.handleSeasonChange}
        />
        <Grid>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={14}>
            <Grid.Row>
              <Info data={data[current]} current={current} />
            </Grid.Row>
            <Grid.Row>
              <FormContainer
                clientId={clientId}
                clientSecret={clientSecret}
                current={current}
                data={data}
                season={season}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid>
      </>
    );
  };

  render() {
    const { data, clientId, clientSecret, fetching, forecastAdapter } = this.state;

    return (
      fetching
        ? <>Fetching data, please wait...</>
        : (!clientId || !clientSecret)
          ? this.renderForm()
          : (Object.keys(data[0]).length)
            ? this.renderGrid()
            : this.renderForm(true)
    );
  }
}
