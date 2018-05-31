import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";

export default class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dosc: "",
      company: "",
      money: ""
    };
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <InputItem onChange={v => this.onChange("title", v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange("money", v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange("desc", v)}
          rows={3}
          autoHeight
          title="职位要求"
        />
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type="primary"
        >
          保存
        </Button>
      </div>
    );
  }
}
