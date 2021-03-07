import React from 'react';
import {AppBar, Toolbar, Typography, MenuList, MenuItem} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import style from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../Redux/auth-reducer";


const Navbar = (props) => {
    return (
        <div>
            <AppBar>
                <Toolbar className={style.navBlock}>
                    <IconButton edge='start' aria-label='menu' color='inherit'>
                        <MenuIcon className={style.icon}/>
                    </IconButton>
                    <MenuList className={style.button__group}>
                        <MenuItem>
                            <NavLink className={style.link} to='/computers'>
                                <Typography variant='h5' className={style.button}>Список компьютеров</Typography>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink className={style.link} to='/computers'>
                                <Typography variant='h5' className={style.button}>Список документов</Typography>
                            </NavLink>
                        </MenuItem>
                    </MenuList>
                    {props.isAuth ?
                        <div>
                            <Typography className={style.username} variant='h6'>{props.username}</Typography>
                            <Typography className={style.logout} variant='h6' onClick={props.logout}>Logout</Typography>
                        </div>
                        : <NavLink className={style.link} to='/login'>
                            <Typography className={style.username} variant='h6'>Login</Typography>
                        </NavLink>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default connect(null, {logout})(Navbar)