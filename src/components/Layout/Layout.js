import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  //closed the backdrop if user clicked any menu items (i.e: navigation items)
  sideDrawerClosedHandle = () => {
    this.setState({showSideDrawer: false});
  }
  // toggle the backdrop if user clicked burger button
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }
  render() {
    return (
      <>
        <Toolbar burgerButtonClicked={this.toggleSideDrawerHandler} />
        <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandle} />
        <main className={classes.Content}></main>
      </>
    );
  }
}
export default Layout;
