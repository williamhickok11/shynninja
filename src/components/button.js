import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const A = styled.a`
  width: 100px;
  height: 50px;
`;

class Button extends Component {
  static propTypes = {
    text: PropTypes.string
  };
  render() {
    const { text } = this.props;
    return <A>{text}</A>;
  }
}

export default Button;
