import React, { Component, PropTypes } from 'react';

import strToId from '../utils/str-to-id';
import valuesChanged from '../utils/values-changed';

import * as propShapes from '../prop-shapes';

import PerceivedDemographicQuestion from './PerceivedDemographicQuestion';

import styles from './PerceivedDemographics.styl';

class PerceivedDemographics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    this.props.onEnter();
  }

  componentWillReceiveProps(nextProps) {
    // If the questions (or the image to which they apply) change, reset our state object
    if (valuesChanged(this.props, nextProps, ['questionOrder', 'image'])) {
      // TODO: This will break if a question with the name "currentStep" is passed in;
      // this state logic might be good to eventually migrate to the Redux store
      this.state = nextProps.questionOrder.reduce((nextState, question) => ({
        ...nextState,
        [question]: '',
      }), {
        currentStep: 0,
      });
    }
  }

  // Prepare the annotations into the format expected by the action/reducer
  prepareAnnotationsObject() {
    const annotations = this.props.questionOrder.map(questionName => ({
      name: questionName,
      value: this.state[questionName],
    }));
    return {
      id: this.props.image.id,
      annotations,
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    this.setState(({ currentStep }, { questionOrder }) => {
      const nextStep = currentStep + 1;
      const maxStep = questionOrder.length;
      return {
        // Persist value
        [name]: value,
        // Auto-advance to the next step, preventing out-of-bounds values
        currentStep: nextStep > maxStep ? maxStep : nextStep,
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.prepareAnnotationsObject());
    if (this.props.current >= this.props.total) {
      this.props.onCompleteWorkload();
    }
  }

  prevStep() {
    // pull currentStep out of this.state to compute prev step
    this.setState(({ currentStep }) => {
      const prevStep = currentStep - 1;
      return {
        // Prevent out-of-bounds prevStep value
        currentStep: prevStep <= 0 ? 0 : prevStep,
      };
    });
  }

  nextStep() {
    // pull currentStep out of this.state to compute next step,
    // and questionOrder out of this.props to compute max step
    this.setState(({ currentStep }, { questionOrder }) => {
      const nextStep = currentStep + 1;
      const maxStep = questionOrder.length;
      return {
        // Prevent out-of-bounds nextStep value
        currentStep: nextStep > maxStep ? maxStep : nextStep,
      };
    });
  }

  render() {
    const { currentStep } = this.state;
    const { demographicAttributes, questionOrder } = this.props;
    window.props = this.props;
    return (
      <div>
        <img
          src={this.props.image && this.props.image.url}
          alt="A face to label with perceived demographic information"
        />
        <form onSubmit={this.handleSubmit}>
          {questionOrder.map((questionName, idx) => {
            const { id, name, options } = demographicAttributes[questionName];
            return (
              <PerceivedDemographicQuestion
                key={`question_${strToId(name)}_${id}`}
                name={name}
                options={options}
                selected={this.state[name]}
                visible={currentStep === idx}
                onChange={this.handleInputChange}
              />
            );
          })}
          {currentStep >= questionOrder.length ? (
            <div role="alert">
              <p>Review your annotations</p>
              <ul>{questionOrder.map((questionName) => {
                const { name } = demographicAttributes[questionName];
                const value = this.state[name];
                return (
                  <li key={`confirmation_${name}`}>
                    {name}: <strong>{value}</strong>
                  </li>
                );
              })}</ul>
            </div>
          ) : null}

          <div className={styles.carousel}>
            <button
              className={styles.prev}
              type="button"
              onClick={this.prevStep}
            >Back</button>

            <span className={styles.current}>
              Step {currentStep + 1} of {questionOrder.length};
              {' '}
              Image {this.props.current} of {this.props.total}
            </span>

            {currentStep < questionOrder.length ? (
              <button
                className={styles.next}
                type="button"
                onClick={this.nextStep}
              >Next Step</button>
            ) : (
              <button
                className={`${styles.next} ${styles.save}`}
                type="submit"
              >Submit</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

PerceivedDemographics.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCompleteWorkload: PropTypes.func.isRequired,
  demographicAttributes: PropTypes.objectOf(propShapes.demographicQuestion).isRequired,
  questionOrder: propShapes.demographicsQuestionList.isRequired,
  image: propShapes.workloadItem,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

PerceivedDemographics.defaultProps = {
  image: null,
};

export default PerceivedDemographics;
