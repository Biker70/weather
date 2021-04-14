import React from 'react';
import Weather from './Weather';

export default class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lat: 0, lng: 0, isLoaded: false }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    isLoaded: true
                });
            }, (error) => {
                    alert(error.message);
            });
        }
        else {
            alert("Your browser does not support geolocation!");
        }
    }

    render() {
        const { lat, lng, isLoaded } = this.state;
        if (isLoaded) {
            return (
                <div id="position">
                    <h3>Your position is</h3>
                    <p>Position: {lat.toFixed(3)}, {lng.toFixed(3)}</p>
                    <Weather lat={lat} lng={lng} />
                </div>
            )
        }
        else {
            return (<p>Loading...</p>)
        }
    }
}