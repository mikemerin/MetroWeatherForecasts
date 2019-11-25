import React from 'react';
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

export const Graph = (props) => {

  const { graph_data, season, units } = props;
  const { temperature, precip } = units;
  const FC = temperature[1];
  const labels = { // todo: pick up here
    precip: (precip === "IN" ? '"' : "mm"),
    snow: (precip === "IN" ? '"' : "cm"),
    temps: temperature[1]
  }

  const data_line = (array, n) => [...Array(array.length)].map(() => n);
  const toAMPM = (hour) => (hour % 12 || 12) + " " + (hour >= 12 ? "PM" : "AM");

  var datapoints = {
    precip: [],
    snow: [],
    temps: [],
    freezing: data_line(graph_data.periods, (FC === "F" ? 32 : 0)),
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

      final_data.labels.push( date_label + toAMPM( date.getHours() ) );

      datapoints.precip.push( period["precip" + units.precip] );
      datapoints.snow.push( period["snow" + units.snow] );
      datapoints.temps.push( period["temp" + FC] );
      datapoints.feelslike.push( period["feelslike" + FC] );
    })
  }

  const display_centered_sums = (array) => {
    const set_centered_value = () => centered_sums[ Math.floor((left_side + right_side + 1) / 2) ] = display_value;

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

    const a2 = centered_sums.map(x => x === 0 ? null : Math.round(x * 100) / 100 + '"' ); // todo: metric pick up here 2
    return a2;
  }

  ["snow", "precip"].forEach(type => {
    datapoints.centered_sums[type] = display_centered_sums( datapoints[type] );
  })

  datapoints.limits["temps"].datapoints = datapoints.temps.concat( season === "winter" ? [] : datapoints.feelslike );
  datapoints.limits["precip"].datapoints = datapoints.precip.concat( season === "winter" ? [] : datapoints.snow );

  ["temps", "precip"].forEach(type => {
    ["min", "max"].forEach(minmax => {
      datapoints.limits[type][minmax] = Math[minmax](...datapoints.limits[type].datapoints);
    })
  })

  const step_size = ( season === "winter" ? .05 : .01 );
  const max_tick = Math.ceil( (datapoints.limits.precip.max + step_size) / step_size ) * step_size;

  datapoints.data_labels["precip"] = { display: false }

  if (season === "normal") {
    datapoints.data_labels["precip"] = {
              backgroundColor: function(context) {
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
            }
  }

  const options = {
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
          min: Math.floor(( datapoints.limits.temps.min -5) / 5) * 5,
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


//
  const datapoint_formats = {
    precip: {
      fill: true,
      lineTension: .3,
      color: '0,0,100',
      borderCapStyle: 'butt',
    },
    snow: {

    }
  }

  const final = (type) => {
    const format = datapoint_formats[type];
    const to_rgba = (opacity) => `rgba(${format.color},${opacity})`;
    const ucfirst = type[0].toUpperCase() + type.slice(1);
    const yAxisID = (type === "precip" || type === "snow" ? "Precip" : "Temps"); // todo: verify and update here
    
    return {
      label: `${ucfirst} (${units[type]})`,
      yAxisID: yAxisID,
      type: 'line',
      fill: format.fill,
      datalabels: datapoints.data_labels[type],
      backgroundColor: to_rgba(.5),
      borderColor: to_rgba(.6),
      borderCapStyle: format.borderCapStyle,
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: to_rgba(.6),
      pointBackgroundColor: to_rgba(.3),
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: to_rgba(.6),
      pointHoverBorderColor: to_rgba(.6),
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: datapoints[type]
    }
  }

  datapoints.datasets["precip"] = final( "precip" );



    var snowData = {
        label: `Snow (${units.snow})`,
        yAxisID: 'Precip',
        type: 'line',
        fill: true,
        datalabels: {
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
        },
       //  lineTension: 0,
        backgroundColor: 'rgba(150,150,255,.2)',
        borderColor: 'rgba(150,150,255,.3)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(150,150,255,.9)',
        pointBackgroundColor: '#aaa',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(150,150,255,.3)',
        pointHoverBorderColor: 'rgba(150,150,255,.3)',
        pointHoverBorderWidth: 2,
        pointRadius: 6,
        pointHitRadius: 10,
        pointStyle: 'star',
        data: datapoints.snow
      }



    var tempsData = {
      label: `Temps (${units.temperature})`,
      yAxisID: 'Temps',
      type: 'line',
      fill: '+1',
      lineTension: .4,
      datalabels: {
          display: false
      },
      backgroundColor: 'rgba(255,100,100,0.15)',
      borderColor: 'rgba(255,100,100,.8)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,100,100,.8)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,100,100,1)',
      pointHoverBorderColor: 'rgba(255,100,100,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 10,
      data: datapoints.temps
    }




    var freezingLineData = {
                    label: 'Freezing Line (' + units.temperature + ')',
                    yAxisID: 'Temps',
                    type: 'line',
                    fill: false,
                    datalabels: {
                        display: false
                    },
                    backgroundColor: 'rgba(100,100,255,0.15)',
                    borderColor: 'rgba(150,150,200,.4)',
                    borderCapStyle: 'butt',
                    borderDash: [10,7],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(150,150,200,0)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(150,150,200,1)',
                    pointHoverBorderColor: 'rgba(150,150,200,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    data: datapoints.freezing
                  }

    var feelslikeData = {
                    label: 'Feels Like (' + units.temperature + ')',
                    yAxisID: 'Temps',
                    type: 'line',
                    fill: false,
                    datalabels: {
                        display: false
                    },
                    backgroundColor: 'rgba(255,0,0,0)',
                    borderColor: 'rgba(255,0,0,.5)',
                    borderCapStyle: 'butt',
                    borderDash: [8,6],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: 'rgba(255,0,0,.8)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255,0,0,1)',
                    pointHoverBorderColor: 'rgba(255,0,0,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    data: datapoints.feelslike
                  }

  final_data.datasets = [datapoints.datasets["precip"], tempsData].concat( season === "winter" ? [freezingLineData, snowData] : feelslikeData);

  return (
    <div>
      <Bar data={ final_data } height={ 150 } options={ options } />
    </div>
  );

}
