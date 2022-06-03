import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: '0',
    timer: 'null',
  };

  counter = () => {
    this.setState({
      time: this.state.time - 1
    })
    if (this.state.time === 0 && this.state.status === 'work') {
      this.setState({
        status: 'rest',
        time: ' 20',
      });
      this.playBell();
    } else if (this.state.time === 0 && this.state.status === 'rest') {
      this.setState({
        status: 'work',
        time: ' 1200',
      })
      this.playBell();
    }
  }

  playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    const { status, time, timer } = this.state;


    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      if (minutes < 10 && seconds < 10) {
        return '0' + minutes + ':' + '0' + seconds;
      } else if (seconds < 10) {
        return minutes + ':' + '0' + seconds;
      } else if (minutes < 10) {
        return '0' + minutes + ':' + seconds;
      } else {
        return minutes + ':' + seconds;
      }
    };

    const startTimer = () => {
      this.setState({
        time: '1200',
        status: 'work',
        timer: setInterval(this.counter, 1000)

      })
    }

    const stopTimer = () => {
      this.setState({
        time: '0',
        status: 'off',
        timer: clearInterval(timer),

      })
    }

    const closeApp = () => {
      window.close();
    }



    return (
      <div>
        {(status === 'off') && (<div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>)}
        <h1>Protect your eyes</h1>
        {(status === 'work') && (<img src="./images/work.png" />)}
        {(status === 'rest') && (<img src="./images/rest.png" />)}
        {(status !== 'off') && (<div className="timer">
          {formatTime(time)}
        </div>)}
        {(status === 'off') && (<button className="btn" onClick={startTimer}>Start</button>)}
        {(status !== 'off') && (<button className="btn" onClick={stopTimer}>Stop</button>)}
        <button className="btn btn-close" onClick={closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
