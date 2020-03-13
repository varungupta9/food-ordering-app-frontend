import React,{Component} from 'react';
import './Home.css'
import Header from '../../common/header/Header'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';


const styles = (theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },

    grid: { //style for the grid component 
        "padding": "20px",
        "margin-left": "0.5%",
        "margin-right": "0.5%",
        transform: 'translateZ(0)',
        cursor: 'pointer',
    },

    card: { //Style for the card and responsive code for different screen size
        height: "450px",
        '@media (min-width: 1300px)': { //Making the code responsive to different screens 
            height: "450px",
        },
        '@media (min-width: 960px) and (max-width:1300px)': { //Making the code responsive to different screens 
            height: "350px",
        }
    },

    media: { // style for the image in the card
        height: "40%",
        width: "100%",
        // paddingTop: '56.25%', // 16:9
    },
    title: { //Style for the Title in the Card 
        "font-size": "30px",
        '@media (min-width: 1300px)': {
            "font-size": "30px",
        },
        '@media (min-width: 760px) and (max-width:1300px)': {
            "font-size": "22px",
        },
        '@media (max-width: 760px)': {
            "font-size": "30px",
        }
    },
    categories: { //Style for the categories in the card
        "font-size": "20px",
        '@media (min-width: 1300px)': {
            "font-size": "20px",
        },
        '@media (min-width: 960px) and (max-width:1300px)': {
            "font-size": "16px",
        },
        '@media (max-width: 960px)': {
            "font-size": "20px",
        }
    },


    cardContent: { // Styles for the card content
        "padding": "5px",
        "margin-left": "20px",
        "margin-right": "20px",
        "height": "20%",
        "display": "flex",
    },
    cardActionArea: { //Style for the Card action area button
        "display": "flex",
        "height": "100%",
        "flex-direction": "column",
        "align-items": "normal",
        "justify-content": "space-between",

    }

}))
class Home extends Component
{
    constructor()
    {
        super();
        this.state={
            restaurant: null,
            filterRestaurants : []
             }
    }

    componentDidMount()
    {
        let dataSend = null;
        let that =this;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function(){
            if(xhr.readyState===4 && xhr.status===200)
            {
                let data = JSON.parse(xhr.responseText).restaurants
                that.setState({
                    restaurant:data,
                    filterRestaurants:data
                });
            }
        }
        )
        xhr.open("GET", this.props.baseUrl+"restaurant");
        xhr.send(dataSend)
    }
    restaurantCardClickHandler=(restaurantId) =>{
        this.props.history.push('/restaurant/' + restaurantId);
    }
    searchHandler = (e) => {
        const search = (e.target.value).toLowerCase();
        let serachRestaurant = JSON.parse(JSON.stringify(this.state.restaurant));
        let serachFilter = [];
        if (serachRestaurant !== null && serachRestaurant.length > 0) {
            // Filtering restaurants based on name and search input
            serachFilter = serachRestaurant.filter((restaurant) =>
                (restaurant.restaurant_name.toLowerCase()).indexOf(search) > -1
            );
            // Setting state for filter results
            this.setState({
                filterRestaurants: [...serachFilter]
            }
            )
        }
    }
    render()
    {
        const { classes } = this.props;
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} inputSearchChangeHandler={this.searchHandler} />
                <div className="flex-container">
                    {this.state.filterRestaurants.length > 0 ? (
                        <Grid container spacing={3} wrap="wrap" alignContent="center" className={classes.grid}>
                            {this.state.filterRestaurants.map(restaurant => (
                                <Grid key={restaurant.id} item xs={12} sm={6} md={3} className={classes.gridCard}>
                                    <Card className={classes.card}>
                                        <CardActionArea className={classes.cardActionArea} onClick={() => this.restaurantCardClickHandler(restaurant.id)}>
                                            <CardMedia
                                                className={classes.media}
                                                image={restaurant.photo_URL}
                                                title={restaurant.restaurant_name}
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography className={classes.title} >
                                                    {restaurant.restaurant_name}
                                                </Typography>
                                            </CardContent>
                                            <CardContent className={classes.cardContent}>
                                                <Typography variant="body1" component="p" className={classes.categories}>
                                                    {restaurant.categories}
                                                </Typography>
                                            </CardContent>
                                            <CardContent>
                                                <div className="card-bottom">
                                                    <span className="rating">
                                                        <span className="star-icon">
                                                            <FontAwesomeIcon icon="star" size="lg" color="white" />
                                                        </span>
                                                        <Typography variant="caption" component="p" >{restaurant.customer_rating}</Typography>
                                                        <Typography variant="caption" component="p" >({restaurant.number_customers_rated})</Typography>
                                                    </span>
                                                    <span className="for-two">
                                                        <Typography variant="caption" component="p" style={{ fontSize: '14px' }}>
                                                            <i className="fa fa-inr" aria-hidden="true"></i>
                                                            {restaurant.average_price}
                                                        </Typography>
                                                        <Typography variant="caption" component="p" style={{ fontSize: '14px' }}>for two</Typography>
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                       <Typography variant="h6" color="textPrimary" component="h6" style={{ marginBottom: 8 }}>
                                No restaurant with given name.
                       </Typography>
                        )}
                </div>
            </div>
        )
    }

}
export default withStyles(styles)(Home);
