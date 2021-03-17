import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    MenuList,
    MenuItem,
    Popper,
    Button,
    ClickAwayListener,
    Paper, Grow
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import style from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../Redux/auth-reducer";
import {getQuestionsThunk} from "../Redux/admin-test-reducer";


const Navbar = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

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
                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Typography variant='h5' className={style.button}>Тесты</Typography>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                                          onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={(event) => {handleClose(event); props.getQuestionsThunk(1)}}>
                                                        <NavLink className={style.testLink} to={`/test/${1}`}>
                                                            Тест администратора
                                                        </NavLink>
                                                    </MenuItem>
                                                    <MenuItem onClick={(event) => {handleClose(event); props.getQuestionsThunk(2)}}>
                                                        <NavLink className={style.testLink} to={`/test/${2}`}>
                                                            Тест персонала
                                                        </NavLink>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        <MenuItem>
                            <NavLink className={style.link} to='/results-list'>
                                <Typography variant='h5' className={style.button}>Результаты тестов</Typography>
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

export default connect(null, {logout, getQuestionsThunk})(Navbar)