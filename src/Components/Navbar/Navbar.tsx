import React from 'react';
import {AppBar, Toolbar, Typography, MenuList, MenuItem} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import style from './Navbar.module.css'
import {NavLink} from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>
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
                        <MenuItem>
                            <NavLink className={style.link} to='/login'>
                                <Typography variant='h5' className={style.button}>Войти в приложение</Typography>
                            </NavLink>
                        </MenuItem>
                    </MenuList>
                </Toolbar>
            </AppBar>
        </div>
    )
}