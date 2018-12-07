import React from 'react';
import ReactDOM from 'react-dom';
import Timechart from './components/timechart';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      BPIs: [],
      lastUpdated: ''
    }
  }
  componentDidMount() {
    //do the api call to coindesk
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.bpi);
      let history = data.bpi;
      let dates = [];
      let BPIs = [];
      for (var date in history) {
        dates.push(new Date(date))
        BPIs.push(history[date])
      }
      this.setState({
        dates: dates, 
        BPIs: BPIs,
        lastUpdated: data.time.updated
      })
    })
  }

  render() {
    var ctx = "chart";
    var data = {
      labels: this.state.dates,
      datasets: [{
        fill: false,
        pointBackgroundColor: '#FF6E40',
        pointBorderColor: '#FF9E80',
        borderColor: '#FF9E80',
        data: this.state.BPIs
      }]
    }
    var timechart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              source: 'data'
            },
            type: 'time',
            time: {
              unit: 'day'
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date",
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Bitcoin Price Index"
            }
          }]
        }
      }
    })
    

    return (
        <div>
          <h2>Last updated: {this.state.lastUpdated}</h2>
          <h1>Bitcoin Price Index Over Last 31 Days</h1>
          {/* <div>
            <Timechart/>
          </div> */}
          
        </div>
    )
  }
}


ReactDOM.render(
  <App/>, 
  document.getElementById('app')
)

export default App;