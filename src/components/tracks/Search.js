import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    findTrack = (dispatch, event ) => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MUSIXMATCHKEY}`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({
                trackTitle: ''
            });

            



        })
        .catch(err => console.log(err));
        event.preventDefault();
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;

                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search for A Song
                            </h1>

                            <p className="lead text-center">Get the lyrics for any song</p>

                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input name="trackTitle" value={this.state.trackTitle} onChange={this.onChange.bind(this)} type="text" className="form-control form-control-lg" placeholder="Song title..."/>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block mb-2 mt-5" type="submit">Get Track Lyrics</button>
                            </form>

                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search
