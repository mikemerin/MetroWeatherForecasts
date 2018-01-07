import React from 'react';
import { Bar } from 'react-chartjs-2'

export const Graph = (props) => {

  const { graph_data, season } = props

  var labels = [], precipIN = [], snowIN = [], tempF = [], freezing = [], feelslikeF = []

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
    graph_data.periods.forEach(x => {
      const dt = x.dateTimeISO
      labels.push(
        ( to_i(dt.slice(11,13)) < 3 ? `${days_short[new Date(dt).getDay()]} ${to_i(dt.slice(5,7))}/${to_i(dt.slice(8,10))} - ` : "" ) + to12( to_i( dt.slice(11,13) ))
      )
      precipIN.push( x.precipIN )
      snowIN.push( x.snowIN )
      tempF.push( x.tempF )
      feelslikeF.push( x.feelslikeF )
      freezing.push( 32 )
     })
  }

  const options = {
    showTooltips: false,
    tooltips: {
      enabled: false
      // mode: 'x-axis',
      // position: 'nearest'
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

    var precipData = {
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
    }
    var snowData = {
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
      }
    var tempsData = {
      label: 'Temps (ºF)',
      yAxisID: 'Temps',
      type: 'line',
      fill: '+1',
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
      data: tempF
    }

    var freezingLineData = {
                    label: 'Freezing Line (ºF)',
                    yAxisID: 'Temps',
                    type: 'line',
                    fill: false,
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
                    data: freezing
                  }
    var feelsLikeFData = {
                    label: 'Feels Like (ºF)',
                    yAxisID: 'Temps',
                    type: 'line',
                    fill: false,
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
                    data: feelslikeF
                  }
    var insertData = null


   if (season === "winter") {
        insertData = [precipData, tempsData, freezingLineData, snowData]
    } else {
      insertData = [precipData, tempsData, feelsLikeFData]
    }


   var data = {
       labels: labels,
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
