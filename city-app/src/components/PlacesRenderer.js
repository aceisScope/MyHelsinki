import React from 'react';
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

    const isPlaceOpen = (place) => {
        if (!place.opening_hours || !place.opening_hours.hours) {
            return "CLOSED"
        }

        const openingHours = place.opening_hours.hours
        let isOpen = false
        let date = new Date()
        date.setSeconds(0)

        let weekdayId = date.getDay();
        if (weekdayId === 0) {
            weekdayId = 7 // sunday is 0
        }

        if (openingHours) {
            const openingHour = openingHours.find(hour => hour.weekday_id === weekdayId)
            if (openingHour) {
                let opens = openingHour.opens
                let closes = openingHour.closes
                if (opens && closes) {
                    let opensHour = new Date()
                    opensHour.setHours(opens.substring(0, 2), opens.substring(3, 5), 0)
                    let closesHour = new Date()
                    closesHour.setHours(closes.substring(0, 2), closes.substring(3, 5), 0)
                    
                    if (date > opensHour && date < closesHour) {
                        isOpen = true
                    }
                } 
            }
        }
    
        return isOpen ? "OPEN" : "CLOSED"
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

    return (
        <Container>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div"><h1>Places</h1></ListSubheader>
                </GridListTile>
                {places.map((place) => (
                <GridListTile key={place.id}> 
                    {getImage(place.description)}
                    <GridListTileBar
                    title={"["+isPlaceOpen(place)+"] "+place.name.fi}
                    subtitle={<span>{getStreetAddress(place.location.address)}</span>}
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
                {bottomButton()}
            </div>
        </Container>
    )
}

export default withStyles(styles, { withTheme: true })(PlacesRenderer) ;