import React from 'react';
import red_dot from "../../assets/Red_Circle(small).svg";
import classes from "./LiveDot.module.css";
const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src = {red_dot} alt="MyLogo" />
        </div>
    );
}

export default logo;