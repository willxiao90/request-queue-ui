
import React from 'react';
import RequestQueue from './lib/RequestQueue'
import RequestList from './RequestList'
import AddRequest from './AddRequest'
import InfoPanel from './InfoPanel'
import ActionBar from './ActionBar'
import './App.css';

/**
   * Echo name in 1 seconds
   * @param {String} name 
   * @returns 
   */
 function echoName(name){
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(name);
      }, 1000);
  })
}

/**
 * Echo random number in 2 seconds
 * @returns 
 */
function echoRandomNumber(){
  return new Promise((resolve) => {
      setTimeout(() => {
        const num = Math.round(Math.random() * 1000);
          resolve(num);
      }, 2000);
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [], // request list
      logs: [], // info and system log
    };
  }

  componentDidMount() {
    this.requestQueue = new RequestQueue();
  }

  componentWillUnmount() {
    this.requestQueue = null;
  }

  /**
   * append log msg
   * @param {String} msg 
   */
  appendLog = (msg) => {
    this.setState((state) => ({
      logs: [...state.logs, msg]
    }))
  }

  /**
   * Add an request
   * @param {Object} request 
   */
  handleSubmit = (request) => {
    const fn = request.type === '1' ? function(){
      return echoName(request.name)
    } : echoRandomNumber;
    const id = this.requestQueue.enqueue(fn, (res) => {
      this.appendLog(`request '${request.name}' executed and return: ${res}`);
    });
    console.log(id)

    this.setState((state) => ({
      list: [...state.list, {...request, id}]
    }));
    this.appendLog(`request '${request.name}' enqueued successfully`);
  }

  /**
   * Remove request
   * @param {Object} request 
   */
  removeRequest = (request) => {
    this.requestQueue.cancel(request.id);
    this.setState((state) => ({
      list: state.list.filter(v => v.id !== request.id)
    }));
    this.appendLog(`request '${request.name}' was canceled`);
  }

  executeNextRequest = () => {
    this.requestQueue.processNext().then(() => {
      // delete the first request
      this.setState((state) => ({
        list: [...state.list.slice(1)]
      }))
    });
  }

  getQueueSize = () => {
    const size = this.requestQueue.getSize();
    this.appendLog(`request queue size is: ${size}`);
  }

  render() {
    return (
      <div className="app">
        <div className="main">
          <RequestList 
            items={this.state.list} 
            removeRequest={this.removeRequest}
          ></RequestList>

          <AddRequest submit={this.handleSubmit}></AddRequest>
        </div>
        
        <div className="aside">
          <ActionBar 
            executeNext={this.executeNextRequest} 
            getSize={this.getQueueSize}
          ></ActionBar>

          <InfoPanel logs={this.state.logs}></InfoPanel>
        </div>
      </div>
    );
  }
}

export default App;
