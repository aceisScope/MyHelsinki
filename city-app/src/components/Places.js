import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    bottomButton: {    
        margin: '10px',   
    },
});

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

    getImage = (description) => {
        if (description.images && description.images.length > 0) {
            return (
                <img src={description.images[0].url} alt={description.body} />
            )
        } else {
            return (
                <img src="https://cdn.pixabay.com/photo/2019/05/08/22/01/helsinki-cathedral-4189824__340.jpg" alt={description.body} />
            )
        }
    }

    bottomButton = () => {
        if (!this.state.loadedAll) {
            return (
                <Button variant="outlined" color="primary" className={this.props.classes.bottomButton} onClick={() => {this.getPlaces()}}>Load More</Button>
            )
        } else {
            return (
                <h2>That's all the places in Helsinki!</h2>
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
          <Router>
            <Container>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div"><h1>Places</h1></ListSubheader>
                    </GridListTile>
                    {this.state.places.map((place) => (
                    <GridListTile key={place.id}> 
                        {this.getImage(place.description)}
                        <GridListTileBar
                        title={place.name.fi}
                        subtitle={<span>{place.description.body}</span>}
                        // actionIcon={
                        //     <IconButton aria-label={`info about ${place.name.fi}`} className={classes.icon}>
                        //     <InfoIcon />
                        //     </IconButton>
                        // }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                <div>
                    {this.bottomButton()}
                </div>
            </Container>
          </Router>
        );
      }
}

export default withStyles(styles, { withTheme: true })(Places) ;