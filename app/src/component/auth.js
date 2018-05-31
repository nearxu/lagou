import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../redux/user.reducer";

@withRouter
@connect(null, { loadData })
export default class Auth extends Component {
  componentDidMount() {
    const publicList = ["/login", "/register"];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    this.getUserInfo();
  }
  getUserInfo() {
    axios
      .get("/user/info", {})
      .then(res => {
        console.log(res, "res");
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data);
          } else {
            this.props.history.push("/login");
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return null;
  }
}
