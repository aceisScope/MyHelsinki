import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 0, places: [] };
    }

    componentDidMount() {
        this.getPlaces();
    }

    getPlaces = () => {
        axios.get(`/places`)
            .then(res => {
            const places = res.data.data;
            this.setState({ places });
      })
    }

    render() {
        return (
          <Router>
              <ul>
                { this.state.places.map(place => <li>{place.name.fi}</li>)}
            </ul>
          </Router>
        );
      }
}

export default Places;