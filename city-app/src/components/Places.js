import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import PlacesRenderer from "./PlacesRenderer";
export class Places extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 0, 
                    places:[],
                    isLoading: false,
                    loadedAll: false
                 };
    }

    componentDidMount() {
        this.getPlaces();
    }

    incrementPage() {
        this.setState({page: this.state.page+1})
    }

    getPlaces = async () => {
        if (!this.state.loadedAll && !this.state.isLoading) {
            this.setState({isLoading: true})
            try {
                const res = await axios.get(`/places`, {
                    params: {
                        page: this.state.page
                    }
                });
                const places = res.data.data;
                this.setState({ places: this.state.places.concat(places), isLoading: false });
                if(places.length >= 10) {
                    this.incrementPage()
                } else {
                    this.setState({loadedAll: true})
                }
            } catch (err) {
                this.setState({isLoading: false})
                //TODO error handling
            }
        }
    }

    render() {
        return (
          <Router>
            <PlacesRenderer places={this.state.places} isLoading={this.state.isLoading} loadedAll={this.state.loadedAll} loadMore={()=>this.getPlaces()}/>
          </Router>
        );
      }
}

export default Places;