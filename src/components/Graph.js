import React from 'react';
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

export const Graph = (props) => {

  const { graph_data, season, units } = props;
  const { temperature } = units;
  const FC = temperature[1];

  const data_line = (array, n) => [...Array(array.length)].map(() => n);
  const toAMPM = (hour) => (hour % 12 || 12) + " " + (hour >= 12 ? "PM" : "AM");


  // takes all values in an array, returns summed consecutive values that are centered
  //todo: refactor this
  const display_centered_sums = (array) => {
    var array2 = data_line(array, 0);
    var index = 0, index2 = 0, amount = 0

    array.forEach((x,i) => {
      if (x === 0) {
        array2[ Math.floor((index+1+index2)/2) ] = amount
        amount = 0
        index = i
      } else {
        index2 = i
        amount += x
      }
    })

    if (amount !== 0) array2[ Math.floor((index+1+index2)/2) ] = amount;

    return array2.map(x => x === 0 ? null : Math.round(x*100)/100 + '"' )

  }

  var datapoints = {
    labels: [],
    precip: [],
    snow: [],
    temps: [],
    freezing: data_line(graph_data.periods, (FC === "F" ? 32 : 0)),
    feelslike: []
  }

  if (graph_data.periods !== undefined) {
    graph_data.periods.forEach((period,i) => {
      const date = new Date(period.dateTimeISO);
      const date_label = ( date.getHours() < 3 || i === 0 ? `${period.day.short} ${date.getMonth() + 1}/${date.getDate()}\t\t-\t` : "" );

      datapoints.labels.push( date_label + toAMPM( date.getHours() ) );
      datapoints.precip.push( period["precip" + units.precip] );
      datapoints.snow.push( period["snow" + units.snow] );
      datapoints.temps.push( period["temp" + FC] );
      datapoints.feelslike.push( period["feelslike" + FC] );
     })
  }

  var snow_sum = display_centered_sums(datapoints.snow)
  var precip_sum = display_centered_sums(datapoints.precip)

  var tick_limits = {};

  ["snow", "precip"].forEach(type => {
    tick_limits[type] = display_centered_sums( datapoints[type] );
  })

  var minTemp = Math.min(...datapoints.temps)
  var maxTemp = Math.max(...datapoints.temps)
  var maxPrecip = Math.max(...datapoints.precip)

  if (season === "winter") {
    maxPrecip = Math.max(...datapoints.precip, ...datapoints.snow)
  } else {
    minTemp = Math.min(...datapoints.temps, ...datapoints.feelslike)
    maxTemp = Math.max(...datapoints.temps, ...datapoints.feelslike)
  }

  var ss = season === "winter" ? .05 : .01
  var ss2 = 1 / ss

  var precipDatalabels = { display: false }

  if (season === "normal") {
    precipDatalabels = {
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
                return precip_sum[context.dataIndex]
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
          stepSize: ss,
          max: Math.ceil((maxPrecip+ss) * ss2) / ss2,
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
          min: Math.floor((minTemp-5)/5)*5,
          max: Math.ceil((maxTemp+5)/5)*5,
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

    var precipData = {
      label: `Precip (${units.precip})`,
      yAxisID: 'Precip',
      type: 'line',
      fill: true,
      datalabels: precipDatalabels,
      lineTension: .3,
      backgroundColor: 'rgba(0,0,100,.5)',
      borderColor: 'rgba(0,0,100,.6)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,100,.6)',
      pointBackgroundColor: 'rgba(0,0,100,.3)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(0,0,100,.6)',
      pointHoverBorderColor: 'rgba(0,0,100,.6)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: datapoints.precip
    }
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
            return snow_sum[context.dataIndex]
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
    var insertData = null


   if (season === "winter") {
        insertData = [precipData, tempsData, freezingLineData, snowData]
    } else {
      insertData = [precipData, tempsData, feelslikeData]
    }


   var data = {
       labels: datapoints.labels,
       datasets: insertData
     };

     if (graph_data.periods !== undefined) {
       if (season === "winter") {
         data.datasets.unshift()
       }
     }

     return (
       <div>
         <Bar data={ data } height={ 150 } options={ options }/>
       </div>
     );

}
