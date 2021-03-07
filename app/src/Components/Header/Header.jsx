import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import {connect} from "react-redux";

const Header = (props) => {
    useEffect(() => {

    }, [props.username])
    return (
        <>
            <Navbar username={props.username} isAuth={props.isAuth}/>
        </>
    )
}

let mapStateToProps = (state) =>
{
    return {
        username: localStorage.getItem('username'),
        isAuth: state.auth.token
    }
}

export default connect (mapStateToProps,
{
}
)(Header)