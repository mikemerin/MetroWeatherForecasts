import React from 'react';
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

export const Graph = (props) => {
  // five lines are:
  // always: precip, temps,
  // summer only: feels_like
  // winter only: snow, freezing_line

  const { graph_data, season, units } = props;
  const { temperature, precip } = units;
  const FC = temperature[1];
  const labels = { // todo: pick up here
    precip: (precip === "IN" ? '"' : "mm"),
    snow: (precip === "IN" ? '"' : "cm"),
    freezing_line: temperature,
    temps: temperature
  }

  const data_line = (array, n) => [...Array(array.length)].map(() => n);
  const toAMPM = (hour) => (hour % 12 || 12) + " " + (hour >= 12 ? "PM" : "AM");

  var datapoints = {
    freezing_line: data_line(graph_data.periods, (FC === "F" ? 32 : 0)),
    precip: [],
    snow: [],
    temps: [],
    feelslike: [],
    centered_sums: {},
    limits: {
      temps: {},
      precip: {}
    },
    datasets: {},
    data_labels: {}
  }

  var final_data = {
    labels: [],
    datasets: []
  };

  if (graph_data.periods !== undefined) {
    graph_data.periods.forEach((period,i) => {
      const date = new Date(period.dateTimeISO);
      const date_label = ( date.getHours() < 3 || i === 0 ? `${period.day.short} ${date.getMonth() + 1}/${date.getDate()}\t\t-\t` : "" );
      var period_precip = period["precip" + units.precip];
      if (season === "winter" && precip !== "IN") period_precip *= .1;

      final_data.labels.push( date_label + toAMPM( date.getHours() ) );

      datapoints.precip.push( period_precip );
      datapoints.snow.push( period["snow" + units.snow] );
      datapoints.temps.push( period["temp" + FC] );
      datapoints.feelslike.push( period["feelslike" + FC] );
    })
  }

  const display_centered_sums = (type) => {
    const set_centered_value = () => centered_sums[ Math.floor((left_side + right_side + 1) / 2) ] = display_value;

    const array = datapoints[type];
    var centered_sums = data_line(array, 0);
    var left_side = 0, right_side = 0, display_value = 0;

    array.forEach((value, i) => {
      if (value === 0) {
        set_centered_value();
        left_side = i;
        display_value = 0;
      } else {
        right_side = i;
        display_value += value;
      }
    })

    if (display_value !== 0) set_centered_value();

    return centered_sums.map(x => x === 0 ? null : Math.round(x * 100) / 100 + labels[type] );
  }

  ["snow", "precip"].forEach(type => {
    datapoints.centered_sums[type] = display_centered_sums( type );
  })

  datapoints.limits.temps.datapoints = datapoints.temps.concat( season === "winter" ? [] : datapoints.feelslike );
  datapoints.limits.precip.datapoints = datapoints.precip.concat( season === "winter" ? datapoints.snow : [] );

  ["temps", "precip"].forEach(type => {
    ["min", "max"].forEach(minmax => {
      datapoints.limits[type][minmax] = Math[minmax](...datapoints.limits[type].datapoints);
    })
  })

  var step_size;
  if (precip === "IN") {
    step_size = ( season === "winter" ? .05 : .01 );
  } else {
    step_size = .1;
  }
  const max_tick = Math.ceil( (datapoints.limits.precip.max + step_size) / step_size ) * step_size;

  const options = { // todo
    name: "Forecast",
    showTooltips: true,
    tooltips: {
      mode: 'index',
      position: 'nearest'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 48,
          maxRotation: 90,
          minRotation: 90
        }
      }],
      yAxes: [{
        id: 'Precip',
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
          stepSize: step_size,
          max: max_tick,
          callback: (label, index, labels) => {
            var depth = 100, label_unit ='"';
            if (units.precip === "MM") {
              if (season === "normal") {
                label_unit = units.precip;
              } else {
                depth = 10
                label_unit = units.snow;
              }
            }
            return (Math.round(label * depth) / depth) + label_unit;
          }
        }
      }, {
        id: 'Temps',
        scaleLabel: 'Temps',
        type: 'linear',
        position: 'right',
        ticks: {
          stepSize: 5,
          fontSize: 10,
          min: Math.floor(( datapoints.limits.temps.min - 5) / 5) * 5,
          max: Math.ceil(( datapoints.limits.temps.max + 5) / 5) * 5,
          callback: (label, index, labels) => { return label + units.temperature; }
        },
        gridLines : {
           display : false
        }
      }]
    },
    animation: {
      easing: "easeOutElastic",
      duration: 1500
    }
  }

  const datapoint_formats = {
    temps: {
      color: '255,100,100',
      fill: '+1',
      lineTension: .4,
      datalabels: {
        all: {
          display: false
        }
      },
    },
    precip: {
      color: '0,0,100',
      fill: season === "normal",
      lineTension: .3,
      order: 3,
      pointRadius: 2,
      datalabels: {
        normal: {
          backgroundColor: function(context) { //todo: see if i can compact
            return context.dataset.backgroundColor;
          },
          borderRadius: 2,
          color: 'white',
          font: {
            weight: 'bold'
          },
          align: 'start',
          anchor: 'start',
          formatter: function(value, context) {
            return datapoints.centered_sums["precip"][context.dataIndex]
          }
        },
        winter: {
          display: false
        }
      }
    },
    snow: {
      color: '150,150,255',
      fill: true,
      order: 0,
      pointRadius: 2,
      pointStyle: 'star',
      datalabels: {
        winter: {
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 2,
          color: 'black',
          font: {
            weight: 'bold'
          },
          align: 'start',
          anchor: 'start',
          formatter: function(value, context) {
            return datapoints.centered_sums["snow"][context.dataIndex]
          }
        }
      }
    },
    freezing_line: {
      borderDash: [12,12],
      color: '200,200,255',
      datalabels: {
        all: {
          display: false
        }
      }
    },
    feelslike: {
      color: '255,0,0',
      borderDash: [8,6],
      datalabels: {
        all: {
          display: false
        }
      }
    }
  }

  const final = (type) => {
    const format = datapoint_formats[type];
    const to_rgba = (opacity) => `rgba(${format.color},${opacity})`;
    const ucfirst = type[0].toUpperCase() + type.slice(1);
    const yAxisID = (type === "precip" || type === "snow" ? "Precip" : "Temps"); // todo: verify and update here
    const datalabels = format.datalabels.all || format.datalabels[season];

    return {
      label: `${ucfirst} (${labels[type]})`,
      yAxisID: yAxisID,
      type: 'line',
      fill: format.fill || false,
      datalabels: datalabels,
      backgroundColor: to_rgba(.2),
      borderColor: to_rgba(.4),
      borderCapStyle: 'butt',
      borderDash: format.borderDash || [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      lineTension: format.lineTension || 0,
      order: format.order || 0,
      pointBackgroundColor: to_rgba(.3),
      pointBorderWidth: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: to_rgba(1),
      pointHoverBorderColor: to_rgba(1),
      pointHoverBorderWidth: 2,
      pointHitRadius: 10,
      pointRadius: format.pointRadius || 0,
      pointStyle: format.pointStyle || 'circle',
      stepped: format.stepped || false,
      data: datapoints[type]
    }
  }

  // todo: refactor all with component-level iteration
  ["temps", "precip", "snow", "freezing_line", "feelslike"].forEach(type => {
    datapoints.datasets[type] = final( type );
  })

  if (season === "winter") {
    final_data.datasets = [ datapoints.datasets["snow"], datapoints.datasets["precip"], datapoints.datasets["temps"], datapoints.datasets["freezing_line"] ];
  } else {
    final_data.datasets = [ datapoints.datasets["precip"], datapoints.datasets["temps"], datapoints.datasets["feelslike"] ];
  }

  return (
    <div>
      <Bar data={ final_data } height={ 150 } options={ options } />
    </div>
  );

}
