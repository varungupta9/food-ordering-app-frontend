import React,{Component} from 'react';
import  './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme => ({
    searchText: { //Style for Search box
        'color': 'white',
        '&:after': {
            borderBottom: '2px solid white',
        },
        'width': '100%'
    }
}
))
class Header extends Component
{
render(){
    const { classes } = this.props;
    return(
        <div>
        <header className="app-header">
         <div className="logo-style">    
        <FastfoodIcon/>
        </div>
        <div className="search-box">
        <SearchOutlinedIcon/><Input className={classes.searchText} placeholder="Search by Restaurant Name" onChange={this.props.inputSearchChangeHandler}/>
        </div>  
        <div className="login-button">
         <Button variant="contained" ><AccountCircleIcon/>LOGIN</Button>   
        </div>
        </header>     
        </div>
    )
}
}
export default withStyles(styles)(Header);  
