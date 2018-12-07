import React from 'react';
import ReactDOM from 'react-dom';
import Timechart from './components/timechart';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {},
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
      console.log("the data looks like: ", data);
      //update state
      this.setState({
        history: data.bpi, 
        lastUpdated: data.time.updated
      })
    })
  }

  render() {
    // console.log("timechart is ", Timechart);
    var ctx = "chart";
    var data = {
      labels: [new Date("2018-11-06"), new Date("2018-11-07"), new Date("2018-11-08"), new Date("2018-11-09")],
      datasets: [{
        data: [6420.865, 6420.865, 6420.86, 6420.86]
      }]
    }
    var timechart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date",
            }
          }]
        }
      }
    })
    

    return (
        <div>
          <h2>Last updated: {this.state.lastUpdated}</h2>
          <h1>Bitcoin Price Index: Last 31 DAYS</h1>
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