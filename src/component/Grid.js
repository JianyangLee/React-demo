import React from 'react';


//Reusable React conponent.

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            low: 0,
            high: 0,
            weather: "",
            speed: "",
            date: ""
        }
    }

    componentDidUpdate = (previousProp) => {
        if (previousProp.TempLow != this.props.TempLow || previousProp.TempHigh != this.props.TempHigh || previousProp.weatherType != this.props.weatherType || previousProp.windSpeed != this.props.windSpeed) {
            this.setState({
                low: this.props.TempLow,
                high: this.props.TempHigh,
                weather: this.props.weatherType,
                speed: this.props.windSpeed,
                date: this.props.Date
            })
        }

    }

    //Return the path of the picture based on the weather type.
    stringReturn = (path) => {
        if (path === 'rain') {
            console.log('rain');
            return 'pics/rain.png';
        }
        if (path === 'snow') {
            console.log('snow');
            return 'pics/snow.jpeg';
        }
        if (path === 'sleet') {
            console.log('sleet');
            return 'pics/sleet.png';
        }
    }

    render() {     
        return (
            <div className="ui segment">
                <div className="ui items">
                    <div className="item">
                        <div className="imgae">
                            <img style={{width: '100px'}} src={this.stringReturn(this.state.weather)} />
                        </div>
                        <div className="content">
                            <a className="header" style={{ fontSize: '20px' }}>Temperature is {this.state.low} ℃ to {this.state.high} ℃</a>
                            <div className="meta" style={{ fontSize: '20px' }}>
                                <span>Weather type: {this.state.weather}</span><br />
                                <span>Weed speed: {this.state.speed}</span>
                            </div>
                            <div className="description">
                                <p></p>
                            </div>
                            <div className="extra" style={{ fontSize: '20px', textAlign: 'right' }}>
                                date: {this.state.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Grid;