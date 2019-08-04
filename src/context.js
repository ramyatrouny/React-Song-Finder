// we create provider as any other content it will wrap everything in this compoentn

import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Result'
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    }

    // Component did mount is called render after it's mount we will use axios
    // Best location to do http call
    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIXMATCHKEY}`)
            .then(res => {
                this.setState({
                    track_list: res.data.message.body.track_list
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

