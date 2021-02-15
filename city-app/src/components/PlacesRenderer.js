import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { OpenStatus, isOpeningHour } from '../helper/DateUtils';

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

export function PlacesRenderer({classes, places, isLoading, loadedAll, loadMore}) {

    const getImage = (description) => {
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

    const getStreetAddress = (address) => {
        return address.street_address + ", " + address.postal_code + ", " + address.locality
    }

    const getTitle = (place) => {
        if (isPlaceOpen(place) === OpenStatus.unknown) {
            return place.name.fi
        } else {
            return `[${isPlaceOpen(place)}] ${place.name.fi}` 
        }
    }

    const isPlaceOpen = (place) => {
        if (!place.opening_hours || !place.opening_hours.hours) {
            return OpenStatus.unknown
        }

        let date = new Date()
        let weekdayId = date.getDay();
        return isOpeningHour(place.opening_hours.hours, weekdayId)
    }

    const bottomButton = () => {
        if (!loadedAll) {
            return (
                <Button variant="outlined" color="primary" className={classes.bottomButton} onClick={() => {loadMore()}}>Load More</Button>
            )
        } else {
            return (
                <h2>That's all the places in Helsinki!</h2>
            )
        }
    }

    const openPlaceUrl = (place) => {
        if (place.info_url) {
            window.open(place.info_url)
        }
    }

    return (
        <Container>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div"><h1>Places</h1></ListSubheader>
                </GridListTile>
                {places.map((place) => (
                <GridListTile key={place.id} onClick={() => {openPlaceUrl(place)}}> 
                    {getImage(place.description)}
                    <GridListTileBar
                    title={getTitle(place)}
                    subtitle={<span>{getStreetAddress(place.location.address)}</span>}
                    />
                </GridListTile>
                ))}
            </GridList>
            <div>
                {bottomButton()}
            </div>
        </Container>
    )
}

export default withStyles(styles, { withTheme: true })(PlacesRenderer) ;