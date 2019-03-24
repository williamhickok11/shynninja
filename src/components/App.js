import Question from "./question";
import Quote from "./quote";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { questions } from "../data/questions.json";
import quoteData from "../data/quoteData.json";
import styled from "styled-components";

// import axios from "axios";

const SubmitForm = styled.div`
  border: 2px solid black;
  justify-content: center;
  margin: 20px auto 0;
  max-width: 300px;
  padding: 20px;
  text-align: center;
`;

class App extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  state = {
    additionalCost: 0,
    basePrice: 0,
    dirtMultiplier: 1,
    formFinished: false,
    price: 0,
    questionData: []
  };

  openPrevious = i => {
    if (this.state.questionData[i].userAnswer !== "") {
      let newState = this.state.questionData.map(item => {
        return { ...item, active: false };
      });
      newState[i].active = true;
      this.setState({
        questionData: newState
      });
    }
  };

  calculateWashVac = (currAnswer) => {
    return quoteData.services[currAnswer.value].basePrice;
  };

  calculateQuote = (currAnswer, answerIndex, currQuestionKey, questionIndex) => {
    const calQuote = {
      "washVac": () => this.calculateWashVac(currAnswer),
      "intriorRestoration": () => {
        return "intriorRestoration"
      },
      "fullDetail": () => {
        return "fullDetail"
      }
    }
    return calQuote[currQuestionKey]();
    // this.setState({ price: quote });
  };

  answerAndNext = (answer, answerIndex, questionIndex) => {
    const quote = this.calculateQuote(answer, answerIndex, questionIndex);
    let finished = true;
    // hide all questions
    let newState = this.state.questionData.map((item, i) => {
      item.active = false;
      // close submit button only if there isn't an answer
      if (item.userAnswer === "") {
        finished = false;
      }
      return item;
    });
    // fill in answer
    debugger;
    newState[questionIndex].userAnswer = answer.value;
    if (newState.length !== questionIndex + 1) {
      // show nex questiopn
      newState[questionIndex + 1].active = true;
    } else {
      // we are at the end, show submit button
      finished = true;
    }
    this.setState({
      formFinished: finished,
      price: quote,
      questionData: newState
    });
    // console.log(this.state);
  };

  submitQuote = () => {
    const quoteAnswers = this.state.questionData.map((item, i) => {
      return item.userAnswer;
    });
    let message =
      "This is a message that will auto populate in a users email before sending.\n";
    message += "They can add to it if they want.\n";
    message += "It will also include detais about their selections such as:\n";
    message += `This is the answer to question 1:\n${quoteAnswers[0]}`;
    message += `This is the answer to question 2:\n${quoteAnswers[1]}`;
    message += `This is the answer to question 3:\n${quoteAnswers[2]}`;
    message += "This is the quote that the app generated:";
    window.open(
      `mailto:SHYYNnashville@gmail.com?subject=Detail Request&body=${message}`
    );
  };

  componentDidMount() {
    if (!window.Promise) {
      window.Promise = Promise;
    }
    this.setState({
      questionData: questions
    });
  }

  render() {
    return this.state.questionData ? (
      <div className="ShynNinja">
        {this.state.questionData.map((q, i) => {
          return (
            <Question
              active={q.active}
              answerAndNext={this.answerAndNext}
              answers={q.answers}
              index={i}
              key={i}
              openPrevious={this.openPrevious}
              text={q.question}
              userAnswer={q.userAnswer}
            />
          );
        })}
        {this.state.formFinished && (
          <SubmitForm onClick={this.submitQuote}>Get Instant Quote</SubmitForm>
        )}
        {this.state.price && <Quote price={this.state.price} />}
      </div>
    ) : null;
  }
}

export default App;
