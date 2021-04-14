import React from 'react';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?"; // usage example: q=London,uk&APPID=588ffb6b92e793c9d9c7c8d06cd27307
const apiKey = "588ffb6b92e793c9d9c7c8d06cd27307";

export default class Weather extends React.Component {
    /*
     name: "current place"
     main:
        feels_like: 1.87
        humidity: 48
        pressure: 1021
        temp: 5.28
        temp_max: 6.67
        temp_min: 4
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            temp: 0,
            temp_min: 0,
            temp_max: 0,
            feels_like: 0,
            wind_speed: 0,
            wind_direction: 0,
            description: '',
            icon: ''
        }
    }

    componentDidMount() {
        const url = apiUrl +
            "lat=" + this.props.lat +
            "&lon=" + this.props.lng +
            "&units=metric" +
            "&appid=" + apiKey;

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        name: result.name,
                        temp: result.main.temp,
                        temp_min: result.main.temp_min,
                        temp_max: result.main.temp_max,
                        wind_speed: result.wind.speed,
                        wind_direction: result.wind.deg,
                        description: result.weather[0].description,
                        icon: result.weather[0].icon
                    })
                },
                (error) => {
                    alert(error.message);
                }
            )
    }

    render() {
        const { name, temp, temp_min, temp_max, wind_speed, wind_direction, description, icon } = this.state;
        const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(icon_url);
        return (
            <div id="weather">
                <h3>Weather at {name}</h3>
                <p>{temp} C&#176;, (Min {temp_min} C&#176;, Max {temp_max} C&#176;)</p>
                <p>{wind_speed} m/s {wind_direction} degrees</p>
                <p>{description}</p>
                <img src={icon_url} alt="weather as icon" />
            </div>    
        )
    }
}
