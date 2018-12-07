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
    return (
        <div>
          Last updated: {this.state.lastUpdated}
          <div>
            <Timechart/>
          </div>
          
        </div>
    )
  }
}


ReactDOM.render(
  <App/>, 
  document.getElementById('app')
)

export default App;