import Question from "./question";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { questions } from "../data/questions.json";

// import axios from "axios";

class App extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  state = {
    questionData: [],
    formAnswers: []
  };

  openPrevious = i => {
    if (this.state.questionData[i].userAnswer !== "") {
      let newState = this.state.questionData.map(item => {
        item.active = false;
        return item;
      });
      newState[i].active = true;

      this.setState({
        questionData: newState
      });
    }
  };

  answerAndNext = i => {
    // fill in answer
    // hide and show questions
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
      </div>
    ) : null;
  }
}

export default App;
