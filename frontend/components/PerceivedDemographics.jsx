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
    // If the questions (or the face to which they apply) change, reset our state object
    if (valuesChanged(this.props, nextProps, ['questionOrder', 'face'])) {
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
    const demographics = this.props.questionOrder.map(questionName => ({
      name: questionName,
      option: this.state[questionName],
    }));
    return {
      id: this.props.face.id,
      demographics,
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    // eslint-disable-next-line no-console
    console.log(value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.prepareAnnotationsObject());
    if (this.props.current >= this.props.total - 1) {
      this.props.onCompleteWorkload();
    }
  }

  prevStep() {
    const { currentStep } = this.state;
    const prevStep = currentStep - 1;
    this.setState({
      // Prevent out-of-bounds prevStep value
      currentStep: prevStep <= 0 ? 0 : prevStep,
    });
  }

  nextStep() {
    const { currentStep } = this.state;
    const nextStep = currentStep + 1;
    this.setState({
      // Prevent out-of-bounds nextStep value
      currentStep: nextStep >= 2 ? 2 : nextStep,
    });
  }

  render() {
    const { currentStep } = this.state;
    const { demographics, questionOrder } = this.props;
    window.props = this.props;
    return (
      <div>
        <img
          src={this.props.face && this.props.face.url}
          alt="A face to label with perceived demographic information"
        />
        <form onSubmit={this.handleSubmit}>
          {questionOrder.map((questionId, idx) => {
            const { id, name, options } = demographics[questionId];
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

          <div className={styles.carousel}>
            <button
              className={styles.prev}
              type="button"
              onClick={this.prevStep}
            >Back</button>

            <span className={styles.current}>
              Step {currentStep + 1} of {questionOrder.length};
              {' '}
              Face {this.props.current} of {this.props.total}
            </span>

            {currentStep < 2 ? (
              <button
                className={styles.next}
                type="button"
                onClick={this.nextStep}
              >Next Step</button>
            ) : null}

            {currentStep >= 2 ? (
              <button
                className={`${styles.next} ${styles.save}`}
                type="submit"
              >Submit</button>
            ) : null}
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
  demographics: PropTypes.objectOf(propShapes.demographicQuestion).isRequired,
  questionOrder: propShapes.demographicsQuestionList.isRequired,
  face: propShapes.workloadItem,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

PerceivedDemographics.defaultProps = {
  face: null,
};

export default PerceivedDemographics;
