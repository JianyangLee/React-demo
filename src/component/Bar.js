import React from 'react';


class Bar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: ''
        };
    }

    onInputChange =(event) =>{
        this.setState(
            {
                term: event.target.value
            }
        )
    }

    onFormSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render(){
        return(
        <div className="ui segment">
            <form className="ui form" onSubmit={this.onFormSubmit}>
                <div className = "field">
                    <label>City Search (Press enter to get the forcast information)</label>
                    <input type = 'text' placeholder = "search it" value={this.state.term} onChange={this.onInputChange}/>
                </div>
            </form>
        </div>
        );
    }
}

export default Bar;