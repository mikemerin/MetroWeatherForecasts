import React from 'react';
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

export const Graph = (props) => {

  const { graph_data } = props

  var labels = [], precipIN = [], snowIN = [], tempF = [], freezing = []

  const days_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  function to_i(t) {
    return parseInt(t, 10)
  }

  function to12(time) {
    if (time < 12) {
        if (time === 0) { time = 12 }
        return time + " AM"
      }
    else {
      if (time > 12) { time -= 12 }
      return time + " PM"
    }
  }

  if (graph_data.periods !== undefined) {
    graph_data.periods.pop()
    graph_data.periods.forEach(x => {
      const dt = x.dateTimeISO
      labels.push(
        ( to_i(dt.slice(11,13)) < 3 ? `${days_short[new Date(dt).getDay()]} ${to_i(dt.slice(5,7))}/${to_i(dt.slice(8,10))} - ` : "" ) + to12( to_i( dt.slice(11,13) ))
      )
      precipIN.push( x.precipIN )
      snowIN.push( x.snowIN )
      tempF.push( x.tempF )
      freezing.push( 32 )
     })
  }

  const options = {
    tooltips: {
      mode: 'x-axis',
      position: 'nearest'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false,
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
          stepSize: .05,
          callback: function(label, index, labels) {
                        return Math.round(label*100)/100 + '"';
                    }

        }
      }, {
        id: 'Temps',
        scaleLabel: 'Temps',
        type: 'linear',
        position: 'right',
        ticks: {
          fontSize: 10,
          callback: function(label, index, labels) {
                        return label + 'ºF';
                    }
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



   const data = {
       labels: labels,
       datasets: [
         {
           label: 'Precip (in)',
           yAxisID: 'Precip',
           type: 'line',
           fill: true,
          //  lineTension: 0,
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
           data: precipIN
         },
         {
           label: 'Snow (in)',
           yAxisID: 'Precip',
           type: 'line',
           fill: true,
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
           data: snowIN
         },
         {
           label: 'Freezing Line (ºF)',
           yAxisID: 'Temps',
           type: 'line',
           fill: false,
           backgroundColor: 'rgba(200,150,150,0.1)',
           borderColor: 'rgba(200,150,150,.4)',
           borderCapStyle: 'butt',
           borderDash: [],
           borderDashOffset: 0.0,
           borderJoinStyle: 'miter',
           pointBorderColor: 'rgba(200,150,150,0)',
           pointBackgroundColor: '#fff',
           pointBorderWidth: 0,
           pointHoverRadius: 5,
           pointHoverBackgroundColor: 'rgba(200,150,150,1)',
           pointHoverBorderColor: 'rgba(200,150,150,1)',
           pointHoverBorderWidth: 2,
           pointRadius: 0,
           pointHitRadius: 10,
           data: freezing
         },
         {
           label: 'Temps (ºF)',
           yAxisID: 'Temps',
           type: 'line',
           fill: '-1',
           backgroundColor: 'rgba(255,100,100,0.05)',
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
           data: tempF
         }
       ]
     };

     return (
       <div>
         <Bar data={ data } height={ 200 } options={ options }/>
       </div>
     );

}
