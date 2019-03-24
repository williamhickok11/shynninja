import Question from "./question";
import Quote from "./quote";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { questions } from "../data/questions.json";
import quoteData from "../data/quoteData.json";
import styled from "styled-components";

// import axios from "axios";

console.log(quoteData);

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
    displayedQuote: 0,
    formFinished: false,
    questionData: [],
    service: "washVac"
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

  calculateBasePrice = currAnswer => {
    return {
      additionalCost: this.state.additionalCost,
      basePrice: quoteData.services[currAnswer.value].basePrice,
      dirtMultiplier: this.state.dirtMultiplier,
      service: currAnswer.value
    };
  };

  calculateAdditionalCost = currAnswer => {
    return {
      additionalCost:
        quoteData.services[this.state.service].additionalCost[currAnswer.value],
      basePrice: this.state.basePrice,
      dirtMultiplier: this.state.dirtMultiplier,
      service: this.state.service
    };
  };

  calculateMultiplier = currAnswer => {
    return {
      additionalCost: this.state.additionalCost,
      basePrice: this.state.basePrice,
      dirtMultiplier: currAnswer.value,
      service: this.state.service
    };
  };

  updatedQuoteData = (
    currAnswer,
    answerIndex,
    currQuestionKey,
    questionIndex
  ) => {
    const updateQuoteData = {
      "0": () => this.calculateBasePrice(currAnswer),
      "1": () => this.calculateAdditionalCost(currAnswer),
      "2": () => this.calculateMultiplier(currAnswer)
    };
    const quoteData = updateQuoteData[questionIndex]();
    console.log("quoteData", quoteData);
    // generate quote with this equasion
    const displayedQuote =
      (quoteData.basePrice + quoteData.additionalCost) *
      quoteData.dirtMultiplier;
    return {
      ...quoteData,
      displayedQuote
    };
  };

  answerAndNext = (answer, answerIndex, questionValue, questionIndex) => {
    const quoteData = this.updatedQuoteData(
      answer,
      answerIndex,
      questionValue,
      questionIndex
    );
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
      questionData: newState,
      ...quoteData
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
        {this.state.displayedQuote && (
          <Quote price={this.state.displayedQuote} />
        )}
      </div>
    ) : null;
  }
}

export default App;
