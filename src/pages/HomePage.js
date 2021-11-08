import React from 'react';
import '../style/global.css'
import { WeatherData } from '../components/WeatherData'
import { StatusData } from '../components/StatusData'
import { withRouter } from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'init',
            isLoaded: false,
            weatherData: null,
            storageMessege: ""
        }
    }

    abortController = new AbortController();
    controllerSignal = this.abortController.signal;

    redirectPage = () => {
        const { history } = this.props;
        if (history) history.push('/grid');
    }

    weatherInit = () => {
        const success = (position) => {
            this.getWeatherData(position.coords.latitude, position.coords.longitude);
        }

        const error = () => {
            alert('Unable to retrieve location.');
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Your browser does not support location tracking, or permission is denied.');
        }
    }

    getWeatherData = (lat, lon) => {
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3bbdcbe9bea8abc3cfb3a2ce90adbeb8`;
        //const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

        fetch(weatherApi, { signal: this.controllerSignal })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);
                    const { name } = result;
                    const { country } = result.sys;
                    const { temp, temp_min, temp_max, feels_like } = result.main;
                    const { lat, lon } = result.coord;

                    this.setState({
                        status: 'success',
                        isLoaded: true,
                        weatherData: {
                            name,
                            country,
                            temp: temp.toFixed(1),
                            feels_like: feels_like.toFixed(1),
                            temp_min: temp_min.toFixed(1),
                            temp_max: temp_max.toFixed(1),
                            lat,
                            lon,
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

    saveToStorage() {
        let data = JSON.parse(localStorage.getItem('history'));
        let weatherDataObj = this.state.weatherData;
        const isExist = data.find(obj => obj.lat === weatherDataObj.lat && obj.lon === weatherDataObj.lon);
        if (isExist === undefined || isExist === null) {
            let hisObj = { name: weatherDataObj.name, lat: weatherDataObj.lat, lon: weatherDataObj.lon, temp: weatherDataObj.temp }

            data.push(hisObj);
            localStorage.setItem('history', JSON.stringify(data));
            this.setState({
                storageMessege: "Add to DB!"
            });
        }
        else {
            this.setState({
                storageMessege: "Data already exist!"
            });
        }
    }

    componentDidMount() {
        this.weatherInit();
    }
    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <div className='homeContainer'>
                <button className='btn' onClick={this.saveToStorage.bind(this)}>
                    Save To Storage
                </button>
                <span className='spn'>{this.state.storageMessege}</span>
                {this.returnActiveView(this.state.status)}
                <button className='btn' onClick={this.redirectPage}>
                    To History
                </button>
            </div>
        );
    }
}

export default withRouter(HomePage);