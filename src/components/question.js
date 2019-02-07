import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AnswersWrapper = styled.div`
  display: ${p => (p.active ? "flex" : "none")};
  justify-content: space-around;
`;

const H1 = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const UserAnswer = styled(H1)`
  font-size: 16px;
`;

class Question extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const {
      active,
      answers,
      index,
      openPrevious,
      text,
      userAnswer
    } = this.props;
    return (
      <div>
        <H1 onClick={() => openPrevious(index)}>{text}</H1>
        <UserAnswer>{userAnswer}</UserAnswer>
        <AnswersWrapper active={active}>
          {answers.map((d, i) => {
            // make a new component for the answers
            return (
              <div key={i}>
                <h2>{d.text}</h2>
              </div>
            );
          })}
        </AnswersWrapper>
      </div>
    );
  }
}

export default Question;