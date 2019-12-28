import React from 'react';
import Bar from './Bar';
import Grid from './Grid';
import axios from 'axios';

//Basically use the Semantic-UI library.

class App extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            TempToday:0,
            TodaySituation : "",
            TempNextDayLow: 0,
            TempNextDayHigh : 0,
            WeatherTypeNextDay: "",
            WeedSpeedNextDay: "",
            DateNextDay: "",
            TempNextTwoDayLow: 0,
            TempNextTwoDayHigh : 0,
            WeatherTypeNextTwoDay: "",
            WeedSpeedNextTwoDay: "",
            DateNextTwoDay: "",
            TempNextThreeDayLow: 0,
            TempNextThreeDayHigh: 0,
            WeatherTypeNextThreeDay: "",
            WeedSpeedNextThreeDay: "",
            DateNextThreeDay: ""
        }
        
    }

    onSearchSubmit = async (item) => {
        var response = null;
        // Fetch the information of lattitude and longitude of a place. (Geocoding).
        // If error happens, alert the user to enter a new one.
        //Handle the exception while the API returns error.
        try {
            response = await axios.get('https://eu1.locationiq.com/v1/search.php?key=fed3936b8b92f0&format=json',{
            params:{
                q:item
            }
        });
        } catch (error) {
            alert("The place you are entering does not exist !! Please enter a correct one.");
        }
        var sec_response = null;
        //Get the weather information based on the lattitude and longitude of a place.
        //Handle the exception while the API returns error.
        try {
            sec_response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1699a4e3f1c2a6cd02c6de46e9802324/${response.data[0].lat},${response.data[0].lon}`)
            console.log(sec_response.status);
        } catch (error) {
            alert("Error place name");
            return ;
        }
        //To get the date of next 3 days.
        var Todaydate = new Date();
        var next = (new Date(Todaydate.setDate(Todaydate.getDate() + 1))).toLocaleDateString();
        var nextTwo = (new Date(Todaydate.setDate(Todaydate.getDate() + 1))).toLocaleDateString();
        var nextThree = (new Date(Todaydate.setDate(Todaydate.getDate() + 1))).toLocaleDateString();
        
        this.setState({
            TempToday:((sec_response.data.currently.temperature - 32) * 5/9 ).toFixed(2),
            TodaySituation : sec_response.data.hourly.summary,
            TempNextDayLow : ((sec_response.data.daily.data[0].temperatureLow - 32) * 5/9 ).toFixed(2),
            TempNextDayHigh : ((sec_response.data.daily.data[0].temperatureHigh - 32) * 5/9 ).toFixed(2),
            WeatherTypeNextDay: sec_response.data.daily.data[0].precipType,
            WeedSpeedNextDay: sec_response.data.daily.data[0].windSpeed,
            DateNextDay: next,
            TempNextTwoDayLow : ((sec_response.data.daily.data[1].temperatureLow - 32) * 5/9 ).toFixed(2),
            TempNextTwoDayHigh : ((sec_response.data.daily.data[1].temperatureHigh - 32) * 5/9 ).toFixed(2),
            WeatherTypeNextTwoDay: sec_response.data.daily.data[1].precipType,
            WeedSpeedNextTwoDay : sec_response.data.daily.data[1].windSpeed,
            DateNextTwoDay: nextTwo,
            TempNextThreeDayLow: ((sec_response.data.daily.data[2].temperatureLow - 32) * 5/9 ).toFixed(2),
            TempNextThreeDayHigh: ((sec_response.data.daily.data[2].temperatureHigh - 32) * 5/9 ).toFixed(2),
            WeatherTypeNextThreeDay: sec_response.data.daily.data[2].precipType,
            WeedSpeedNextThreeDay: sec_response.data.daily.data[2].windSpeed,
            DateNextThreeDay: nextThree

        });
    }

    render(){
        return(
            <div className="ui container" style={{marginTop: '20px'}}>
                <Bar onSubmit={this.onSearchSubmit}/>
                <div style={{textAlign:"center"}}>

                    <span>Today's Temperature is {this.state.TempToday} ℃</span>
                </div>
                <div style={{textAlign:"center"}}>
                    <span>{this.state.TodaySituation}</span><br/>
                    <span>The following information is the forcast for next 3 days</span><br/>
                    <span>The picture shown is based on the weather type</span>
                </div>
                <Grid TempLow={this.state.TempNextDayLow} TempHigh={this.state.TempNextDayHigh} weatherType={this.state.WeatherTypeNextDay} windSpeed={this.state.WeedSpeedNextDay} Date={this.state.DateNextDay}/>
                <Grid TempLow={this.state.TempNextTwoDayLow} TempHigh={this.state.TempNextTwoDayHigh} weatherType={this.state.WeatherTypeNextTwoDay} windSpeed={this.state.WeedSpeedNextTwoDay} Date={this.state.DateNextTwoDay}/>
                <Grid TempLow={this.state.TempNextThreeDayLow} TempHigh={this.state.TempNextThreeDayHigh} weatherType={this.state.WeatherTypeNextThreeDay} windSpeed={this.state.WeedSpeedNextThreeDay} Date={this.state.DateNextThreeDay}/>
            </div>
        );
    }
}

export default App;