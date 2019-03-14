import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

class Quote extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { price } = this.props;
    return (
      <div>
        <h1>${price}</h1>
      </div>
    );
  }
}

export default Quote;
