import React from 'react';
import virginiaLogo from "../../assets/logo.svg";
import classes from "./Logo.module.css";
const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src = {virginiaLogo} alt="MyLogo" />
        </div>
    );
}

export default logo;