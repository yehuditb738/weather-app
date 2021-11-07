import React from 'react';
import './App.css';
import { WeatherData } from './components/WeatherData.js'
import { StatusData } from './components/StatusData'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null
    }
  }
  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  weatherInit = () => {
    debugger
    const success = (position) => {
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }

    const error = () => {
      // this.setState({ status: 'unable' });
      // localStorage.removeItem('location-allowed');
      alert('Unable to retrieve location.');
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }


  getWeatherData = (lat, lon) => {
    debugger
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3bbdcbe9bea8abc3cfb3a2ce90adbeb8`;

    fetch(weatherApi, { signal: this.controllerSignal })
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result);
          const { name } = result;
          const { country } = result.sys;
          const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
          const { description, icon } = result.weather[0];
          const { speed, deg } = result.wind;
          const { lat, lon } = result.coord;

          this.setState({
            status: 'success',
            isLoaded: true,
            weatherData: {
              name,
              country,
              description,
              icon,
              temp: temp.toFixed(1),
              feels_like: feels_like.toFixed(1),
              temp_min: temp_min.toFixed(1),
              temp_max: temp_max.toFixed(1),
              speed,
              deg,
              lat,
              lon,
              humidity
            }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  returnActiveView = (status) => {
    switch (status) {
      case 'init':
        return (
          <button
            className='btn-main'
            onClick={this.onClick}
          >
            Get My Location
          </button>
        );
      case 'success':
        return <WeatherData data={this.state.weatherData} />;
      default:
        return <StatusData status={status} />;
    }
  }

  getWeatherData2 = (lat, lon) => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3bbdcbe9bea8abc3cfb3a2ce90adbeb8`;
    //const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    //const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=3bbdcbe9bea8abc3cfb3a2ce90adbeb8`;

    fetch(weatherApi, { signal: this.controllerSignal })
      .then(response => response.json())
      .then(
        (result) => {

          console.log("result " + result);
          const { name } = result;
          const { country } = result.sys;
          const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
          const { description, icon } = result.weather[0];
          const { speed, deg } = result.wind;
          const { lat, lon } = result.coord;

          this.setState({
            isLoaded: true,
            weatherData: {
              name,
              country,
              description,
              icon,
              temp: temp.toFixed(1),
              feels_like: feels_like.toFixed(1),
              temp_min: temp_min.toFixed(1),
              temp_max: temp_max.toFixed(1),
              speed,
              deg,
              lat,
              lon,
              humidity
            }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }



  componentDidMount() {
    this.weatherInit();
  }
  componentWillUnmount() {
    this.abortController.abort();
  }


  render() {
    return (
      <div className='App'>
        <div className='container'>
          {this.returnActiveView(this.state.status)}
        </div>
      </div>
    );
  }
}

export default App;