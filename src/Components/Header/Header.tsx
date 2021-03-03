import React from "react";
import {Navbar} from "../Navbar/Navbar";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";

type PropsType = ReturnType<typeof mapStateToProps>

const Header: React.FC<PropsType> = (props) => {
    return (
        <>
            <Navbar/>
            <h1>{props.auth}</h1>
        </>
    )
}


const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.auth.username
    }
}

export default connect(mapStateToProps, {})(Header)